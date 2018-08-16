<?php

namespace HM\GutenbergTools;

/**
 * Setup the plugin.
 */
function setup() {
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
}

/**
 * Enqueue assets in the editor.
 */
function enqueue_block_editor_assets() {
	extend_wp_api_backbone_client();

	wp_enqueue_script(
		'hm-gb-tools-editor',
		HM_GB_TOOLS_URL . '/build/editor.bundle.js',
		[ 'wp-blocks', 'wp-element' ],
		filemtime( HM_GB_TOOLS_DIR . '/build/editor.bundle.js' ),
		false
	);

	wp_enqueue_style(
		'hm-gb-tools-editor',
		HM_GB_TOOLS_URL . '/build/editor.css',
		[],
		filemtime( HM_GB_TOOLS_DIR . '/build/editor.css' )
	);

	wp_localize_script( 'hm-gb-tools-editor', 'hmGbToolsData', [
		'postTypeLabels'     => get_post_type_labels(),
		'postTypeTaxonomies' => get_post_type_taxonomies(),
	] );
}

/**
 * Get labels for each post type.
 *
 * @return array
 */
function get_post_type_labels() {
	$post_types = get_post_types(
		[
			'show_in_rest' => true,
		],
		'objects'
	);

	$data = [];

	foreach ( $post_types as $post_type_object ) {
		$data[ $post_type_object->name ] = [
			'name'          => $post_type_object->labels->name,
			'singular_name' => $post_type_object->labels->singular_name,
		];
	}

	return apply_filters( 'hm_gb_tools_post_type_labels', $data );
}

/**
 * Get taxonomies for each public post type.
 *
 * Used by the post select UI display filters.
 *
 * @return array.
 */
function get_post_type_taxonomies() {
	$post_types = get_post_types();

	$data = array_combine( $post_types, array_map( function( $post_type ) {
		return array_values( array_filter( array_map( function( $tax ) {
			if ( isset( $tax->show_in_rest ) && $tax->show_in_rest ) {
				return [
					'slug'  => $tax->name,
					'label' => $tax->label,
					'rest'  => ! empty( $tax->rest_base ) ? $tax->rest_base : $tax->name,
				];
			}
		}, get_object_taxonomies( $post_type, 'object' ) ) ) );
	}, $post_types ) );

	return apply_filters( 'hm_gb_tools_post_type_taxonomies', $data );
}


/**
 * Extend wp-api Backbone client with methods to look up the REST API endpoints for all post types.
 *
 * This is temporary while waiting for #41111 in core.
 *
 * @link https://core.trac.wordpress.org/ticket/41111
 */
function extend_wp_api_backbone_client() {
	// Post Types Mapping.
	$post_type_rest_base_mapping = [];
	foreach ( get_post_types( array(), 'objects' ) as $post_type_object ) {
		$rest_base = ! empty( $post_type_object->rest_base ) ? $post_type_object->rest_base : $post_type_object->name;
		$post_type_rest_base_mapping[ $post_type_object->name ] = $rest_base;
	}

	// Taxonomies Mapping.
	$taxonomy_rest_base_mapping = [];
	foreach ( get_taxonomies( array(), 'objects' ) as $taxonomy_object ) {
		$rest_base = ! empty( $taxonomy_object->rest_base ) ? $taxonomy_object->rest_base : $taxonomy_object->name;
		$taxonomy_rest_base_mapping[ $taxonomy_object->name ] = $rest_base;
	}

	$script  = sprintf( 'wp.api.postTypeRestBaseMapping = %s;', wp_json_encode( $post_type_rest_base_mapping ) );
	$script .= sprintf( 'wp.api.taxonomyRestBaseMapping = %s;', wp_json_encode( $taxonomy_rest_base_mapping ) );
	$script .= <<<JS
		wp.api.getPostTypeRoute = function( postType ) {
			return wp.api.postTypeRestBaseMapping[ postType ];
		};
		wp.api.getTaxonomyRoute = function( taxonomy ) {
			return wp.api.taxonomyRestBaseMapping[ taxonomy ];
		};
JS;
	wp_add_inline_script( 'wp-api', $script );
}

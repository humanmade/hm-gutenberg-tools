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

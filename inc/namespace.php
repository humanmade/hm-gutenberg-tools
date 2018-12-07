<?php

namespace HM\GutenbergTools;

require_once __DIR__ . '/endpoints/class-post-select-controller.php';

/**
 * Setup the plugin.
 */
function setup() {
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
	add_action( 'rest_api_init', __NAMESPACE__ . '\\register_api_endpoints' );
}

/**
 * Enqueue assets in the editor.
 */
function enqueue_block_editor_assets() {
	wp_enqueue_script(
		'hm-gb-tools-editor',
		HM_GB_TOOLS_URL . '/build/editor.bundle.js',
		[ 'wp-blocks', 'wp-element', 'wp-url', 'wp-components', 'wp-editor' ],
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
		'restBase' => esc_url_raw( get_rest_url() ),
		'postSelectEndpoint' => '/rbmh/v1/post-select',
	] );
}

/**
 * Setup the post select API endpoint.
 *
 * @return void
 */
function register_api_endpoints() {
	$controller = new Endpoints\Post_Select_Controller;
	$controller->register_routes();
}

/**
 * Get post type data.
 *
 * @return array
 */
function get_post_types() {
	$post_types = \get_post_types(
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
			'rest_base'     => $post_type_object->rest_base,
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
	$post_types = \get_post_types();

	$data = array_combine( $post_types, array_map( function( $post_type ) {
		return array_values( array_filter( array_map( function( $tax ) {
			if ( isset( $tax->show_in_rest ) && $tax->show_in_rest ) {
				return [
					'slug'     => $tax->name,
					'label'    => $tax->label,
					'restBase' => ! empty( $tax->rest_base ) ? $tax->rest_base : $tax->name,
				];
			}
		}, get_object_taxonomies( $post_type, 'object' ) ) ) );
	}, $post_types ) );

	return apply_filters( 'hm_gb_tools_post_type_taxonomies', $data );
}

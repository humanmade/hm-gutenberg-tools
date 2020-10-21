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
		trailingslashit( HM_GB_TOOLS_URL ) . 'build/editor.js',
		[ 'wp-blocks', 'wp-element', 'wp-url', 'wp-components', 'wp-editor' ],
		filemtime( HM_GB_TOOLS_DIR . '/build/editor.js' ),
		false
	);

	wp_enqueue_style(
		'hm-gb-tools-editor',
		trailingslashit( HM_GB_TOOLS_URL ) . 'build/editorStyles.css',
		[],
		filemtime( HM_GB_TOOLS_DIR . '/build/editorStyles.css' )
	);

	wp_localize_script( 'hm-gb-tools-editor', 'hmGbToolsData', [
		'restBase' => esc_url_raw( get_rest_url() ),
		'postSelectEndpoint' => '/hm-gb-tools/v1/post-select',
	] );

	wp_set_script_translations( 'hm-gb-tools-editor', 'hm-gb-tools' );
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

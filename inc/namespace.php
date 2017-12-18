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
		filemtime( HM_GB_TOOLS_PATH . '/build/editor.bundle.js' ),
		false
	);

	wp_enqueue_style(
		'hm-gb-tools-editor',
		HM_GB_TOOLS_URL . '/build/editor.css',
		[],
		filemtime( HM_GB_TOOLS_PATH . '/build/editor.css' )
	);
}

<?php
/**
 * Development block. For testing.
 */

namespace HM\GutenbergTools\Blocks\Dev;

/**
 * Setup.
 *
 * @return void
 */
function setup() {
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
	register_block_type( __DIR__ );
}

/**
 * Register scripts.
 *
 * @return void
 */
function enqueue_block_editor_assets() : void {
	wp_register_script(
		'hm-gb-tools-block-dev-editor',
		trailingslashit( HM_GB_TOOLS_URL ) . '/blocks/dev/build/editor.js',
		[ 'hm-gb-tools-editor' ],
		filemtime( HM_GB_TOOLS_DIR . '/blocks/dev/build/editor.js' ),
		false
	);

}

<?php
/**
 * Plugin Name:  HM Gutenberg Tools Plugin
 * Plugin URI:   https://hmn.md
 * Description:  Tools for Gutenberg.
 * Version:      1.6.3
 * Author:       Human Made Limited
 * Author URI:   https://hmn.md
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  hm-gb
 * Domain Path:  /languages
 */

defined( 'HM_GB_TOOLS_DIR' ) || define( 'HM_GB_TOOLS_DIR', plugin_dir_path( __FILE__ ) );
defined( 'HM_GB_TOOLS_URL' ) || define( 'HM_GB_TOOLS_URL', plugin_dir_url( __FILE__ ) );
defined( 'HM_GB_TOOLS_DEV' ) || define( 'HM_GB_TOOLS_DEV', false );

require_once __DIR__ . '/inc/namespace.php';
require_once __DIR__ . '/inc/endpoints/class-post-select-controller.php';

add_action( 'after_setup_theme', function() {
	\HM\GutenbergTools\setup();

	if ( HM_GB_TOOLS_DEV ) {
		require_once __DIR__ . '/blocks/dev/block.php';
		\HM\GutenbergTools\Blocks\Dev\setup();
	}
});

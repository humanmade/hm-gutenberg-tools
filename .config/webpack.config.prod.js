/**
 * .config/webpack.config.prod.js :
 * This file defines the production build configuration
 */
const { helpers, externals, presets } = require( '@humanmade/webpack-helpers' );
const { filePath } = helpers;

module.exports = presets.production( {
	name: 'editor',
	externals,
	entry: {
		editor: filePath( 'js/editor.js' ),
		editorStyles: filePath( 'css/editor.scss' ),
	},
	output: {
		path: filePath( 'build' ),
	},
} );

/**
 * .config/webpack.config.prod.js :
 * This file defines the production build configuration
 */
const { helpers, externals, presets, loaders } = require( '@humanmade/webpack-helpers' );
const { filePath } = helpers;

/**
 * Ignore files in node_modules.
 * This is necessary for react-select 4+, see https://github.com/JedWatson/react-select/issues/4448#issuecomment-787625313
 */
loaders.file.defaults.exclude = [ /\.(js|html|json)$/, /node_modules/ ];

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

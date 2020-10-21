/**
 * .config/webpack.config.prod.js :
 * This file defines the production build configuration
 */
const { helpers, externals, presets } = require( '@humanmade/webpack-helpers' );
const { filePath, choosePort, cleanOnExit } = helpers;

// Clean up manifests on exit.
cleanOnExit( [
	filePath( 'build/asset-manifest.json' ),
] );

module.exports = choosePort( 8080 ).then( port => {
	return presets.development( {
		devServer: {
			port,
		},
		externals,
		entry: {
			editor: filePath( 'js/editor.js' ),
			editorStyles: filePath( 'css/editor.scss' ),
		},
		name: 'editor',
		output: {
			path: filePath( 'build' ),
			publicPath: `http://localhost:${ port }/build/`,
		},
	} );
} );

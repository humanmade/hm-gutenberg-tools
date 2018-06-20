const path = require( 'path' );
const webpack = require( 'webpack' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const isProduction = ( process.env.NODE_ENV === 'production' );

const plugins = [
	new BundleAnalyzerPlugin( {
		analyzerMode: 'static',
		openAnalyzer: false,
	} ),
]

if ( isProduction ) {
	plugins.push( new webpack.DefinePlugin( { 'process.env.NODE_ENV': JSON.stringify('production') } ) );
	plugins.push( new webpack.optimize.UglifyJsPlugin() );
}

module.exports = {
	entry: { editor: './js/editor.js', },
	output: {
		path:     path.resolve( __dirname, 'build' ),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test:    /\.(js|jsx|mjs)$/,
				exclude: /(node_modules|bower_components)/,
				use:     { loader: 'babel-loader' },
			},
		],
	},
	externals: {
		jquery:      'jQuery',
		tinymce:     'tinymce',
		moment:      'moment',
		react:       'React',
		'react-dom': 'ReactDOM',
		wp:          'wp',
		backbone:    'Backbone',
	},
	stats:   { colors: true },
	devtool: isProduction ? false : 'source-map',
	plugins,
};

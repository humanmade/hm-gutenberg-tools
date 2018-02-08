const path = require( 'path' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' )
const isProduction = ( process.env.NODE_ENV === 'production' );

const plugins = [];

if ( ! isProduction ) {
	plugins.push( new BundleAnalyzerPlugin( {
		analyzerMode: 'static',
		openAnalyzer: false,
	} ) );
}

if ( isProduction ) {
	plugins.push( new UglifyJsPlugin() );
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
				use:     {
					loader:  'babel-loader',
					options: {
						babelrc: false,
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
						plugins: [
							[
								'transform-object-rest-spread',
								{ useBuiltIns: true },
							],
							'transform-class-properties',
							[
								'transform-react-jsx',
								{ pragma: 'wp.element.createElement' },
							],
						],
					},
				},
			},
		],
	},
	externals: {
		jquery:             'jQuery',
		react:              'React',
		'react-dom':        'ReactDOM',
		'react-dom/server': 'ReactDOMServer',
		tinymce:            'tinymce',
		moment:             'moment',
		wp:                 'wp',
		backbone:           'Backbone',
	},
	stats:   { colors: true },
	devtool: isProduction ? false : 'source-map',
	plugins,
};

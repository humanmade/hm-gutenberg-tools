const path = require( 'path' );

module.exports = {
	entry: {
		editor: './js/editor.js',
	},
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
						plugins: [
							[
								'transform-object-rest-spread',
								{
									useBuiltIns: true,
								},
							],
							'transform-class-properties',
							[
								'transform-react-jsx',
								{
									pragma: 'wp.element.createElement',
								},
							],
						],
					},
				},
			},
		],
	},
	externals: {
		jquery: 'jQuery',
		react: 'React',
		'react-dom': 'ReactDOM',
		'react-dom/server': 'ReactDOMServer',
		tinymce: 'tinymce',
		moment: 'moment',
		wp: 'wp',
	},
	stats: {
		colors: true,
	},
	devtool: 'source-map',
};

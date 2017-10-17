var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
	// what it actually does is basically 
	// gathering all of our css from .scss files
	// into one file named 'main.css'
	filename: 'main.css'
});

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		// publicPath: '/dist', // this tells webpack-dev-server where to look for all files 
	},
	module: {
		rules: [
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 		'style-loader',
			// 		'css-loader',
			// 		'scss-loader'
			// 	]
			// },
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						exclude: /node_modules/,
						options: {
							presets: ['es2015']
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: extractPlugin.extract({
					use: [
						'css-loader',
						'sass-loader'
					]
				})
			},
      // {
      //     test: /\.html$/,
      //     use: ['html-loader']
      // },
      {
        test: /\.pug$/,
        use: [
        	'html-loader',
        	'pug-html-loader'
        ]
      },
			{
				test: /\.(jpg|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img/', // it tells where to put images (in our case 'dist/img')
							publicPath: 'img/', // it tells where to take photos from (in our case 'src/img/')
						}
					}
				]
			}
		]
	},
	plugins: [
		extractPlugin,
		new HtmlWebpackPlugin({
			template: 'src/index.pug'
		}),
		new CleanWebpackPlugin(['dist'])
	]
};
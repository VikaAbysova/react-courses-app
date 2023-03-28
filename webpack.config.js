const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index.bundle.js',
	},
	devServer: {
		static: path.resolve(__dirname, 'src'),
		port: 3000,
		open: true,
		hot: true,
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [new MiniCssExtractPlugin()],
};

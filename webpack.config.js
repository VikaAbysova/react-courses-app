const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServerWebpack = require('./webpack.dev-server');
const resolveWebpack = require('./webpack.resolve');
const moduleWebpack = require('./webpack.module');

module.exports = {
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'index.bundle.js',
  },
  devServer: devServerWebpack,
  resolve: resolveWebpack,
  module: moduleWebpack,
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

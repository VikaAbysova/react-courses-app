const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServerWebpack = require('./webpack.dev-server');
const resolveWebpack = require('./webpack.resolve');
const moduleWebpack = require('./webpack.module');
// const { default: devServerWebpack } = require('./webpack.dev-server');
// const { default: resolveWebpack } = require('./webpack.resolve').default;
// const { default: moduleWebpack } = require('./webpack.module');
// const { default: devServer } = require('./webpack.dev-server');
// const { default: resolve } = require('./webpack.resolve');
// const { default: moduleWebpack } = require('./webpack.module');
// import devServer from './webpack.dev-server.js';
// import './webpack.dev-server.js';
// import './webpack.module.js';
// import './webpack.resolve.js';

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

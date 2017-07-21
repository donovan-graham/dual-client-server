const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const rootOutputPath = path.join(__dirname, '../dist/client');
const jsPublicPath = '/static/js/';
const jsOutputPath = path.join(rootOutputPath, './static/js');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'index.html'),
  filename: path.join(rootOutputPath, 'index.html'),
  inject: 'body',
  alwaysWriteToDisk: true,
});

const HtmlWebpackHarddiskPluginConfig = new HtmlWebpackHarddiskPlugin();

const config = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: jsOutputPath,
    publicPath: jsPublicPath,
    filename: 'index.bundle.js',
  },
  module: {
    loaders: [{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },
  plugins: [HtmlWebpackPluginConfig, HtmlWebpackHarddiskPluginConfig],
  devServer: {
    contentBase: rootOutputPath,
    // hot: true,
    port: 3001,
    host: '0.0.0.0',
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};

module.exports = config;

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const rootOutputPath = path.join(__dirname, '../dist/client');
const staticOutputPath = path.join(rootOutputPath, 'static');
const jsOutputPath = path.join(staticOutputPath, 'js');

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
    filename: 'index.bundle.js',
  },
  module: {
    loaders: [{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },
  plugins: [HtmlWebpackPluginConfig, HtmlWebpackHarddiskPluginConfig],
  devServer: {
    // hot: true,
    port: 3001,
    host: '0.0.0.0',
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};

module.exports = config;

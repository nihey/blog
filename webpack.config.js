var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlPlugin = require('./plugins/html-plugin'),
    ContentPlugin = require('./plugins/content'),
    path = require('path');

module.exports = {
  entry: {
    'style': './styles/index.less',
    'script': './scripts/index.js',
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      },
      { test: /.(png|jpe?g|gif|svg|eot|woff2?|ttf).*$/, loader: 'file-loader'},
      { test: /.json$/, loader: 'json-loader'},
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlPlugin('index.html'),
    new ContentPlugin('content/**', 'index.html'),
    new webpack.DefinePlugin({
      Environment: JSON.stringify(require('config')),
    }),
  ],

  resolve: {
    root: path.join(__dirname, 'scripts'),
    extensions: ['', '.js', '.json'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
};

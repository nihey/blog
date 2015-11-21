var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path');

module.exports = {
  entry: {
    'style': './styles.less',
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
    ],
  },

  plugins: [new ExtractTextPlugin('[name].css')],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
};

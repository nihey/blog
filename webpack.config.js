var webpack = require('webpack');

module.exports = {
  entry: './js/blog.js',
  devtool: ['source-map'],

  module: {
    loaders: [
      {test: /\.html$/, loader: 'handlebars-loader'}
    ],
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.html'],
  },

  output: {
    path: './dist/',
    filename: 'blog.js',
  },

  plugins: [
    new webpack.ProvidePlugin({
      files: 'exports?files.files!js/index',
      $: 'bower_components/jquery/dist/jquery',
      Handlebars: 'bower_components/handlebars/handlebars',
      moment: 'bower_components/moment/moment',
      routie: 'exports?window.routie!bower_components/routie/dist/routie.min',
    }),
  ],
};

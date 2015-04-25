var webpack = require('webpack');

module.exports = {
  entry: './js/blog.js',

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
    filename: 'blog.min.js',
  },

  plugins: [
    new webpack.ProvidePlugin({
      Files: 'exports?this.files!js/index',
      $: 'bower_components/jquery/dist/jquery.min',
      Handlebars: 'bower_components/handlebars/handlebars.min',
      moment: 'bower_components/moment/min/moment-with-locales.min.js',
      routie: 'exports?window.routie!bower_components/routie/dist/routie.min',
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ],
};

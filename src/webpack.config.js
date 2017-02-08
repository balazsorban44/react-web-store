var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "assets"),
  entry: {
    main: "./js/main.js",
    store: "./js/store.jsx"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'assets','js'),
    publicPath: '/',
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false,
      compress: {warnings: false}
    })
  ],
};

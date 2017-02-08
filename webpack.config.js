var webpack = require("webpack"),
    path = require("path"),
    DIST_DIR = path.resolve(__dirname, "."),
    SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/app/js/index.js",
    output: {
        path: DIST_DIR + "/app/js",
        filename: "main.js",
        publicPath: DIST_DIR
    },
    module: {
        loaders: [{

          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
          }
        }]
    },
    plugins: [
      new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),

      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false,
        compress: {warnings: false}
      })
    ]
};

module.exports = config;

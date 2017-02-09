import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const DEVELOPMENT = process.env.NODE_ENV === 'development',
      PRODUCTION = process.env.NODE_ENV === 'production',
      entry = PRODUCTION
              ? ['./src/js/index.js']
              : [
                './src/js/index.js',
                'webpack/hot/dev-server',
                'webpack-dev-server/client?http://localhost:8080'
              ],

      plugins = PRODUCTION
                ? [
                    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
                    new webpack.optimize.UglifyJsPlugin(),
                    new ExtractTextPlugin('dist/assets/css/main.css')
                  ]
                : [new webpack.HotModuleReplacementPlugin()],

      cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]',
      cssLoader = PRODUCTION ? ExtractTextPlugin.extract({loader: 'css-loader?localIdentName=' + cssIdentifier}) : ['style-loader, css-loader?localIdentName=' + cssIdentifier]

module.exports = {
    entry: entry,
    output: {
      path: path.join(__dirname, 'dist', 'assets','js'),
      publicPath: '/dist/',
      filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
            }
          },
          { test: /\.css$/, loaders: ['style-loader', 'css-loader']
          },
          {
            test: /\.svg$/,
            use: 'file-loader?name=/dist/images/icons/[name].[ext]'
          },
          {
            test: /\.png$/,
            use: 'file-loader?name=/dist/images/[name].[ext]'
          },
          {
            test: /\.jpg$/,
            use: 'file-loader?name=/dist/images/products/[name].[ext]'
          },
          {
            test: /\.json$/,
            use: 'json-loader'
          }

        ]
    },
    plugins: plugins
}

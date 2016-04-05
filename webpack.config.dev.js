var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10', 'ie_mob >= 10',
  'ff >= 30', 'chrome >= 34',
  'safari >= 7', 'opera >= 23',
  'ios >= 7', 'android >= 4.4',
  'bb >= 10'
];

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css!postcss'
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url?limit=100',
    }, {
      test: /\.html$/,
      loader: 'raw' // loaders: ['raw-loader'] is also perfectly acceptable.
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  postcss: function(webpack) {
    return [
      require('postcss-import')({addDependencyTo: webpack}),
      require('postcss-nested'),
      require('postcss-css-variables'),
      require('autoprefixer')(AUTOPREFIXER_BROWSERS),
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
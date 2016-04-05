var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10', 'ie_mob >= 10',
  'ff >= 30', 'chrome >= 34',
  'safari >= 7', 'opera >= 23',
  'ios >= 7', 'android >= 4.4',
  'bb >= 10'
];

module.exports = {
  entry: ['./src/main'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[hash].js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin("[hash].css")
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style", "css?minimize!postcss")
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url?name=[hash].[ext]&limit=100',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  postcss: function(webpack) {
    return [
      require('postcss-import')({addDependencyTo: webpack}),
      require('autoprefixer')(AUTOPREFIXER_BROWSERS),
      require('postcss-nested'),
      require('postcss-css-variables'),
      require('postcss-zindex')
    ]
  },
}

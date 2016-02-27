var path = require('path');
var webpack = require('webpack');
var rucksack = require('rucksack-css');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './build'),
    filename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: /src/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /src/,
        loader: 'style!css'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ],
  },
  resolve: {
    extensions: ['', '.js']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', '[hash].js'),
    new HtmlwebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('style.css'),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
  ],
  devServer: {
    hot: true,
    stats: {
      colors: true
    },
  }
}
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCss = new ExtractTextPlugin({
  // filename: "[name].[contenthash].css",
  filename: "bundle.css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './src/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    // publicPath: 'public/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react-app'],
          }
        }
      },
      {
        test: /\.scss$/,
        use: extractCss.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => {
                  return [
                    require('autoprefixer')(),
                    require('cssnano')(),
                  ];
                }
              }
            },
            'sass-loader'
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          }
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    extractCss,
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(['public']),
  ],
}

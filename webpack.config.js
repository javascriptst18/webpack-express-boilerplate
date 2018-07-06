const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.resolve(__dirname, 'client'),
  entry: {
    app: ['webpack-hot-middleware', './scripts/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                autoprefixer({
                  // which browsers to prefix css for: http://browserl.ist/
                  browsers: ['last 3 versions', '> 1%'],
                }),
              ],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  polyfill: false,
                  regenerator: true,
                },
              ],
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: false,
                  targets: {
                    // which browsers to convert javascript for: http://browserl.ist/
                    browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  devtool: 'inline-source-map', // Use source maps
  devServer: {
    hot: true,
    port: 3000, // Tell dev-server which port to run
    contentBase: path.resolve(__dirname, 'client'), // serve from 'dist' folder when in dev mode
  },
  plugins: [
    new CleanWebpackPlugin(['client/dist']), // cleans the dist folder on every new build
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.ejs', // creates an `index.html`-file from `index.ejs`
    }),
  ],
};

module.exports = config;

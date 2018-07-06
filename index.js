/** eslint-disable */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.js')

const server = express();
const compiler = webpack(config);

server.use(webpackDevMiddleware(compiler));
server.use(webpackHotMiddleware(compiler));

server.get('*', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

server.listen(3000, '0.0.0.0', (err) => {
  if (err) { console.log(err); }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:3000/ in your browser.');
});

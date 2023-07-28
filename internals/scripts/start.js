'use strict';

const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const pkg = require(path.resolve(process.cwd(), "package.json"));
const chalk = require("chalk");

const app = express();
const config = require("../webpack.config.js");

const compiler = webpack(config);


const PORT = 8100;

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/statics',
    quiet: true,
    noInfo: true,
    stats: {
      colors: true,
      children: false,
    },
  })
);

app.use(
	webpackHotMiddleware(compiler, {
  reload: true,
  path: '/__webpack_hmr',
})
);

app.listen(PORT, function () {
  console.log(chalk.green(`App listening to port: ${PORT}`));
});

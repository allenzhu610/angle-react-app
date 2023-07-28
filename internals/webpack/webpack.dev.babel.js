const path = require("path");
const webpack = require("webpack");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const entryObj = require("./getEntry").getEntryObj();
const pkg = require(path.resolve(process.cwd(), "package.json"));
const getValue = require('lodash/get');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: false,
  }),
];

module.exports = require("./webpack.base.babel")({
  mode: "development",
  entry: entryObj,
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath: `/${getValue(pkg, "hostPrefix", "angle")}/statics/`,
  },
  devtool: "eval-source-map",
  performance: {
    hints: false,
  },
  plugins,
});

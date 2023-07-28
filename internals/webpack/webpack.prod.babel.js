const path = require("path");
const { HashedModuleIdsPlugin } = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const pkg = require(path.resolve(process.cwd(), "package.json"));
const entryObj = require("./getEntry").getEntryObj();
const getValue = require('lodash/get');

const plugins = [
  new HashedModuleIdsPlugin({
    hashFunction: "sha256",
    hashDigest: "hex",
    hashDigestLength: 20,
  }),
];

module.exports = require("./webpack.base.babel")({
  mode: "production",

  devtool: false,

  entry: entryObj,

  output: {
    publicPath: `/${getValue(pkg, "hostPrefix", "angle")}/statics/`,
    filename: "[name].[contenthash].chunk.js",
    chunkFilename: "[name].[contenthash].chunk.js",
  },

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            inline: false,
          }
        },
      }),
    ],
  },

  plugins: plugins,

  performance: {
    assetFilter: (assetFilename) =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});

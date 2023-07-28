const path = require("path");
const webpack = require("webpack");
const { AssetOutputPlugin } = require("../plugins");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const SVGSpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const pkg = require(path.resolve(process.cwd(), "package.json"));
const getValue = require("lodash/get");

process.noDeprecation = true;

const buildModules = (options) => {
  const urlLoader = {
    loader: "url-loader",
    options: {
      limit: 1000,
      publicPath: `/${getValue(pkg, "hostPrefix", "angle")}/statics/`,
    },
  };

  const defaultOptions = {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: options.babelQuery,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: options.babelQuery,
        },
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.less/,
        include: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              publicPath: "statics/",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
      },
      {
        test: /\.svg$/,
        loader: urlLoader,
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: urlLoader,
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
          },
        },
      },
    ],
  };

  if (options.module) {
    return { rules: defaultOptions.rules.concat(options.module.rules) };
  }

  return defaultOptions;
};

const buildPlugins = (options) => {
  const plugins = [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new AssetOutputPlugin(),
    new SVGSpriteLoaderPlugin(),
  ];

  console.log(options.plugins.concat(plugins));

  if (process.env.analyzChunk) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerMode: "static" }));
  }

  return options.plugins.concat(plugins);
};

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  module: buildModules(options),
  output: Object.assign(
    {
      path: path.join(process.cwd(), "./build/statics"),
      globalObject: "this",
    },
    options.output
  ),
  plugins: buildPlugins(options),
  resolve: {
    modules: ["client", "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".react.js"],
    mainFields: ["browser", "jsnext:main", "main"],
  },
  devtool: options.devtool,
  target: options.target || "web",
  performance: options.performance || {},
  devServer: options.devServer || {},
  externals: options.externals || {},
});

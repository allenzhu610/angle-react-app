"use strict";

module.exports = function (api) {
  api.cache(true);

  console.log("-----babel start----");
  console.log(api);
  console.log("-----babel api----");

  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3
      },
    ],
  ];

  const plugins = [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-syntax-dynamic-import",
  ];

  return {
    presets,
    plugins,
  };
};

"use strict";
const path = require("path");
const pkg = require(path.join(process.cwd(), "package.json"));
const getValue = require('lodash/get');

module.exports = (apkInfo) => {
  const config = {};
  config.keys = pkg.name;

  config.middleware = ['locals'];

  config.view = {
    mapping: {
      ".html": "ejs",
    },
    defaultViewEngine: 'ejs'
  };

  config.security = {
    csrf: {
      headerName: "x-csrf-token",
    },
    xframe: {
      enable: true,
    },
  };

  config.session = {
    key: 'connect.magick',
    maxAge: 86400000,
    httpOnly: true,
    renew: true
  }

  config.static = {
    prefix: "/statics/",
    dir: path.join(process.cwd(), "/build/statics")
  };

  config.assetUrl = `/${getValue(pkg, "hostPrefix", "angle")}/statics/`;

  return config;
};

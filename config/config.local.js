module.exports = (apkInfo) => { 
  const config = {};

  config.proxy = {
    host: "http://127.0.0.1:8100",
    match: /\/statics/,
  };

  return config;
}
const path = require("path");
const fs = require("fs");
const get = require("lodash/get");
const chalk = require("chalk");

const assetPath = path.join(process.cwd(), "build");

const getAssetData = (ctx) => {
  try {
    const assetJson = path.join(assetPath, "asset.json");
    if (fs.existsSync(assetJson)) {
      return require(assetJson);
    }

    return {};
  } catch (e) {
    chalk.red(e);
    return {};
  }
};

module.exports = (options) => async (ctx, next) => {
  const assetData = getAssetData(ctx);
  const chunks = assetData.chunks;
  ctx.locals.assets = assetData;
  const chunksMap = {};

  for (const item in chunks) {
    if (chunks.hasOwnProperty(item)) {
      const jsArr = get(chunks, [item, "js"], []);
      chunksMap[item] = jsArr
        .map(
          (item) =>
            `<script type="text/javascript" src="${ctx.app.config.assetUrl}${item}"></script>`
        )
        .join("");
    }
  }

  ctx.locals.varies = {};

  ctx.locals.chunksMap = chunksMap;

  await next();
};

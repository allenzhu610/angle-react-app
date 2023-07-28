const path = require('path');
const isEmpty = require('lodash/isEmpty');
const fs = require("fs");
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'pro';

// 获取打包入口

class Entry {
  constructor() {
  }

  operateEntry(entry) {

    if (env === 'development') {
      const keys = Object.keys(entry);
      keys.forEach(module => {
        entry[module].unshift('webpack-hot-middleware/client?path=http://127.0.0.1:8100/__webpack_hmr');
      })
    }
    return entry;
  }

  getEntryObj() {
    // 获取所有目录下的入口文件
    const dirObj = {};
    const assectPath = path.resolve(process.cwd(), 'client', 'modules');


    if (fs.existsSync(assectPath)) {
      const modules = fs.readdirSync(assectPath);

      console.log('!!!!!!', modules);

      for (var moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {

        if (modules[moduleIndex] === 'assets' || modules[moduleIndex] === 'common') {
          continue;
        }

        // 首层
        if (fs.statSync(assectPath + '/' + modules[moduleIndex]).isDirectory()) {

          // module 层

          let moduleName = modules[moduleIndex];
          let moduleIndexPath = path.resolve(assectPath, moduleName, 'index.tsx');

          if (moduleName === 'assets' || moduleName === 'common') {
            continue;
          }

          if (fs.existsSync(moduleIndexPath) && fs.statSync(moduleIndexPath).isFile()) {
            dirObj[moduleName] = [moduleIndexPath];
          }
        }
      }
    }
    console.log('-----dirObj start----');
    const finalEntry = this.operateEntry(dirObj);
    console.log(finalEntry);
    console.log('------dirObj end-------');
    return finalEntry;
  }
}

module.exports = new Entry();
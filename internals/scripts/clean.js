'use strict';
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

// 获取构建目录
const buildFolder = path.join(process.cwd(), 'build');

// 构建目录如果存在，则删除之
const exists = fs.existsSync(buildFolder);
if (exists) {
  shell.rm('-rf', buildFolder);
}

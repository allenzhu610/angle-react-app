const { fork } = require("child_process");
const path = require("path");

const scriptPath = path.join(__dirname, "./start.js");

fork(scriptPath);

const fileBrowser = require("./tools/fileBrower");

let d = new fileBrowser("./play");

console.log(d.control.makeFile("testing.js","play"));

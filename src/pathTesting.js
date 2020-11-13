const Directory = require("./tools/DirectoryManager")
let PT = new Directory("f:/tools")

let workdirectory = PT.getDirectory("Projects");

console.log(workdirectory.readDirectory())
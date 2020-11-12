const Directory = require("./tools/ProyectManager")
let PT = new Directory("F:/tools")

let workdirectory = PT.setTypeProject();

console.log(workdirectory.getProjects())
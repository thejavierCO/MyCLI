const Directory = require("./tools/ProyectManager")
let PT = new Directory("F:/tools")

let workdirectory = PT.setTypeProject();

console.log(workdirectory.addProyect())
console.log(workdirectory.addProyect("svelte"))
console.log(workdirectory.addProyect("react"))

console.log(workdirectory)
const Directory = require("./tools/ProyectManager");
const Node = require("./tools/NodeManager");

let PT = new Directory("f:/tools");

let workdirectory = PT.Type.set("svelte");

console.log(workdirectory.new("testing"),8)
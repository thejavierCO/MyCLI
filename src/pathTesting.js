const Directory = require("./tools/ProyectManager");
const Node = require("./tools/NodeManager");

let PT = new Directory("f:/tools");
let workdirectory = PT.Type.set("svelte");
let nodetest = new Node(workdirectory.new("testing"));

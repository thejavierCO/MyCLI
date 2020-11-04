const setDirectory = require("./tools/setDirectory");
let directory = new setDirectory();

directory.set("CMD");
directory.set("Proyects");

console.log(directory.get("CMD"))
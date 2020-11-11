const commands     = require("commands");
const inquirer     = require("inquirer");
const setDirectory = require("./tools/setDirectory");
let directory = new setDirectory();

directory.set("CMD");
directory.set("Proyects");

let add = commands.get("add")
if(add !== ""){
    directory.add("CMD",add)
    .then(e=>console.log(e))
    .catch(e=>console.log(e))
}
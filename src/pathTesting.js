const quest = require("./tools/questManager")
const Directory = require("./tools/ProyectManager");
const Node = require("./tools/NodeManager");
const Git = require("./tools/GitManager");

let dir = new Directory("f:/tools");

let CLI = new quest(dir);

CLI.getType()
.then(e=>
    CLI.getProject(false,e).catch(e=>{
        console.log(e)
        throw e;
    })
)
.then(e=>
    CLI.setNode(false,e).catch(e=>{
        console.log(e)
        throw e;
    })
)
.then(e=>
    CLI.setinitNode(e).catch(e=>{
        console.log(e)
        throw e;
    })
)
.then(e=>
    CLI.setGit(false,e).catch(e=>{
        console.log(e)
        throw e;
    })
)
.then(e=>
    CLI.setinitGit(e).catch(e=>{
        console.log(e)
        throw e;
    })
)
.then(e=>console.log(e))
.catch(e=>{
    console.log(e)
    throw e;
})
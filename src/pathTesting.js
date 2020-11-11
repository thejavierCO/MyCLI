const arguments = require("./tools/setArguments");
const setDirectory = require("./tools/setDirectory");

let directory = new setDirectory();
let data = new arguments();

// directory.set("CMD");
directory.set("Proyects");

data.get(["new","name"])
.then(e=>e.filter(e=>typeof e.data === "string"||typeof e.data === "boolean"))
.then(e=>e.map(e=>({[e.name]:e.data,tag:e.name})))
.then(e=>{
    let {0:{new:setTP},1:{name:setNP}} = e;
    
})
// .then(e=>({
//     [e[0].new]:
// }))

// data.get("add")
// .then(e=>{
//     console.log(e);
//     return e;
// })
// .then(e=>e.exists===true?inquirer.prompt({
//     type:"confirm",
//     name:"realyAdd",
//     message:"agregar?"
// }):false)
// .then(e=>{
//     console.log(e)
// })

// let add = commands.get("add")
// if(commands.exists("add")){
    // inquirer.prompt({
    //     type:"confirm",
    //     name:"realyAdd",
    //     message:"agregar?"
    // })
    // .then(({realyAdd})=>realyAdd?directory.add("CMD",add):false)
    // .then(e=>{
    //     // let {path} = process.env;
    //     // let add = path.split(";");
    //     // add.push(e)
    //     // console.log(add.join(";"))
    //     // return cmd('SETX /M epath "%Path%;'+e+';"',{stdout:"inherit"})
    // })
    // .catch(e=>console.log(e))
// }
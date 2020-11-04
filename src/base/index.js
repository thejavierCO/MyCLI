let path = require("path");
let cmd = require("execa");
let commands = require("commands");
let inquirer = require("inquirer");

let file = require("file-maker");
let fileExist = require("file-exists");

let setDir = require("make-dir");
let {dirExists:existdir} = require("dir-exists-safe");

let home = path.resolve("f:","Projects");

let setCapitaleDirectory  = (root,a)=>{
    let r = a.split("\\");
        r = (r.slice(r.length-1))[0];
    let b = (r[0].charAt(0)).toLocaleUpperCase();
    return path.join(root,b+(r.slice(1)));
}

let getDirectory = async (dir,message,invert=false)=>await existdir(dir)
.then(e=>{if(e){return dir;}else{throw dir;}})
.then(e=>typeof message !== "undefined"&&invert===true?
    inquirer.prompt({
        type:"confirm",
        name:"exist",
        message
    }).then(({exist})=>exist?dir:false)
:e)
.catch(d=>typeof message !== "undefined"&&invert===false?
    inquirer.prompt({
        type:"confirm",
        name:"make",
        message
    }).then(({make})=>make?createDir(d):false)
:createDir(d))
.then(e=>{if(e===false){throw {result:e};}else{return e;}})

let createDir = async (e)=>e?setDir(e):false;

let run = async (a)=>{
    if(!fileExist.sync(path.join(a,"package.json"))){
        await cmd.command("npm init -y",{
            stdio:"inherit",
            cwd:a
        });
    }
    await getDirectory(path.join(a,"src"),"not exist source directory \n your create?");
    await cmd.command("code "+a);
}

let setProyect = async (a)=>{
    await getDirectory(a,"not exist your type directory").then(dir=>
        inquirer.prompt([{
            type:"input",
            name:"project",
            message:"your name proyect is",
            validate:a=>a===''?((a)=>{
                console.log("require name proyect");
                return a;
            })(false):true
        }]).then(({project})=>path.join(dir,project))
    ).then(e=>getDirectory(e,"exist directory continue",true))
    .then(e=>run(e))
    .catch(e=>{
        let {result} = e;
        if(result!==false){
            console.log(e,"ashdiua");
        }
    })
}

if(typeof commands.get("new") !== "string"){
    inquirer.prompt([
        {
            type:"input",
            name:"Directory",
            message:"Type Proyect is",
            validate:a=>a===''?((a)=>{
                console.log("require type proyect");
                return a;
            })(false):true
        }
    ])
    .then(({Directory})=>setCapitaleDirectory(home,Directory))
    .then(e=>setProyect(e))
}else if(commands.exists("new")){
    if(commands.get("new")!==""){
        let dir = setCapitaleDirectory(home,commands.get("new")); 
        setProyect(dir)
    }else{
        throw "require name type proyect";
    }
}
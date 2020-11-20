const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const command = require("execa");

let {readdirSync} = fs;

class dir{
    constructor(root,manager){
        this.name = root.split("\\")[root.split("\\").length-1];
        this.read = ()=>readdirSync(root)
        .map(e=>({
            ...new manager(path.resolve(root,e))
        }))
        this.makeDir = (name)=>{
            if(!name)throw {error:"not defined name"}
            return fs.mkdir(path.resolve(root,name))
        }
        this.makeFile = (name,data="")=>{
            if(!name)throw {error:"not defined name"}
            return fs.appendFile(path.resolve(root,name),data)
        }
    }
}

module.exports = dir;
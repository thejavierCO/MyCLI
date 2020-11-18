const path = require("path")
const fs = require("fs");
const execa = require("execa");

class NodeManager{
    constructor(projectManager){
        this.project = projectManager;
        this.get = ()=>fs.existsSync(path.resolve(this.project.dir.root,"package.json"))
	this.Start = async ()=>await execa("npm init -y",{stdout:"inherit",cwd:this.project.dir.root}).then(e=>{this.init = true;return e})
        this.getModules = async (modules,isdev)=>{
            let dev = isdev?" -D":" ";
            if(fs.existsSync(path.resolve(this.project.dir.root,"package.json"))){
                if(typeof modules === "object"&&modules.length>0){
                    return await execa("npm i "+modules.join(" ")+dev,{stdout:"inherit",cwd:this.project.dir.root})
                }
            }else{
                throw {error:"not set package.json",path:this.project.dir.root}
            }
        }
	this.init = this.get();
    }
}

module.exports = NodeManager;

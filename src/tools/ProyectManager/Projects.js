const Git = require("../GitManager");
const Node = require("../NodeManager");
const execa = require("execa");
const path = require("path");
const fse = require("fs-extra");


class ProjectInit{
    constructor(dir,type,name){
        if(!dir)throw "not exist directoryManager"
        this.dir = dir;
        if(!type)throw "not exist type"
        this.type = type;
        if(!name)throw "not exist name"
        this.name = name;
	this.Node = new Node(this);
	this.Git = new Git(this);
	this.Run = (a)=>execa.sync(a,{stdout:"inherit",cwd:this.dir.root})
    }
}

class Project{
    constructor(dir,type="default",name){
        this.directory = dir;
        this.type = type;
        if(name){
            return this.set(name);
        }
    }
    set = (nameProject="default")=>{
        if(!fse.pathExistsSync(path.resolve(this.directory.root,nameProject))){
            return new ProjectInit(this.directory.setDirectory(nameProject),this.type,nameProject);
        }else{
            return new ProjectInit(this.directory.getDirectory(nameProject),this.type,nameProject);
        }
    }
    get = (nameProject="default")=>{
        if(!fse.pathExistsSync(path.resolve(this.directory.root,nameProject))){
            throw {error:"not exist proyect",name:nameProject}
        }else{
            return new ProjectInit(this.directory.getDirectory(nameProject),this.type,nameProject);
        }
    }
    del = (nameProject="default")=>{
        if(!fse.pathExistsSync(path.resolve(this.directory.root,nameProject))){
            throw {error:"not exist proyect",name:nameProyect}
        }else{
            return this.directory.delDirectory(nameProject)
        }
    }
    gets = ()=>this.directory.readDirectory().map(e=>{
        console.log(e);
        return e;
    });
}

module.exports = Project;

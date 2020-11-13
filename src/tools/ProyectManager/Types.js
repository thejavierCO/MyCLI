const path = require("path");
const fse = require("fs-extra");
const Projects = require("./Projects");

class Type{
    constructor(directory,type){
        this.dir = directory;
        this.type = type;
    }
    new = (name)=>new Projects(this.dir,this.type,name);
    get = (name)=>(new Projects(this.dir,this.type)).get(name);
    getAll = ()=>this.dir.readDirectory();
    del = (name)=>this.dir.delDirectory(name);
}

class ProjectType{
    constructor(directory){
        this.directory = directory;
        this.type = "default";
    }
    set = (nameType=this.type)=>{
        if(!fse.pathExistsSync(path.resolve(this.directory.root,nameType))){
            return new Type(this.directory.setDirectory(nameType),nameType)
        }else{
            return new Type(this.directory.getDirectory(nameType),nameType)
        }
    }
    get = (nameType=this.type)=>{
        if(!fse.pathExistsSync(path.resolve(this.directory.root,nameType))){
            throw {error:"not exist type proyect"}
        }else{
            return new Type(this.directory.getDirectory(nameType),nameType)
        }
    }
    del = (nameType=this.type)=>{
        if(!fse.pathExistsSync(path.resolve(this.directory.root,nameType))){
            throw {error:"not exist type proyect"}
        }else{
            return this.directory.delDirectory(nameType)
        }
    }
    gets = ()=>this.directory.readDirectory().map(e=>e.name);
}

module.exports = ProjectType;
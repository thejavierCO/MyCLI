const path = require("path");
const fs = require("fs");
const { pathExistsSync,removeSync,moveSync} = require("fs-extra");
const Directory = require("../DirectoryManager");
const makeDir = require("make-dir");

class Projects extends Directory{
    constructor(root){
        super(root);
        try{
            this.root = this.getDirectory("Projects");
        }catch(err){
            if(err.error){
                console.log(error)
                this.root = this.setDirectory("Projects")
                console.log("set project directory")
            }
        }
    }
    setTypeProject(type="default"){
        try {
            let directory = this.getDirectory(type)
            return this.setMethodsTypeProject(directory);
        } catch (err) {
            if(err.error){
                return this.setMethodsTypeProject(this.setDirectory(type))
            }
        }
    }
    getTypeProject(type="default"){
        try {
            let directory = this.getDirectory(type)
            return this.setMethodsTypeProject(directory);
        } catch (err) {
            if(err.error){
                err.error = err.error.replace("directory","type project")
                throw err
            }
        }
    }
    delTypeProject(type="default"){
        try {
            let directory = this.getTypeProject(type)
            if(directory.error)throw directory
            this.delDirectory(directory);
            return true;
        } catch (err) {
            if(err.error){
                return false;
            }else{
                console.log(err)
            }
        }
    }
    setMethodsTypeProject(a){
        if(!a)throw {error:"require path"}
        if(!pathExistsSync(a))throw {error:"not exist path"}
        return {
            addProyect:(name)=>this.addProject(name,a),
            getProject:(name)=>this.getProject(name,a),
            getProjects:()=>fs.readdirSync(a).map(nameProyect=>({
                type:(a.split("\\"))[a.split("\\").length-1],
                name:nameProyect
            })),
            delProject:(name)=>this.delProject(name,a),
            moveProject:(name,move)=>this.moveProject(name,a,move),
            root:a
        }

    }
    async addProject(name="testing",ruta=this.getTypeProject().root){
        let result = {};
        let directory = path.resolve(ruta,name);
        if(!pathExistsSync(directory)){
            result.path = makeDir.sync(directory);
            result.status = "make";
        }else{
            result.path = directory;
            result.status = "exist";
        }
        return result;
    }
    async getProject(name="testing",ruta=this.getTypeProject().root){
        let result = {};
        let directory = path.resolve(ruta,name);
        if(pathExistsSync(directory)){
            result.path = directory;
            result.status = "exist";
        }else{
            result.path = directory;
            result.status = "not exist";
            throw result;
        }
        return result;
    }
    async delProject(name="testing",ruta=this.getTypeProject().root){
        let result = {};
        let directory = path.resolve(ruta,name);
        if(pathExistsSync(directory)){
            removeSync(directory)
            result.path = directory;
            result.status = true;
        }else{
            result.path = directory;
            result.status = "not exist";
            throw result;
        }
        return result;
    }
    async moveProject(name="testing",ruta=this.getTypeProject().root,moveRuta=this.getTypeProject().root){
        let result = {};
        let directory = path.resolve(ruta,name);
        if(pathExistsSync(directory)){
            if(!pathExistsSync(moveRuta)){
                result.path = moveRuta;
                result.status = "not exist root to move";
                throw result;
            }else{
                result.path = moveSync(directory,moveRuta);
                result.status = true;
            }
        }else{
            result.path = directory;
            result.status = "not exist";
            throw result;
        }
        return result;
    }
}

module.exports = Projects;
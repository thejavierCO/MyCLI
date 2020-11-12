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
            return this.delDirectory(directory);
        } catch (err) {
            if(err.error){
                throw err
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
            moveProject:(name)=>this.moveProject(name,a)
        }

    }
    async addProject(name="testing",ruta=this.root){
        let result = {};
        let directory = path.resolve(ruta,name);
        if(!pathExistsSync(directory)){
            result.path = makeDir.sync(directory);
        }else{
            result.path = directory;
        }
        return result;
    }
    async getProject(name="testing",type="default"){
        console.log(name,ruta)
    }
    async delProject(name="testing",type="default"){
        console.log(name,ruta)
    }
    async moveProject(nameProject="testing",moveToType="default"){
        console.log(name,ruta)
    }
}

module.exports = Projects;
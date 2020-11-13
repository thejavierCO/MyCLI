const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const dirExistsSync = fse.pathExistsSync;
const dirMake = fse.mkdirSync;

class DirectoryManager{
    constructor(root){
        if(dirExistsSync(path.resolve(root))){
            this.root = path.resolve(root);
        }else{
            throw "not exist directory";
        }
    }
    setDirectory = (nameSubDirectory)=>{
        if(typeof nameSubDirectory === "string"){
            if(!dirExistsSync(path.resolve(this.root,nameSubDirectory))){
                dirMake(path.resolve(this.root,nameSubDirectory))
            }
            return new DirectoryManager(path.resolve(this.root,nameSubDirectory))
        }else{
            throw {error:"not defined name subdirectory"}
        }
    }
    getDirectory = (nameSubDirectory)=>{                
        if(typeof nameSubDirectory === "string"){
            if(!dirExistsSync(path.resolve(this.root,nameSubDirectory))){
                throw {error:"not exist directory",path:path.resolve(this.root,nameSubDirectory)}
            }
            return new DirectoryManager(path.resolve(this.root,nameSubDirectory))
        }else{
            throw {error:"not defined name subdirectory"}
        }
    }
    delDirectory = (nameSubDirectory)=>{
        if(typeof nameSubDirectory === "string"){
            if(!dirExistsSync(path.resolve(this.root,nameSubDirectory))){
                throw {error:"not exist directory"}
            }
            fse.remove(path.resolve(this.root,nameSubDirectory));
            return true;
        }else{
            throw {error:"not defined name subdirectory"}
        }
    }
    moveDirectory = (nameSubDirectory)=>{
        if(typeof nameSubDirectory === "string"){
            try{
                let result = {
                    path:path.resolve(this.root)
                };
                let nameMoveDirectory = (path.resolve(this.root).split("\\"))[path.resolve(this.root).split("\\").length-1];
                if(!dirExistsSync(path.resolve(nameSubDirectory))){
                    throw {error:"not exist directory",path:path.resolve(this.root,nameSubDirectory)}
                }else{
                    result.pathMove = path.resolve(nameSubDirectory,nameMoveDirectory);
                }
                if(dirExistsSync(path.resolve(nameSubDirectory,nameMoveDirectory))){
                    result.existDirectory = true;
                    throw result;
                }else{
                    result.existDirectory = false
                }
                fse.moveSync(result.path,result.pathMove);
                this.root = result.pathMove;
                return this;
            }catch(err){
                if(err.existDirectory){
                    this.root = err.pathMove;
                    return this;
                }else if(err.code === "EPERM"){
                    throw {error:"not permision in "+err.path}
                }else{
                    console.log(err)
                }
            }
        }else{
            throw {error:"not defined name subdirectory"}
        }
    }
    readDirectory = (nameSubDirectory)=>{
        let result;
        if(typeof nameSubDirectory === "string"){
            if(!dirExistsSync(path.resolve(this.root,nameSubDirectory))){
                throw {error:"not exist directory"}
            }
            result = fs.readdirSync(path.resolve(this.root,nameSubDirectory))
            .map(e=>({name:e,root:path.resolve(this.root,nameSubDirectory,e)}))
        }else{
            result = fs.readdirSync(this.root)
            .map(e=>({name:e,root:path.resolve(this.root,e)}))
        }
        return result
    }
}

module.exports = DirectoryManager;
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const dirExistsSync = fse.pathExistsSync;
const dirMake = require("make-dir")

class DirectoryManager{
    constructor(root){
        if(dirExistsSync(root)){
            this.root = path.resolve(root);
        }else{
            throw "not exist directory";
        }
    }
    setDirectory(a){
        let raiz = path.resolve(this.root,a)
        if(!dirExistsSync(raiz)){
            dirMake.sync(raiz);
        }else{
            console.log("exist directory",raiz)
        }
        return raiz;
    }
    getDirectory(a){
        let raiz = path.resolve(this.root,a)
        if(dirExistsSync(raiz)){
            return raiz;
        }else{
            // console.log(raiz);
            throw {error:"not exist directory"}
        }
    }
    delDirectory(a){
        let raiz = path.resolve(this.root,a)
        if(dirExistsSync(raiz)){
            fse.removeSync(raiz);
            return true;
        }else{
            throw {error:"not exist directory"}
        }
    }
    moveDirectory(a,type="default"){
        let raiz = path.resolve(this.root,a)
        if(dirExistsSync(raiz)){
            // fse.moveSync(raiz,path.resolve(this.root,type));
            return true;
        }else{
            console.log("not exist directory",raiz);
            return false;
        }
    }
    readDirectory(){
        let raiz = path.resolve(this.root,a)
        if(dirExistsSync(raiz)){
            return fs.readdirSync(raiz);
        }else{
            console.log("not exist directory",raiz);
            return false;
        }
    }
}

module.exports = DirectoryManager;
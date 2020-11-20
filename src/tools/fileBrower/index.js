const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const fileControl = require("./file");
const dirControl = require("./dir");

let {statSync} = fs;
let {pathExistsSync} = fse;

class FileBrowser{
    constructor(root){
        if(pathExistsSync(path.resolve(root))){
            root = path.resolve(root);
            let stat = statSync(root);
            let file = /[.]/i.test(root.split("\\")[root.split("\\").length-1])&&stat.size!==0
            if(file){
                this.type = "file";
                this.control = new fileControl(root,FileBrowser);
            }else{
                this.type = "directory";
                this.control = new dirControl(root,FileBrowser);
            }
            this.read = this.control.read;
            this.root = root;
            this.stat = stat;
        }else{
            throw {
                error:"not exist directory",
                root:path.resolve(root)
            }
        }
    }
}

module.exports = FileBrowser;
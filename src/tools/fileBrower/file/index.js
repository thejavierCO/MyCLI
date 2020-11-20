const fs = require("fs");

let {readFileSync} = fs;

class file{
    constructor(root,manager){
        this.name = root.split("\\")[root.split("\\").length-1];
        this.extencion = this.name.split(".")[this.name.split(".").length-1];
        this.read = (
            options={encoding:"base64"}
        )=>readFileSync(root,options)
        .split("\n")
    }
}

module.exports = file;
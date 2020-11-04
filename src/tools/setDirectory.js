const path = require("path");
const makeDir = require("make-dir");
const {dirExists,dirExistsSync} = require("dir-exists-safe");

class Directorys{
    constructor(){
        let directory = "";
        let letterUnit = (__dirname
            .split("\\")
            .filter(e=>e.length<=2&&e[1]==":")
        )[0];
        if(!/(c):/i.test(letterUnit)){
            directory = path.join(letterUnit,"tools");
            if(!dirExistsSync(directory)){
                console.log("not exist directory tools")
                makeDir.sync(directory);
                console.log("create tools")
            }
        }else{
            const {USERPROFILE} = process.env;
            directory = path.join(USERPROFILE,"tools");
        }
        this.root = directory;
    }
    set(name=""){
        let directorySet = path.join(this.root,name);
        !dirExistsSync(directorySet)?makeDir.sync(directorySet):"";
        return directorySet;
    }
    get(name=""){
        let directoryGet = path.join(this.root,name);
        if(!dirExistsSync(directoryGet))throw "not exist "+directoryGet;
        return directoryGet;
    }
}

module.exports = Directorys;
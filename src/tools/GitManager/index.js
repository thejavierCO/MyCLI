const path = require("path")
const axios = require("axios");
const fs = require("fs");
const NodeGit = require("nodegit");

class Repository{
    constructor(ProjectManager){
        this.proyect = ProjectManager;
    }
    get(){
        return NodeGit.Repository.open(this.proyect.dir.root).catch(e=>({error:"not init git",message:e}))
    }
    init(){
        return NodeGit.Repository.init(this.proyect.dir.root,0).catch(e=>{console.log(e);throw e;})
    }
    async gitignore(type="node"){
        if(!fs.existsSync(path.resolve(this.proyect.dir.root,".gitignore"))){
            return axios.get("https://www.toptal.com/developers/gitignore/api/"+type)
            .then(e=>e.data)
            .then(e=>{
                fs.writeFileSync(path.resolve(this.proyect.dir.root,".gitignore"),e)
                return true;
            })
        }else{
            return true;
        }
    }
}

module.exports = Repository;
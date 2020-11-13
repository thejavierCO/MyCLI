const execa = require("execa");

class NodeManager{
    constructor(projectManager){
        let {type,root} = projectManager;
        this.root = root;
        this.control = {
            setDirectory:projectManager.setDirectory,
            getDirectory:projectManager.getDirectory,
            delDirectory:projectManager.delDirectory,
            readDirectory:projectManager.readDirectory,
        }
        this.init = async ()=>await execa("npm init -y",{stdout:"inherit",cwd:root})
    }
}

module.exports = NodeManager;
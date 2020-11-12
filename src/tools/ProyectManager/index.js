const { dirExistsSync } = require("dir-exists-safe");
const Directory = require("../DirectoryManager")

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
            return directory;
        } catch (err) {
            if(err.error){
                return this.setDirectory(type)
            }
        }
    }
    getTypeProject(type="default"){
        try {
            let directory = this.getDirectory(type)
            return directory;
        } catch (err) {
            if(err.error){
                err.error = err.error.replace("directory","type project")
                return err
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
                return err
            }
        }
    }
    setProject(name="testing",type="default"){}
    getProject(name="testing",type="default"){}
    delProject(name="testing",type="default"){}
    moveProject(namePrject="testing",moveToType="default"){}
}

module.exports = Projects;
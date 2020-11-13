const Directory = require("../DirectoryManager");
const Project = require("./Projects")
const ProjectType = require("../ProyectManager/Types");

class Projects{
    constructor(root){
        let dir = new Directory(root);
        dir = dir.setDirectory("Projects");
        this.Project = new Project(dir)
        this.Type = new ProjectType(dir)
    }
}

module.exports = Projects;
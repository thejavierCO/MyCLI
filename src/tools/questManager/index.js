const commands = require("commands")
const Node = require("../NodeManager")
const Git = require("../GitManager");
const inquirer = require("inquirer");

class quest{
    constructor(PT){
        this.dir = PT;
    }
    async getType(name=commands.get("type")){
        let result;
        if(typeof name === "string"){
            result = name;
        }else{
            result = await inquirer.prompt({
                type:"input",
                name:"type",
                message:"type is ..."
            }).then(({type})=>{
                if(type==="")throw {error:"not defined type"}
                return type;
            })
        }
        return this.dir.Type.get(result);
    }
    async getProject(name=commands.get("name"),type){
        if(name===false) name = commands.get("name");
        let result;
        if(typeof name === "string"){
            result = name;
        }else{
            result = await inquirer.prompt({
                type:"input",
                name:"name",
                message:"name Project is ..."
            }).then(({name})=>{
                if(name==="")throw {error:"not defined name"}
                return name;
            })
        }
        return type.get(result);
    }
    async setNode(name=commands.get("node"),project){
        if(name===false) name = commands.get("node");
        let result;
        if(typeof name === "boolean"){
            result = name;
        }else{
            result = await inquirer.prompt({
                type:"confirm",
                name:"node",
                message:"init node?"
            }).then(({node})=>{
                if(node===false)throw {error:"not set node"}
                return node;
            })
        }
        return new Node(project);
    }
    async setinitNode(projectNode){
        projectNode.init();
        return projectNode.project;
    }
    async setGit(name=commands.get("git"),project){
        if(name===false) name = commands.get("git");
        let result;
        if(typeof name === "boolean"){
            result = name;
        }else{
            result = await inquirer.prompt({
                type:"confirm",
                name:"git",
                message:"init git?"
            }).then(({git})=>{
                if(git===false)throw {error:"not set git"}
                return git;
            })
        }
        return new Git(project);
    }
    async setinitGit(projectGit){
        return projectGit.init();
    }
}

module.exports = quest;
const commands = require("commands")
const inquirer = require("inquirer");
const Node = require("../NodeManager")
const Git = require("../GitManager");
const Directory = require("../ProyectManager");
const { get } = require("commands");

function getType(element){
    return typeof element === "object"?element.length>0?"array":"object":typeof element;
}

class quest{
    constructor(PT){
        switch(getType(PT)){
            case "object":
                let {directory} = PT;
                this.WorkDirectory = new Directory(directory);
            break;
            case "string":
                this.WorkDirectory = new Directory(PT);
            break;
            default:
                throw {error:"require object or string with directory"}
        }
        this.Quest = async (...arg)=>{
            let result = [];
            try{
                for (let i = 0; i < arg.length;i++) {
                    if(getType(arg[i])==="object"){
                        let {
                            name,
                            isImportant,
                            ImportantMsg,
                            require
                        } = arg[i];
                        if(!name){
                            throw {error:"require name"}
                        }
                        if(isImportant==true){
                            isImportant = (a)=>a==""?(()=>{
                                console.log(
                                    ImportantMsg
                                    &&
                                    getType(ImportantMsg)==="string"?
                                    "\n"+ImportantMsg
                                    :"\nEs importante\nPor favor agregue algo")
                                return false;
                            })():true
                        }else{
                            isImportant = ()=>true;
                        }
                        if(commands.exists(name)){
                            result.push((e=>this.require(arg[i],require,e))({[name]:commands.get(name)}))
                        }else{
                            result.push(await inquirer.prompt({
                                ...arg[i],
                                validate:isImportant
                            }).then(e=>this.require(arg[i],require,e)))
                        }
                    }else{
                        throw {error:"require object"}
                    }
                }
                return result.length<=1?result[0]:this.setObject(result);
            }catch(err){
                if(err.message){
                    return {exit:err}
                }else{
                    throw err;
                }
            }
        }
    }
    setObject(array){
        if(getType(array)==="array"){
            let result = {};
            array.map(e=>{
                let key = Object.keys(e);
                if(result[key]){
                    if(getType(result[key])!=="array"){
                        const old = result[key];
                        result[key] = [];
                        result[key].push(old);
                        result[key].push(e[key])
                    }else if(getType(result[key])==="array"){
                        result[key].push(e[key]);
                    }else{
                        console.log("warn:",e[key],key)
                    }
                }else{
                    result[key] = e[key];
                }
            })
            return result;
        }else{
            throw {error:"require array"}
        }
    }
    require(a,b,c){
        if(getType(b)==="function"){
            let {name} = a;
            let validate = b(c[name]);
            if(getType(validate)==="boolean"&&validate==false)throw {message:"element is false",data:c};
            if(getType(validate)==="object"){
                let {message,send} = validate;
                if(send==false){
                    throw {message,send}
                }
            }
        }
        return c;
    }
    // async getType(name=commands.get("type")){
    //     let result;
    //     if(typeof name === "string"){
    //         result = name;
    //     }else{
    //         result = await inquirer.prompt({
    //             type:"input",
    //             name:"type",
    //             message:"type is ..."
    //         }).then(({type})=>{
    //             if(type==="")throw {error:"not defined type"}
    //             return type;
    //         })
    //     }
    //     return this.dir.Type.get(result);
    // }
    // async getProject(name=commands.get("name"),type){
    //     if(name===false) name = commands.get("name");
    //     let result;
    //     if(typeof name === "string"){
    //         result = name;
    //     }else{
    //         result = await inquirer.prompt({
    //             type:"input",
    //             name:"name",
    //             message:"name Project is ..."
    //         }).then(({name})=>{
    //             if(name==="")throw {error:"not defined name"}
    //             return name;
    //         })
    //     }
    //     return type.get(result);
    // }
    // async setNode(name=commands.get("node"),project){
    //     if(name===false) name = commands.get("node");
    //     let result;
    //     if(typeof name === "boolean"){
    //         result = name;
    //     }else{
    //         result = await inquirer.prompt({
    //             type:"confirm",
    //             name:"node",
    //             message:"init node?"
    //         }).then(({node})=>{
    //             if(node===false)throw {error:"not set node"}
    //             return node;
    //         })
    //     }
    //     return new Node(project);
    // }
    // async setinitNode(projectNode){
    //     projectNode.init();
    //     return projectNode.project;
    // }
    // async setGit(name=commands.get("git"),project){
    //     if(name===false) name = commands.get("git");
    //     let result;
    //     if(typeof name === "boolean"){
    //         result = name;
    //     }else{
    //         result = await inquirer.prompt({
    //             type:"confirm",
    //             name:"git",
    //             message:"init git?"
    //         }).then(({git})=>{
    //             if(git===false)throw {error:"not set git"}
    //             return git;
    //         })
    //     }
    //     return new Git(project);
    // }
    // async setinitGit(projectGit){
    //     return projectGit.init();
    // }
}

module.exports = quest;

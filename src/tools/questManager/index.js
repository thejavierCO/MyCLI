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
                        if(typeof isImportant === "function"){
                        }else if(isImportant==true){
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
                            if(isImportant(commands.get(name))){
                                result.push((e=>this.require(arg[i],require,e))({[name]:commands.get(name)}))
                            }else{
                                throw {error:commands.get(name)}
                            }
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
                    throw {exit:err}
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
}

module.exports = quest;

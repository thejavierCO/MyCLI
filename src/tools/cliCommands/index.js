const PT = require("../questManager");
const commands = require("commands");
const quest = require("../questManager");

class command{
	constructor(){
		this.get = (name)=>this.format(name)
		this.exist = (name)=>commands.exists(name)
	}
	format(a){
		let data = commands.get(a);
		return {
			name:a,
			type:typeof data,
			response:data
		}
	}
}

class cli{
	constructor(){
		this.count = 0;
		this.events = [];
		this.cmd = new command();
	}
	on(...arg){
		let data = {}
		let name = arg.filter(a=>typeof a === "string");
		let f = arg.filter(a=>typeof a === "function");
		if(name.length>0){
			name = name[0];
			if(f.length>0){
				data = {name,fs:f}
			}
			data.id = this.count++;
			this.events.push(data)
		}
	}
	async run(){
		let getfisrtEvent = this.events.filter(({name})=>this.cmd.exist(name))
		if(getfisrtEvent.length>0){
			let {name,fs} = getfisrtEvent[0];
			let data = this.cmd.get(name);
			return await this.runFs(fs,{
				data,
				Quest:PT
			});
		}else{
			throw {error:"no se ejecuto ninguna sentancia"}
		}
	}
	async runFs(fs,data){
		if(typeof fs === "object"&&fs.length>0){
			let rdata = data;
			let i = 0;
			for (const element of fs) {
				i++;
				// console.log("Prosicion: "+i,rdata)
				try{
					if(this.isPromise(element)){
						await this.getResultPromise(element,rdata,(a)=>{
							rdata.data = a;
						})
						continue;
					}else if(this.isFunction(element)){
						let resData = await element(rdata);
						if(typeof resData === "object"&&resData.WorkDirectory){
							rdata.Quest = resData;
							rdata.data = {
								response:"is Quest instance"
							};
						}else{
							rdata.data = resData;
						}
						continue;
					}else{
						throw {message:"not is promise or function"}
					}
				}catch(err){
					console.log(err)
					rdata = {
						...err,
						in:{
							Prosicion:i,
							data:rdata
						}
					}
					break;
				}
			}
			return rdata;
		}else{
			throw {error:"require array"}
		}
	}
	isPromise(element){
		return /(async)|(promise)/.test(element);
	}
	isFunction(element){
		return typeof element === "function";
	}
	async getResultPromise(fs,arg,f){
		let returnData = true;
		while(returnData === true){
			returnData = await fs(arg)
		}
		return typeof f === "function"?f(returnData):returnData
	}
}

module.exports = cli;

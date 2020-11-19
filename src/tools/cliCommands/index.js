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
			let rdata = {
				data:undefined,
				Quest:quest
			}
			for (const element of fs) {
				if(/(async)/i.test(element.toString())){
					await this.getResultPromise(
						element,
						typeof rdata.data === "undefined"?data:rdata,
						(a)=>{
							console.log(a)
							rdata.data = a
						}
					)
					continue;
				}else{
					rdata.data = element(typeof rdata.data === "undefined"?data:rdata);
					try{
						if(typeof rdata.data === "object"&&typeof rdata.data.WorkDirectory === "object"){
							rdata.Quest = rdata.data;
							rdata.data = {};
						}
					}catch(err){
						if(/(WorkDirectory)/.test(err.message)){
							continue;
						}
						console.log(err);
					}
					continue;
				}
			}
			return rdata;
		}else{
			throw {error:"require array"}
		}
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

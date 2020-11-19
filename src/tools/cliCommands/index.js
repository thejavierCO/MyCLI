const path = require("path");
const PT = require("../questManager");
const commands = require("commands");

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
	run(){
		console.log(this.events.filter(({name})=>this.cmd.exist(name)))
		return this;
	}
}

module.exports = cli;

const path = require("path");
const PT = require("../questManager");
const commands = require("commands");

class cmd{
	constructor(){
		console.log("set instance cmd")
	}
  	get(name){
		return commands.get(name)
	}
  	exist(name){
		return commands.exist(name)
	}
}

class cli{
	constructor(){
		this.command = new cmd();
	}
}

module.exports = cli;

const cli = require("../tools/cliCommands");

let MyCli = new cli((a)=>"play");

MyCli.on("new",
({Quest})=>new Quest("f:/tools"),
async ({Quest:PT})=>PT.Quest({
    type:"confirm",
    name:"realy",
    message:"Segur@ que quiere crear un nuevo proyecto?",
    require:(a)=>a==true
}),
({Quest:PT})=>PT.Quest({
    type:"list",
    name:"type",
    message:"Que tipo de proyecto quiere crear?",
    isImportant:true,
    choices:((a)=>{
        let list = a.Type.getAll();
        list.push("(new)");
        return list;
    })(PT.WorkDirectory),
    require:(a)=>/[A-Z]/i.test(a)
}),
({data,Quest:PT})=>{
    let {WorkDirectory,Quest} = PT;
    try{
        if(/(new)/i.test(data.type)){
            return Quest({
                type:"input",
                name:"newtype",
                message:"Que tipo quiere crear?",
                isImportant:(a)=>{
                    let types = WorkDirectory.Type.getAll();
                    types.push("new");
                    let Its = types.filter(e=>e==a);
                    if(a.length===0){
                        console.log([
                            "\nNo se puede crear un tipo de proyecto vacio"
                        ].join("\n"))
                    }else{
                        if(Its.length===0){
                            return true;
                        }else{
                            console.log([
                                "\nel tipo: "+a,
                                "ya existe en la carpeta",
                                "agregue otro"
                            ].join("\n"))
                        }
                    }
                    return false;
                },
            }).then(e=>WorkDirectory.Type.set(e.newtype))
        }else{
            return WorkDirectory.Type.get(data.type);
        }
    }catch(err){
        if(err.error){
            throw err;
		}else{
			throw err;
		}
    }
},
({data,Quest:PT})=>PT.Quest({
    type:"input",
    name:"project",
    message:"Que nombre quiere poner le?",
    isImportant:(a)=>{
        let types = data.getAll().map(e=>e.name);
        types.push("new");
        let Its = types.filter(e=>e==a);
        if(a.length===0){
            console.log([
                "\nNo se puede crear un proyecto vacio"
            ].join("\n"))
        }else{
            if(Its.length===0){
                return true;
            }else{
                console.log([
                    "\nel proyect: "+a,
                    "ya existe en la carpeta",
                    "agregue otro"
                ].join("\n"))
            }
        }
        return false;
    },
    require:(a)=>/[A-Z]/i.test(a)
}).then(e=>data.new(e.project)))

MyCli.run().then(e=>{
    console.log("\n"+"-".repeat(10)+"(end)"+"-".repeat(10)+"\n",e,"\n"+"-".repeat(10)+"(end)"+"-".repeat(10)+"\n")
}).catch(e=>{
    console.log("\n"+"-".repeat(10)+"(error)"+"-".repeat(10)+"\n",e,"\n"+"-".repeat(10)+"(error)"+"-".repeat(10)+"\n")
})
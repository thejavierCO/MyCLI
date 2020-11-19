const cli = require("./tools/cliCommands");

let MyCli = new cli((a)=>"play");

MyCli.on("new",
(a)=>{
    return 0;
},
async (a)=>{
    return a+1;//0+1;
},
async (a)=>{
    console.log(a,"promise");
    // console.log(a,{id:2});
    return a;//1;
},
)

MyCli.run()
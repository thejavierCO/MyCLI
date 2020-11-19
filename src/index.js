const cli = require("./tools/cliCommands");

let MyCli = new cli((a)=>"play");

MyCli.on("new",
async (a)=>{
    console.log(a)
    return 0;
},
function(a){
    console.log(a)
    return a+1;//0+1;
},
async function(a){
    a++;
    return a;//1;
},
)

MyCli.run().then(e=>{
    console.log(e)
})
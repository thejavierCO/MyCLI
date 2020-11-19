const cli = require("./tools/cliCommands");

let MyCli = new cli((a)=>"play");

MyCli.on("new",
({data,Quest})=>new Quest("f:/tools"),
async ({data,Quest:PT})=>PT.Quest({
    type:"confirm",
    name:"realy",
    message:"Segur@ que quiere crear un proyecto"
}),
({data,Quest})=>{
    console.log("\n"+"-".repeat(10)+"(data)"+"-".repeat(10)+"\n",data,Quest,"\n"+"-".repeat(10)+"(data)"+"-".repeat(10)+"\n")
    return {};
},
({data,Quest})=>{
    console.log("\n"+"-".repeat(10)+"(data)"+"-".repeat(10)+"\n",data,Quest,"\n"+"-".repeat(10)+"(data)"+"-".repeat(10)+"\n")
    return {};
},
({data,Quest})=>{
    console.log("\n"+"-".repeat(10)+"(data)"+"-".repeat(10)+"\n",data,Quest,"\n"+"-".repeat(10)+"(data)"+"-".repeat(10)+"\n")
},
({data,Quest})=>{
    console.log("\n"+"-".repeat(10)+"(data)"+"-".repeat(10)+"\n",data,Quest,"\n"+"-".repeat(10)+"(data)"+"-".repeat(10)+"\n")
},
({data,Quest})=>{
    console.log("\n"+"-".repeat(10)+"(data)"+"-".repeat(10)+"\n",data,Quest,"\n"+"-".repeat(10)+"(data)"+"-".repeat(10)+"\n")
}
)

// .then(a=>{
//     try{
//         if(a.exit)return "";
//         return PT.WorkDirectory.Type.get(a.type);
//     }catch(err){
//         if(err.error){
//             return PT.Quest(
//                 {
//                     type:"confirm",
//                     name:"make",
//                     message:"no existe type\nquiere crear lo?",
//                     require:(a)=>a==true
//                 }
//             ).then(
//                 ({make})=>
//                     make==true?
//                     PT.WorkDirectory.Type.set(a.type)
//                     :((a)=>{throw {error:"se cancelo la creacion del directrio"}})(err)
//             )
//         }else{
//             throw err
//         }
//     }
// })
// .then(a=>PT.Quest(
//     {
//         type:"input",
//         name:"name",
//         message:"Escriba el nombre del proyecto",
//         isImportant:true,
//         require:(a)=>/([A-Z]{0,})?([0-9]{0,})?/gi.test(a)
//     }
//     )	
//     .then(({name})=>{
//         try{
//             return a.get(name);
//         }catch(err){
//             if(err.error){
//                 return PT.Quest({
//                     type:"confirm",
//                     name:"make",
//                     message:"not exist project "+name+"\n quiere crear lo?"
//                 }).then(({make})=>
//                     make==true?
//                     a.new(name):
//                     ((a)=>{throw {error:"se cancelo la creacion del proyecto"}})(err)
//                 )
//             }
//         }
//     })
// )
// .then(a=>a.Node.init==false?(
//     (b)=>PT.Quest({
//         type:"confirm",
//         name:"node",
//         message:"not exist package.json\nQuiere crear lo?"
//     }).then(({node})=>node==true?(async (a)=>{await b.Start();return a})(a):a)
// )(a.Node):a)
// .then(a=>a.Git.init==false?(
//     (b)=>PT.Quest({
//         type:"confirm",
//         name:"git",
//         message:"not set repository\nQuiere iniciar lo?"
//     }).then(({git})=>git==true?(async (a)=>{await b.Start(); return a})(a):a)
// )(a.Git):a)
// .then(e=>{
//     try{
//         e.dir.getDirectory("src");
//         return e;
//     }catch(err){
//         if(err.error){
//             return PT.Quest({
//                 type:"confirm",
//                 name:"src",
//                 message:"not exist directory src\nQuiere crearlo?"
//             }).then(({src})=>src==true?e.dir.setDirectory("src"):e).then(_=>{return e})
//         }else{throw err}
//     }
// }
// )
// .then(a=>{
//     console.log([
//         "-- (Result) --",
//         "Name: "+a.name,
//         "Type: "+a.type,
//         a.Git.init?"Git: "+a.Git.init:"",
//         a.Node.init?"Node: "+a.Node.init:"",
//         "--------------",
//         "Run CodeEditor"
//     ].join("\n"));
//     a.Run("code ./")
//     return a;
// })
// .catch(e=>{
//    if(e.error){
//        console.log(e)
//    }else{
//        console.log(e,"other error")
//    }
// })

MyCli.run().then(e=>{
    console.log("\n"+"-".repeat(10)+"(end)"+"-".repeat(10)+"\n",e,"\n"+"-".repeat(10)+"(end)"+"-".repeat(10)+"\n")
}).catch(e=>{
    console.log("\n"+"-".repeat(10)+"(end)"+"-".repeat(10)+"\n",e,"\n"+"-".repeat(10)+"(end)"+"-".repeat(10)+"\n")
})
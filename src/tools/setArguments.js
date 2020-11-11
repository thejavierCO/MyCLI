// const commands = require("commands");

// class argument{
//     async get(argument){
//         if(typeof argument === "object"&&argument.length){
//             return argument.map(e=>{
//                 let arg = e.toLowerCase();
//                 return commands.exists(arg)?({
//                     name:arg,
//                     data:commands.get(arg),
//                     exists:true
//                 }):({
//                     name:arg,
//                     data:false,
//                     exists:false
//                 });
//             })
//         }if(typeof argument === "string"){
//             return this.get([argument]).then(e=>e[0])
//         }else{
//             throw "not is object or array"
//         }
//     }
// }

// module.exports = argument;
const questManager = require("./tools/questManager");

let PT = new questManager("f:/tools")

PT.Quest(
    {
        type:"confirm",
        name:"new",
        message:"Seguro que quiere crear un proyecto",
        require:(a)=>a==true
    },
    {
        type:"input",
        name:"type",
        message:"espesifique el typo de proyecto",
        isImportant:true,
        require:(a)=>/[A-Z]/i.test(a)
    }
).then(a=>{	
    if(a.exit)return "";
    return PT.WorkDirectory.Type.get(a.type);
}).then(a=>{
    // if(a.exit)return "";
    // return PT.WorkDirectory.Type(a.type);
    console.log(a);
})
.catch(e=>{console.log(e,21)})

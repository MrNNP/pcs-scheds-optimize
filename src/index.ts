import types from "./types/types";
import readline from 'readline';
let int = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

let nodemap = new types.weightedNodeMap({
    key:0,
    nodeType:"hallway",
    roomData:undefined,
    nodeLocation:[0,0]
})
function askForData(){
    int.question("Enter d for Data or E to end:",(ans)=>{
        if(ans==="d"){
            int.question("What type of node is this?",(ans)=>{
                //try to make interactive map instead of this
            })
        }
    })
}


console.log(nodemap.findPath(2,6));
nodemap.saveDataToFile();
console.log('done running');

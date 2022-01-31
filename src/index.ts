import types from "./types/types";
import readline from 'readline';
let int = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

let nodemap = types.weightedNodeMap.importPartialData(`{"keyedNodes":[{"x":287,"y":243,"key":"101"},{"x":314,"y":245,"key":"102"},{"x":337,"y":245,"key":"103"},{"x":289,"y":267,"key":"_d0"},{"x":315,"y":269,"key":"_d1"},{"x":337,"y":268,"key":"_d2"},{"x":366,"y":269,"key":"_d3"},{"x":391,"y":271,"key":"_d4"},{"x":408,"y":271,"key":"_d5"},{"x":413,"y":293,"key":"_d6"},{"x":421,"y":319,"key":"_d7"}],"keyedEdges":[["_d0","101",24.083189157584588],["_d1","_d0",26.076809620810597],["_d2","_d1",22.02271554554524],["_d3","_d2",29.017236257093817],["_d4","_d3",25.079872407968907],["_d5","_d4",17],["_d6","_d5",22.561028345356952],["_d7","_d6",27.202941017470888],["102","_d1",24.020824298928627],["103","_d2",23],["_d3","103",37.64306044943742]]}`);

console.log(nodemap.findPath(nodemap.getNodeFromData("_d0").key,nodemap.getNodeFromData("_d7").key));
nodemap.saveDataToFile();
console.log('done running');

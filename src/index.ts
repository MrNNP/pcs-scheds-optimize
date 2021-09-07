import types from "./types/types";
let nodemap = new types.weightedNodeMap({
    key:0,
    nodeType:"hallway",
    roomData:undefined,
    nodeLocation:[100,220]
})

nodemap.addNode({
    key:1,
    nodeType:"hallway",
    roomData:undefined,
    nodeLocation:[100,220]
},10,0)

nodemap.addNode({
    key:2,
    nodeType:"hallway",
    roomData:undefined,
    nodeLocation:[100,220]
},10,0,[
    {weight:10,baseNode:1}
])



console.log(nodemap.export(true));
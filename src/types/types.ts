namespace types{
    export class weightedNodeMap{
        nodes: Array<node> = [];
        edges: Array<edge> = [];
        constructor(baseNode:node){
            this.nodes[baseNode.key] = baseNode;
        }
        addNode(newNode:node,weight:number,baseNode:number|node,moreNodes?:Array<addNodeOptions>) {
            if(typeof this.nodes[newNode.key]  == "object"){
                throw new Error("Attemped to add new node with same key as existing node");
            }
            this.nodes[newNode.key] = newNode;

            if(moreNodes){
                moreNodes.push({
                    weight,
                    baseNode
                })
                for (const options of moreNodes) {
                    let baseKey;
                    if(typeof options.baseNode == "object"){
                        try{
                            if(typeof this.nodes[options.baseNode.key] != "object"){
                                throw new Error();
                            }
                        baseKey = options.baseNode.key
                        }catch(e){
                            throw new Error(`baseNode doesnt have a key`)
                        }
                    }else if(typeof baseNode == "number"){
                        baseKey = options.baseNode;
                    }else{
                        throw new Error("baseNode is not an object or a number")
                    }
                    this.newEdge([newNode.key,baseKey],options.weight,{isAuto:false});
               
                }
            }else{
                let baseKey
                if(typeof baseNode == "object"){
                    try{
                        if(typeof this.nodes[baseNode.key] != "object"){
                            throw new Error();
                        }
                    baseKey = baseNode.key
                    }catch(e){
                        throw new Error('baseNode doesnt have a key')
                    }
                }else if(typeof baseNode == "number"){
                    baseKey = baseNode;
                }else{
                    throw new Error("baseNode is not an object or a number")
                }
                this.newEdge([newNode.key,baseKey],weight,{isAuto:false});

            }            

            
        }
        
        newEdge(nodes:[number,number],weight:number,options?:{extraData?:string,isAuto?:boolean}) {
                let newedge:edge = {
                    key:this.edges[this.edges.length-1].key+1,
                    connectedNodes:nodes,
                    weight:weight,
                    extraData:options?options.extraData:undefined
    
    
                } 
            if(typeof this.edges[newedge.key]!= 'undefined'){
                throw Error("there is data with the same key as newedge")
            }
                if(options){
                    if(!options.isAuto){
                        let that = this;
                        
                            let typenode = that.nodes[nodes[0]]
                            typenode.edges?.push(newedge);
                            typenode.neighbors?.push(that.nodes[nodes[1]])
                        
                            typenode = that.nodes[nodes[1]]
                            typenode.edges?.push(newedge);
                            typenode.neighbors?.push(that.nodes[nodes[0]])
                    }
                }
            this.edges[newedge.key] = newedge;

        }

        removeNode(nodeKey:number){
            let node = this.nodes[nodeKey];
            node.neighbors?.forEach((noode:node)=>{
               noode.neighbors = noode.neighbors?.filter(nooode=>nooode!=node)
            })
            node.edges?.forEach((edgee:edge)=>{
                this.removeEdge(edgee);
            })
        }

        removeEdge(edge:edge){
            let nodes = [this.nodes[edge.connectedNodes[0]],this.nodes[edge.connectedNodes[1]]]
            nodes.forEach(node=>{
                node.edges = node.edges?.filter(edgee=>edgee!=edge)
            })

            this.edges = this.edges.filter(edgee=>edgee!=edge);
        }

    }

    export interface addNodeOptions{
        weight:number,
        baseNode:number|node
        

    }
    export interface node{
        key:number;
        nodeType:"room"|"hallway"|"locker",
        roomData:string|Array<number>|undefined,
        nodeLocation:[number,number],
        neighbors?:Array<node>
        edges?:Array<edge>
    }

    export interface edge{
        key:number;
        connectedNodes:[number,number]
        extraData?:String
        weight:number
    }


}

export default types;

//nodemap to add:
/*
TODO:make storage/way to maintain map in memory, preferable with least memory usage, also json compatible
TODO:make way to add data to map
TODO: add distance algorithum
TODO: remove once done

Brainstorming:

seperate data into edges and points

points will have a key, and data

key will be and assigned number to the room, and a incremented number for hallway nodes

data will include, 
whether its a room or hallway or locker, if room, then room number *string*. if locker, locker range array. if hallway, nothing
the points coordinates on a map of school (not used at the moment but can be used in a visulization) 

edges will have a key, and 2 point keys, and a weight value


units will be in meters


*/
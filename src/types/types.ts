//@ts-expect-error
import Graph from 'dijkstra-short-path';
import fs from 'fs';

namespace types{
    export class weightedNodeMap implements weightedNodeMapData{
        nodes: Array<node> = [];
        edges: Array<edge> = [];
        private route = new Graph();

        constructor(baseNode:node){
            baseNode.edges = []
            baseNode.neighbors = []
          
            this.nodes[baseNode.key] = baseNode;
        }
        addNode(newNode:node,weight:number,baseNode:number|node,moreNodes?:Array<addNodeOptions>) {
            if(typeof this.nodes[newNode.key]  == "object"){
                throw new Error("Attemped to add new node with same key as existing node");
            }
         
                newNode.edges = []
                newNode.neighbors = []
         
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
                    key:this.newEdgeKey(),
                    connectedNodes:nodes,
                    weight:weight,
                    extraData:options?options.extraData:undefined
    
    
                } 
            if(typeof this.edges[newedge.key]!= 'undefined'){
                throw Error("there is data with the same key as newedge")
            }
                if(options){
                    if(!options.isAuto){
                        
                        
                        let typenode = this.nodes[nodes[0]]
                        typenode.edges?.push(newedge);
                        typenode.neighbors?.push(this.nodes[nodes[1]])
                        



                           let typenode2 = this.nodes[nodes[1]]
                            //@ts-expect-error
                            typenode2.edges.push(newedge);
                            //@ts-expect-error
                            typenode2.neighbors.push(this.nodes[nodes[0]])
                        

                    }
                }
            this.edges[newedge.key] = newedge;

        }

        private newEdgeKey():number{
            if(this.edges.length>0){
                return this.edges[this.edges.length-1].key+1
            }else{
                return 0;
            }
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

        export(returnString?:boolean):weightedNodeMapData|string{
            
            if(returnString){
                let returnData = {
                    nodes:this.nodes,
                    edges:this.edges
                }
                
                
                returnData.nodes.map(node=>{
                    let returnvals = (node as nodeExport);
                
                    if(node.edges!=undefined&&node.neighbors!=undefined){
                       
                        (returnvals.neighbors as unknown as Array<number>) = node.neighbors.map(node=>node.key);
                        (returnvals.edges as unknown as Array<number>) = node.edges.map(edge=>edge.key);
                        

                    }
                    
                    return returnvals;
                })


                return JSON.stringify(returnData)

            }else{

                return{
                    nodes:this.nodes,
                    edges:this.edges
                }
            }

        }

        import(data:weightedNodeMapData|string){
            if(typeof data == "string"){
                let dataObject = JSON.parse(data);
                if(dataObject.nodes && dataObject.edges){
                    this.nodes = dataObject.nodes
                    this.edges = dataObject.edges

                }else{
                    throw new Error("imported data does not have the required nodes and/or edges property")
                }
            }else{
                this.nodes = data.nodes
                this.edges = data.edges

            }
            
            
        }

        private addDataToPathFind(data?:weightedNodeMapData){
            let nodemapData:weightedNodeMapDataRoute;
            if(data){
                nodemapData = data;
            } else{
                nodemapData = {
                    nodes:this.nodes,
                    edges:this.edges
                }
             
            }
            
            nodemapData.route = this.route;
            nodemapData.nodes.forEach(node=>{
                
             let connectedNodes = node.edges?.map(edge=>{
                    return [
                       `a${edge.connectedNodes.filter(nodekey=>nodekey!=node.key)[0]}a`,
                        edge.weight
                    ]
                })
            if(connectedNodes){
                //@ts-expect-error
                nodemapData.route.addNode(`a${node.key}a`,new Map([...connectedNodes]))
            }


            })

            


        }

        findPath(node1:number,node2:number):pathFindData{
            this.addDataToPathFind();
            console.log('data added')
            let results = this.route.path(`a${node1}a`,`a${node2}a`);
            console.log('path found')
            results.path = results.path.map((point:string)=>point.replace('a','')).map((point:string)=>point.replace('a',''))

            return results
        }

        saveDataToFile(filename?:string){
            fs.writeFileSync(filename?filename:"weightedNodeMap.json",(this.export(true) as unknown as string))
        }
    }

    export interface weightedNodeMapDataRoute extends weightedNodeMapData{
        nodes:Array<node>,
        edges:Array<edge>,
        route?:any
    }
    export interface weightedNodeMapData{
        nodes:Array<node>
        edges:Array<edge>
    }
    
    export interface addNodeOptions{
        weight:number,
        baseNode:number|node
        

    }

    export interface pathFindData{
        cost:number,
        path:Array<any>
    }
    export interface nodeExport extends node{
        neighbors:Array<node>
        edges:Array<edge>
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


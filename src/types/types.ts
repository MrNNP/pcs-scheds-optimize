namespace types{
    export class weightedNodeMap{
        


    }

    export interface node{
        key:number;
        nodeType:"room"|"hallway"|"locker",
        roomData:string|Array<number>|undefined,
        nodeLocation:Array<number>
    }

    export interface edge{
        key:number;
        connectedNodes:Array<number>
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
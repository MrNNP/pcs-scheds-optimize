"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types;
(function (types) {
    var weightedNodeMap = /** @class */ (function () {
        function weightedNodeMap(baseNode) {
            this.nodes = [];
            this.edges = [];
            this.nodes[baseNode.key] = baseNode;
        }
        weightedNodeMap.prototype.addNode = function (newNode, weight, baseNode, moreNodes) {
            if (typeof this.nodes[newNode.key] == "object") {
                throw new Error("Attemped to add new node with same key as existing node");
            }
            newNode.edges = [];
            newNode.neighbors = [];
            this.nodes[newNode.key] = newNode;
            if (moreNodes) {
                moreNodes.push({
                    weight: weight,
                    baseNode: baseNode
                });
                for (var _i = 0, moreNodes_1 = moreNodes; _i < moreNodes_1.length; _i++) {
                    var options = moreNodes_1[_i];
                    var baseKey = void 0;
                    if (typeof options.baseNode == "object") {
                        try {
                            if (typeof this.nodes[options.baseNode.key] != "object") {
                                throw new Error();
                            }
                            baseKey = options.baseNode.key;
                        }
                        catch (e) {
                            throw new Error("baseNode doesnt have a key");
                        }
                    }
                    else if (typeof baseNode == "number") {
                        baseKey = options.baseNode;
                    }
                    else {
                        throw new Error("baseNode is not an object or a number");
                    }
                    this.newEdge([newNode.key, baseKey], options.weight, { isAuto: false });
                }
            }
            else {
                var baseKey = void 0;
                if (typeof baseNode == "object") {
                    try {
                        if (typeof this.nodes[baseNode.key] != "object") {
                            throw new Error();
                        }
                        baseKey = baseNode.key;
                    }
                    catch (e) {
                        throw new Error('baseNode doesnt have a key');
                    }
                }
                else if (typeof baseNode == "number") {
                    baseKey = baseNode;
                }
                else {
                    throw new Error("baseNode is not an object or a number");
                }
                this.newEdge([newNode.key, baseKey], weight, { isAuto: false });
            }
        };
        weightedNodeMap.prototype.newEdge = function (nodes, weight, options) {
            var _a, _b, _c, _d;
            var newedge = {
                key: this.newEdgeKey(),
                connectedNodes: nodes,
                weight: weight,
                extraData: options ? options.extraData : undefined
            };
            if (typeof this.edges[newedge.key] != 'undefined') {
                throw Error("there is data with the same key as newedge");
            }
            if (options) {
                if (!options.isAuto) {
                    var typenode = this.nodes[nodes[0]];
                    (_a = typenode.edges) === null || _a === void 0 ? void 0 : _a.push(newedge);
                    (_b = typenode.neighbors) === null || _b === void 0 ? void 0 : _b.push(this.nodes[nodes[1]]);
                    typenode = this.nodes[nodes[1]];
                    (_c = typenode.edges) === null || _c === void 0 ? void 0 : _c.push(newedge);
                    (_d = typenode.neighbors) === null || _d === void 0 ? void 0 : _d.push(this.nodes[nodes[0]]);
                    console.log(typenode);
                }
            }
            this.edges[newedge.key] = newedge;
        };
        weightedNodeMap.prototype.newEdgeKey = function () {
            if (this.edges.length > 0) {
                return this.edges[this.edges.length - 1].key + 1;
            }
            else {
                return 0;
            }
        };
        weightedNodeMap.prototype.removeNode = function (nodeKey) {
            var _this = this;
            var _a, _b;
            var node = this.nodes[nodeKey];
            (_a = node.neighbors) === null || _a === void 0 ? void 0 : _a.forEach(function (noode) {
                var _a;
                noode.neighbors = (_a = noode.neighbors) === null || _a === void 0 ? void 0 : _a.filter(function (nooode) { return nooode != node; });
            });
            (_b = node.edges) === null || _b === void 0 ? void 0 : _b.forEach(function (edgee) {
                _this.removeEdge(edgee);
            });
        };
        weightedNodeMap.prototype.removeEdge = function (edge) {
            var nodes = [this.nodes[edge.connectedNodes[0]], this.nodes[edge.connectedNodes[1]]];
            nodes.forEach(function (node) {
                var _a;
                node.edges = (_a = node.edges) === null || _a === void 0 ? void 0 : _a.filter(function (edgee) { return edgee != edge; });
            });
            this.edges = this.edges.filter(function (edgee) { return edgee != edge; });
        };
        weightedNodeMap.prototype.export = function (returnString) {
            if (returnString) {
                var returnData = {
                    nodes: this.nodes,
                    edges: this.edges
                };
                returnData.nodes.map(function (node) {
                    var returnvals = node;
                    if (node.edges != undefined && node.neighbors != undefined) {
                        returnvals.neighbors = node.neighbors.map(function (node) { return node.key; });
                        returnvals.edges = node.edges.map(function (edge) { return edge.key; });
                    }
                    return returnvals;
                });
                return JSON.stringify(returnData);
            }
            else {
                return {
                    nodes: this.nodes,
                    edges: this.edges
                };
            }
        };
        weightedNodeMap.prototype.import = function (data) {
            if (typeof data == "string") {
                var dataObject = JSON.parse(data);
                if (dataObject.nodes && dataObject.edges) {
                    this.nodes = dataObject.nodes;
                    this.edges = dataObject.edges;
                }
                else {
                    throw new Error("imported data does not have the required nodes and/or edges property");
                }
            }
            else {
                this.nodes = data.nodes;
                this.edges = data.edges;
            }
        };
        return weightedNodeMap;
    }());
    types.weightedNodeMap = weightedNodeMap;
})(types || (types = {}));
exports.default = types;
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __importDefault(require("./types/types"));
let nodemap = new types_1.default.weightedNodeMap({
    key: 0,
    nodeType: "hallway",
    roomData: undefined,
    nodeLocation: [100, 220]
});
nodemap.addNode({
    key: 1,
    nodeType: "hallway",
    roomData: undefined,
    nodeLocation: [100, 220]
}, 10, 0);
nodemap.addNode({
    key: 2,
    nodeType: "hallway",
    roomData: undefined,
    nodeLocation: [100, 220]
}, 10, 0);
nodemap.addNode({
    key: 3,
    nodeType: "hallway",
    roomData: undefined,
    nodeLocation: [100, 220]
}, 10, 1, [
    { weight: 10, baseNode: 1 }
]);
nodemap.addNode({
    key: 4,
    nodeType: "hallway",
    roomData: undefined,
    nodeLocation: [100, 220]
}, 10, 2, [
    { weight: 10, baseNode: 1 }
]);
nodemap.addNode({
    key: 5,
    nodeType: "hallway",
    roomData: undefined,
    nodeLocation: [100, 220]
}, 10, 1, [
    { weight: 10, baseNode: 1 }
]);
nodemap.addNode({
    key: 6,
    nodeType: "hallway",
    roomData: undefined,
    nodeLocation: [100, 220]
}, 10, 1, [
    { weight: 10, baseNode: 3 }
]);
console.log(nodemap.findPath(2, 6));
nodemap.saveDataToFile();
console.log('done running');

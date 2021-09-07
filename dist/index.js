"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __importDefault(require("./types/types"));
var nodemap = new types_1.default.weightedNodeMap({
    key: 1,
    nodeType: "hallway",
    roomData: undefined,
    nodeLocation: [100, 220]
});
console.log(nodemap);

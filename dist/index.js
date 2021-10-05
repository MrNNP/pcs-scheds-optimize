"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __importDefault(require("./types/types"));
const readline_1 = __importDefault(require("readline"));
let int = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
let nodemap = new types_1.default.weightedNodeMap({
    key: 0,
    nodeType: "hallway",
    roomData: undefined,
    nodeLocation: [0, 0]
});
function askForData() {
    int.question("Enter d for Data or E to end:", (ans) => {
        if (ans === "d") {
            int.question("What type of node is this?", (ans) => {
                //try to make interactive map instead of this
            });
        }
    });
}
console.log(nodemap.findPath(2, 6));
nodemap.saveDataToFile();
console.log('done running');

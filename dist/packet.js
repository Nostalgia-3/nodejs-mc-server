"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResponsePacket = void 0;
const commons_1 = require("./commons");
function StatusResponsePacket(json) {
    let n = [];
    n = n.concat(Array.from((0, commons_1.makeString)(JSON.stringify(json))));
    return n;
}
exports.StatusResponsePacket = StatusResponsePacket;

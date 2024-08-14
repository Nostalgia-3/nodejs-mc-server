"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkDataPacket = exports.PlayerPositionAndLook = exports.JoinGamePacket = exports.LoginSuccessPacket = exports.StatusResponsePacket = void 0;
const commons_1 = require("./commons");
const varint = __importStar(require("varint"));
const chunk_1 = require("./chunk");
function StatusResponsePacket(json) {
    let n = [];
    let d = {
        version: { name: "1.12.2", "protocol": 340 },
        players: {
            max: 50,
            online: 0,
            samples: []
        },
        description: {
            text: 'hello'
        },
        enforcesSecureChat: false,
        previewsChat: false
    };
    n = n.concat(Array.from((0, commons_1.makeString)(JSON.stringify(d))));
    return n;
}
exports.StatusResponsePacket = StatusResponsePacket;
function LoginSuccessPacket(username, uuid) {
    let n = [];
    n = n.concat(Array.from((0, commons_1.makeString)(uuid)));
    n = n.concat(Array.from((0, commons_1.makeString)(username)));
    return n;
}
exports.LoginSuccessPacket = LoginSuccessPacket;
function JoinGamePacket(eid, gamemode, difficulty) {
    let n = [];
    n = n.concat((0, commons_1.makeInt)(eid));
    n = n.concat(gamemode);
    n = n.concat((0, commons_1.makeInt)(0));
    n = n.concat(difficulty);
    n = n.concat(0);
    n = n.concat(Array.from((0, commons_1.makeString)('flat')));
    n = n.concat(0);
    return n;
}
exports.JoinGamePacket = JoinGamePacket;
function PlayerPositionAndLook(x, y, z, yaw, pitch) {
    let n = [];
    n = n.concat((0, commons_1.makeDouble)(x));
    n = n.concat((0, commons_1.makeDouble)(y));
    n = n.concat((0, commons_1.makeDouble)(z));
    n = n.concat((0, commons_1.makeFloat)(yaw));
    n = n.concat((0, commons_1.makeFloat)(pitch));
    n = n.concat(0);
    n = n.concat(Array.from(varint.encode(87)));
    return n;
}
exports.PlayerPositionAndLook = PlayerPositionAndLook;
function ChunkDataPacket(chunkX, chunkY, chunk) {
    let n = [];
    n = n.concat((0, commons_1.makeInt)(chunkX));
    n = n.concat((0, commons_1.makeInt)(chunkY));
    n = n.concat((0, commons_1.makeBoolean)(true));
    n = n.concat(Array.from(varint.encode(chunk.getFilledSections())));
    console.log(chunk.getFilledSections());
    let j = [];
    for (let i = 0; i < 16; i++) {
        if (chunk.getSection(i).isEmpty())
            continue;
        j = j.concat((0, chunk_1.makeChunkSection)(chunk.getSection(i)));
    }
    for (let i = 0; i < 256; i++) {
        j = j.concat(127);
    }
    n = n.concat(Array.from(varint.encode(j.length)));
    n = n.concat(j);
    n = n.concat(Array.from(varint.encode(0)));
    return n;
}
exports.ChunkDataPacket = ChunkDataPacket;

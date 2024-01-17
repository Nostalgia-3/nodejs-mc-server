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
// NodeJS Modules
const varint = __importStar(require("varint"));
const crypto = __importStar(require("crypto"));
const net = __importStar(require("net"));
// Local Files
const commons_1 = require("./commons");
const packet_1 = require("./packet");
const server = new net.Server();
server.on('connection', (s) => {
    const uuid = crypto.randomUUID();
    let state = commons_1.State.HANDSHAKING;
    s.on('end', () => {
        // console.log(`Client ${uuid} disconnected.`);
        console.log(`-------------------------------------------------------------`);
    });
    s.on('data', (d) => {
        let offset = 0;
        const length = varint.decode(d, offset);
        offset += varint.decode.bytes;
        const id = varint.decode(d, offset);
        offset += varint.decode.bytes;
        (0, commons_1.logPacket)(id, state, d.length - offset, false);
        switch (state) {
            case commons_1.State.HANDSHAKING:
                switch (id) {
                    case commons_1.HandshakePackets.HandshakingPacket: {
                        const protocolVersion = varint.decode(d, offset += varint.decode.bytes);
                        const serverAddressLen = varint.decode(d, offset += varint.decode.bytes);
                        const serverAddress = d.subarray(offset, offset + serverAddressLen);
                        offset += serverAddressLen;
                        const serverPort = d.readUInt16BE(offset += 2);
                        const nextState = varint.decode(d, offset += varint.decode.bytes);
                        if (nextState == 1) {
                            state = commons_1.State.STATUS;
                        }
                        else if (nextState == 2) {
                            state = commons_1.State.LOGIN;
                        }
                        break;
                    }
                }
                break;
            case commons_1.State.STATUS: {
                switch (id) {
                    case commons_1.StatusPackets.RequestPacket: {
                        (0, commons_1.makePacket)(0x00, [(0, packet_1.StatusResponsePacket)({
                                description: { text: 'hi' },
                                enforcesSecureChat: false,
                                favicon: '',
                                players: {
                                    max: 10,
                                    online: 0,
                                    sample: []
                                },
                                previewsChat: false,
                                verion: {
                                    name: "1.16.5",
                                    protocol: 754
                                }
                            })], state);
                        break;
                    }
                }
                break;
            }
            case commons_1.State.LOGIN:
                break;
            case commons_1.State.PLAY:
                break;
        }
    });
});
server.listen(25565);

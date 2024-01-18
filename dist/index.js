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
    let keepAliveInterval;
    s.on('end', () => {
        // console.log(`Client ${uuid} disconnected.`);
        clearInterval(keepAliveInterval);
        console.log(`-------------------------------------------------------------`);
    });
    s.on('data', (d) => {
        if (d[0] == 0xFE)
            return;
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
                        s.write((0, commons_1.makePacket)(0x00, [(0, packet_1.StatusResponsePacket)({
                                description: { text: 'hi' },
                                enforcesSecureChat: false,
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
                            })], state));
                        break;
                    }
                    case commons_1.StatusPackets.PingPacket: {
                        s.write((0, commons_1.makePacket)(0x01, [d.subarray(offset, offset + 8)], state));
                        break;
                    }
                }
                break;
            }
            case commons_1.State.LOGIN:
                switch (id) {
                    case commons_1.LoginPackets.LoginStartPacket: {
                        const usernameLength = varint.decode(d, offset);
                        offset += varint.decode.bytes;
                        const username = d.subarray(offset, offset + usernameLength).toString();
                        offset += usernameLength;
                        s.write((0, commons_1.makePacket)(commons_1.LoginPackets.LoginSuccessPacket, [(0, packet_1.LoginSuccessPacket)(username, uuid)], state));
                        state = commons_1.State.PLAY;
                        // Wait an arbitrary(-ish) amount of time to wait for the client to do it's thing
                        setTimeout(() => {
                            // Send the JoinGamePacket here, then do chunk stuff later
                        }, 500);
                        keepAliveInterval = setInterval(() => {
                            s.write((0, commons_1.makePacket)(commons_1.PlayPackets.KeepAlivePacket, [Buffer.from([0, 0, 16, 16, 0, 16, 0, 16])], state));
                            // s.write(makePacket(PlayPackets.KeepAlivePacket, [ [ 0, 0, 0, 0, 32, 32, 32, 32, 0, 0, 0, 0, 32, 32, 32, 32 ] ], state));
                        }, 5000);
                        break;
                    }
                }
                break;
            case commons_1.State.PLAY:
                switch (id) {
                }
                break;
        }
    });
});
server.listen(25565);

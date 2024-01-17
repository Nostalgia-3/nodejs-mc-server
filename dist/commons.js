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
exports.logPacket = exports.makeString = exports.makePacket = exports.PlayPackets = exports.LoginPackets = exports.StatusPackets = exports.HandshakePackets = exports.State = void 0;
const varint = __importStar(require("varint"));
var State;
(function (State) {
    State[State["HANDSHAKING"] = 0] = "HANDSHAKING";
    State[State["STATUS"] = 1] = "STATUS";
    State[State["LOGIN"] = 2] = "LOGIN";
    State[State["PLAY"] = 3] = "PLAY";
})(State = exports.State || (exports.State = {}));
var HandshakePackets;
(function (HandshakePackets) {
    /** Serverbound */ HandshakePackets[HandshakePackets["HandshakingPacket"] = 0] = "HandshakingPacket";
})(HandshakePackets = exports.HandshakePackets || (exports.HandshakePackets = {}));
var StatusPackets;
(function (StatusPackets) {
    // Serverbound
    /** Serverbound */ StatusPackets[StatusPackets["RequestPacket"] = 0] = "RequestPacket";
    /** Serverbound */ StatusPackets[StatusPackets["PingPacket"] = 1] = "PingPacket";
    // Clientbound
    /** Clientbound */ StatusPackets[StatusPackets["ResponsePacket"] = 0] = "ResponsePacket";
    /** Clientbound */ StatusPackets[StatusPackets["PongPacket"] = 1] = "PongPacket";
})(StatusPackets = exports.StatusPackets || (exports.StatusPackets = {}));
var LoginPackets;
(function (LoginPackets) {
})(LoginPackets = exports.LoginPackets || (exports.LoginPackets = {}));
var PlayPackets;
(function (PlayPackets) {
})(PlayPackets = exports.PlayPackets || (exports.PlayPackets = {}));
function makePacket(id, sections, status) {
    let n = [];
    for (let i = 0; i < sections.length; i++) {
        n = n.concat(Array.from(sections[i]));
    }
    const len = varint.encode(n.length);
    const packetID = varint.encode(id);
    const buf = Buffer.alloc(len.length + packetID.length + n.length);
    buf.set(len);
    buf.set(packetID, len.length);
    buf.set(n, len.length + packetID.length);
    logPacket(id, status, n.length + packetID.length, true);
    return buf;
}
exports.makePacket = makePacket;
function makeString(d) {
    // length (varint)
    // data   (UTF8 character array)
    const len = varint.encode(d.length);
    const buf = Buffer.alloc(len.length + d.length);
    buf.set(len);
    buf.write(d, len.length);
    return buf;
}
exports.makeString = makeString;
function makePacketLogString(name, size, clientbound) {
    return `${clientbound ? ('S -> C') : 'C -> S'}  ${size.toString().padEnd(5, ' ')}  ${name.padEnd(25, ' ')}  ${new Date().getTime()}`;
}
/**
 * Logs a packet
 * @param id The ID of the packet
 * @param status The status of the client for this packet
 * @param clientbound If it is clientbound. If false, assumes serverbound
 */
function logPacket(id, status, size, clientbound) {
    if (clientbound) { // Server to Client
        switch (status) {
            case State.HANDSHAKING: break;
            case State.STATUS:
                switch (id) {
                    case StatusPackets.ResponsePacket: console.log(makePacketLogString('ResponsePacket', size, true));
                }
                break;
            case State.LOGIN:
                break;
            case State.PLAY:
                break;
        }
    }
    else { // Client to Server
        switch (status) {
            case State.HANDSHAKING:
                console.log(makePacketLogString('HandshakePacket', size, false));
                break;
            case State.STATUS:
                switch (id) {
                    case StatusPackets.RequestPacket:
                        console.log(makePacketLogString('RequestPacket', size, false));
                        break;
                    case StatusPackets.PingPacket:
                        console.log(makePacketLogString('PingPacket', size, false));
                        break;
                }
                break;
            case State.LOGIN:
                break;
            case State.PLAY:
                break;
        }
    }
}
exports.logPacket = logPacket;

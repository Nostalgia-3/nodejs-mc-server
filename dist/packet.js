"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSuccessPacket = exports.StatusResponsePacket = void 0;
const commons_1 = require("./commons");
function StatusResponsePacket(json) {
    let n = [];
    let d = {
        version: { name: "1.16.5", "protocol": 754 },
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
    n = n.concat(Array.from([32, 32, 0, 0, 32, 42, 97, 89, 32, 32, 0, 0, 32, 42, 97, 89]));
    n = n.concat(Array.from((0, commons_1.makeString)(username)));
    return n;
}
exports.LoginSuccessPacket = LoginSuccessPacket;

import { StatusJSON, makeString } from "./commons";

export function StatusResponsePacket(json: StatusJSON) {
    let n: number[] = [];

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

    n = n.concat(Array.from(makeString(JSON.stringify(d))));

    return n;
}

export function LoginSuccessPacket(username: string, uuid: string) {
    let n: number[] = [];

    n = n.concat(Array.from([32,32,0,0,32,42,97,89,32,32,0,0,32,42,97,89]));
    n = n.concat(Array.from(makeString(username)));

    return n;
}
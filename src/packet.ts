import { ServerStorage, StatusJSON, makeString, makeInt, makeDouble, makeFloat, makeBoolean } from "./commons";
import { encode, decode, Byte, Short, Int, Float } from 'nbt-ts';
import * as varint from 'varint';
import * as fs from 'fs';
import { Chunk, makeChunkSection } from "./chunk";

export function StatusResponsePacket(json: StatusJSON) {
    let n: number[] = [];

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

    n = n.concat(Array.from(makeString(JSON.stringify(d))));

    return n;
}

export function LoginSuccessPacket(username: string, uuid: string) {
    let n: number[] = [];

    n = n.concat(Array.from(makeString(uuid)));
    n = n.concat(Array.from(makeString(username)));

    return n;
}

export function JoinGamePacket(eid: number, gamemode: number, difficulty: number) {
    let n: number[] = [];

    n = n.concat(makeInt(eid));
    n = n.concat(gamemode);
    n = n.concat(makeInt(0));
    n = n.concat(difficulty);
    n = n.concat(0);
    n = n.concat(Array.from(makeString('flat')));
    n = n.concat(0);

    return n;
}

export function PlayerPositionAndLook(x: number, y: number, z: number, yaw: number, pitch: number) {
    let n: number[] = [];

    n = n.concat(makeDouble(x));
    n = n.concat(makeDouble(y));
    n = n.concat(makeDouble(z));
    n = n.concat(makeFloat(yaw));
    n = n.concat(makeFloat(pitch));
    n = n.concat(0);
    n = n.concat(Array.from(varint.encode(87)));

    return n;
}

export function ChunkDataPacket(chunkX: number, chunkY: number, chunk: Chunk) {
    let n: number[] = [];

    n = n.concat(makeInt(chunkX));
    n = n.concat(makeInt(chunkY));
    n = n.concat(makeBoolean(true));
    n = n.concat(Array.from(varint.encode(chunk.getFilledSections())));

    console.log(chunk.getFilledSections());

    let j = [];
    for(let i=0;i<16;i++) {
        if(chunk.getSection(i).isEmpty()) continue;
        j = j.concat(makeChunkSection(chunk.getSection(i)));
    }

    for(let i=0;i<256;i++) {
        j = j.concat(127);
    }

    n = n.concat(Array.from(varint.encode(j.length)));
    n = n.concat(j);

    n = n.concat(Array.from(varint.encode(0)));

    return n;
}
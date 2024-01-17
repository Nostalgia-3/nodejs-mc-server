import { StatusJSON, makeString } from "./commons";

export function StatusResponsePacket(json: StatusJSON) {
    let n: number[] = [];

    n = n.concat(Array.from(makeString(JSON.stringify(json))));

    return n;
}
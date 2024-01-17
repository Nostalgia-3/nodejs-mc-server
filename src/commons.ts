import * as varint from 'varint';

// export type Chat = {
//     text: string,
//     color: string,
    
//     // Styling Fields
//     bold: boolean,
//     italic: boolean,
//     underlined: boolean,
//     strikethrough: boolean,
//     obfuscated: boolean,
//     font: string,
//     insertion: string,
//     clickEvent: {
//         action: ChatAction,
//         value: string
//     },
// };

// export type ChatAction =
//     'open_url' |
//     'run_command' |
//     'suggest_command' |
//     'change_page' |
//     'copy_to_clipboard';


export type StatusJSON = {
    verion: {
        name: string,
        protocol: number
    },
    players: {
        max: number,
        online: number,
        sample: {name: string, id: string}[]
    },
    description: { text: string },
    favicon: string,
    enforcesSecureChat: boolean,
    previewsChat: boolean
};

export enum State {
    HANDSHAKING,
    STATUS,
    LOGIN,
    PLAY
}

export enum HandshakePackets {
    /** Serverbound */ HandshakingPacket
}

export enum StatusPackets {
    // Serverbound
    /** Serverbound */ RequestPacket,
    /** Serverbound */ PingPacket,
    
    // Clientbound
    /** Clientbound */ ResponsePacket=0,
    /** Clientbound */ PongPacket
}

export enum LoginPackets {

}

export enum PlayPackets {

}

export function makePacket(id: number, sections: (Buffer|number[])[], status: State) {
    let n: number[] = [];

    for(let i=0;i<sections.length;i++) {
        n = n.concat(Array.from(sections[i]));
    }

    const len = varint.encode(n.length);
    const packetID = varint.encode(id);
    const buf = Buffer.alloc(len.length + packetID.length + n.length);

    buf.set(len);
    buf.set(packetID, len.length);
    buf.set(n, len.length + packetID.length);

    logPacket(id, status, n.length+packetID.length, true);

    return buf;
}

export function makeString(d: string): Buffer {
    // length (varint)
    // data   (UTF8 character array)

    const len = varint.encode(d.length);
    const buf = Buffer.alloc(len.length + d.length);

    buf.set(len);
    buf.write(d, len.length);

    return buf;
}

function makePacketLogString(name: string, size: number, clientbound: boolean) {
    return `${clientbound ? ('S -> C') : 'C -> S'}  ${size.toString().padEnd(5, ' ')}  ${name.padEnd(25, ' ')}  ${new Date().getTime()}`
}

/**
 * Logs a packet
 * @param id The ID of the packet
 * @param status The status of the client for this packet
 * @param clientbound If it is clientbound. If false, assumes serverbound
 */
export function logPacket(id: number, status: State, size: number, clientbound: boolean) {
    if(clientbound) { // Server to Client
        switch(status) {
            case State.HANDSHAKING: break;

            case State.STATUS:
                switch(id as StatusPackets) {
                    case StatusPackets.ResponsePacket: console.log(makePacketLogString('ResponsePacket', size, true));
                }
            break;

            case State.LOGIN:
            break;

            case State.PLAY:
            break;
        }
    } else { // Client to Server
        switch(status) {
            case State.HANDSHAKING: console.log(makePacketLogString('HandshakePacket', size, false)); break;

            case State.STATUS:
                switch(id as StatusPackets) {
                    case StatusPackets.RequestPacket: console.log(makePacketLogString('RequestPacket', size, false)); break;
                    case StatusPackets.PingPacket:    console.log(makePacketLogString('PingPacket', size, false)); break;
                }
            break;

            case State.LOGIN:
            break;

            case State.PLAY:
            break;
        }
    }
}
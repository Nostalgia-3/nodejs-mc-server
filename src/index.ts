// NodeJS Modules
import * as varint from 'varint';
import * as crypto from 'crypto';
import * as net from 'net';

// Local Files
import { State, HandshakePackets, StatusPackets, makePacket, logPacket } from './commons';
import { StatusResponsePacket } from './packet';

const server = new net.Server();

server.on('connection', (s) => {
    const uuid = crypto.randomUUID();
    let state = State.HANDSHAKING;

    s.on('end', () => {
        // console.log(`Client ${uuid} disconnected.`);
        console.log(`-------------------------------------------------------------`);
    });

    s.on('data', (d) => {
        let offset = 0;

        const length = varint.decode(d, offset); offset+=varint.decode.bytes;
        const id     = varint.decode(d, offset); offset+=varint.decode.bytes;

        logPacket(id, state, d.length-offset, false);

        switch(state) {
            case State.HANDSHAKING:
                switch(id as HandshakePackets) {
                    case HandshakePackets.HandshakingPacket: {
                        const protocolVersion   = varint.decode(d, offset+=varint.decode.bytes);
                        const serverAddressLen  = varint.decode(d, offset+=varint.decode.bytes);
                        const serverAddress     = d.subarray(offset, offset+serverAddressLen); offset+=serverAddressLen;
                        const serverPort        = d.readUInt16BE(offset+=2);
                        const nextState         = varint.decode(d, offset+=varint.decode.bytes);

                        if(nextState == 1) {
                            state = State.STATUS;
                        } else if(nextState == 2) {
                            state = State.LOGIN;
                        }
                    break; }
                }
            break;
            
            case State.STATUS: {
                switch(id as StatusPackets) {
                    case StatusPackets.RequestPacket: {
                        makePacket(0x00, [ StatusResponsePacket({
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
                        }) ], state);
                    break; }
                }
            break; }
            
            case State.LOGIN:
            break;
            
            case State.PLAY:
            break;
        }
    });
});

server.listen(25565);
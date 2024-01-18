// NodeJS Modules
import * as varint from 'varint';
import * as crypto from 'crypto';
import * as net from 'net';

// Local Files
import { State, HandshakePackets, StatusPackets, makePacket, logPacket, LoginPackets, PlayPackets } from './commons';
import { LoginSuccessPacket, StatusResponsePacket } from './packet';

const server = new net.Server();

server.on('connection', (s) => {
    const uuid = crypto.randomUUID();
    let state = State.HANDSHAKING;

    let keepAliveInterval: NodeJS.Timeout;

    s.on('end', () => {
        // console.log(`Client ${uuid} disconnected.`);
        clearInterval(keepAliveInterval);
        console.log(`-------------------------------------------------------------`);
    });

    s.on('data', (d) => {
        if(d[0] == 0xFE) return;
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
                        s.write(makePacket(0x00, [ StatusResponsePacket({
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
                        }) ], state));
                    break; }

                    case StatusPackets.PingPacket: {
                        s.write(makePacket(0x01, [ d.subarray(offset, offset+8) ], state));
                    break; }
                }
            break; }
            
            case State.LOGIN:
                switch(id as LoginPackets) {
                    case LoginPackets.LoginStartPacket: {
                        const usernameLength = varint.decode(d, offset); offset+=varint.decode.bytes;
                        const username = d.subarray(offset, offset+usernameLength).toString(); offset+=usernameLength;

                        s.write(makePacket(LoginPackets.LoginSuccessPacket, [ LoginSuccessPacket(username, uuid) ], state));

                        state = State.PLAY;

                        // Wait an arbitrary(-ish) amount of time to wait for the client to do it's thing
                        setTimeout(() => {
                            // Send the JoinGamePacket here, then do chunk stuff later
                        }, 500);

                        keepAliveInterval = setInterval(() => {
                            s.write(makePacket(PlayPackets.KeepAlivePacket, [Buffer.from([0,0,16,16,0,16,0,16])], state));
                            // s.write(makePacket(PlayPackets.KeepAlivePacket, [ [ 0, 0, 0, 0, 32, 32, 32, 32, 0, 0, 0, 0, 32, 32, 32, 32 ] ], state));
                        }, 5000);
                    break; }
                }
            break;
            
            case State.PLAY:
                switch(id as PlayPackets) {
                    
                }
            break;
        }
    });
});

server.listen(25565);
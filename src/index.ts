// NodeJS Modules
import * as varint from 'varint';
import * as crypto from 'crypto';
import * as net from 'net';

// Local Files
import { State, HandshakePackets, StatusPackets, makePacket, logPacket, LoginPackets, PlayPackets, SB_PlayPackets, ServerStorage } from './commons';
import { ChunkDataPacket, JoinGamePacket, LoginSuccessPacket, PlayerPositionAndLook, StatusResponsePacket } from './packet';
import { BlockState, Blocks, Chunk } from './chunk';

const server = new net.Server();
const storage: ServerStorage = {
    players: [],
    entities: []
};

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
                                name: "1.12.2",
                                protocol: 340
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
                        s.write(makePacket(PlayPackets.JoinGamePacket, [ JoinGamePacket(100, 1, 2) ], state)); // send JoinGame packet

                        // Send chunks here
                        let chunk = new Chunk();
                        chunk.set(new BlockState(1, 0), 0, 0, 0);
                        s.write(makePacket(PlayPackets.ChunkDataPacket, [ ChunkDataPacket(0, 0, chunk) ], state));

                        s.write(makePacket(PlayPackets.PlayerPositionAndLookPacket, [ PlayerPositionAndLook(0, 128, 0, 0, 0) ], state));

                        keepAliveInterval = setInterval(() => {
                            s.write(makePacket(PlayPackets.KeepAlivePacket, [Buffer.from([0,0,16,16,0,16,0,16])], state));
                        }, 5000);
                    break; }
                }
            break;
            
            case State.PLAY:
                switch(id as SB_PlayPackets) {
                    case SB_PlayPackets.KeepAlivePacket: {
                        // Do something involving automatically kicking the client
                    break; }
                }
            break;
        }
    });
});

server.listen(25565, () => {
    console.log(`TCP Server listening on port 25565.`);
});
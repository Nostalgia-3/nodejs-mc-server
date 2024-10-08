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

export type ServerPlayer = {
    username: string,
    uuid: string,
    eid: number,
    pos: number[],
    rotation: number[]
};

export type ServerEntity = {
    eid: number,
    pos: number[],
    rotation: number[]
};

export type ServerStorage = {
    players: ServerPlayer[],
    entities: ServerEntity[]
};

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
    favicon?: string,
    enforcesSecureChat: boolean,
    previewsChat: boolean
};

export enum State {
    HANDSHAKING=0,
    STATUS=1,
    LOGIN=2,
    PLAY=3
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
    // Serverbound
    /** Serverbound */ LoginStartPacket,
    /** Serverbound */ EncryptionResponsePacket,
    
    // Clientbound
    /** Clientbound */ DisconnectPacket=0,
    /** Clientbound */ EncryptionRequestPacket,
    /** Clientbound */ LoginSuccessPacket,
    /** Clientbound */ SetCompressionPacket,
    /** Clientbound */ LoginPluginRequestPacket,
}

export enum PlayPackets {
    SpawnObjectPacket, SpawnExperienceOrbPacket, SpawnGlobalEntityPacket,  SpawnMobPacket,
    SpawnPaintingPacket, SpawnPlayerPacket, AnimationPacket, StatisticsPacket, BlockBreakAnimationPacket,
    UpdateBlockEntityPacket, BlockActionPacket, BlockChangePacket, BossBarPacket, ServerDifficultyPacket,
    TabCompletePacket, ChatMessagePacket, MultiBlockChangePacket, ConfirmTransactionPacket, CloseWindowPacket,
    OpenWindowPacket, WindowItemsPacket, WindowPropertyPacket, SetSlotPacket, SetCooldownPacket, PluginMessagePacket,
    NamedSoundEffectPacket, DisconnectPacket, EntityStatusPacket, ExplosionPacket, UnloadChunkPacket, ChangeGameStatePacket,
    KeepAlivePacket, ChunkDataPacket, EffectPacket, ParticlePacket, JoinGamePacket, MapPacket, EntityPacket, EntityRelativeMovePacket,
    EntityLookAndRelativeMovePacket, EntityLookPacket, VehicleMovePacket, OpenSignEditorPacket, CraftRecipeResponsePacket,
    PlayerAbilitiesPacket, CombatEventPacket, PlayerListItemPacket, PlayerPositionAndLookPacket, UseBedPacket, UnlockRecipesPacket,
    DestroyEntitiesPacket, RemoveEntityEffectPacket, ResourcePackSendPacket, RespawnPacket, EntityHeadLookPacket, SelectAdvancementTabPacket,
    WorldBorderPacket, CameraPacket, HeldItemChangePacket, DisplayScoreboardPacket, EntityMetadataPacket, AttachEntityPacket, EntityVelocityPacket,
    EntityEquipmentPacket, SetExperiencePacket, UpdateHealthPacket, ScoreboardObjectivePacket, SetPassengersPacket, TeamsPacket, UpdateScorePacket,
    SpawnPositionPacket, TimeUpdatePacket, TitlePacket, SoundEffectPacket, PlayerListHeaderAndFooterPacket, CollectItemPacket, EntityTeleportPacket,
    AdvancementsPacket, EntityPropertiesPacket, EntityEffectPacket
}

export enum SB_PlayPackets {
    TeleportConfirmPacket, TabCompletePacket, ChatMessagePacket, ClientStatusPacket, ClientSettingsPacket, ConfirmTransactionPacket,
    EnchantItemPacket, ClickWindowPacket, CloseWindowPacket, PluginMessagePacket, UseEntityPacket, KeepAlivePacket, PlayerPacket,
    PlayerPositionPacket, PlayerPositionAndLookPacket, PlayerLookPacket, VehicleMovePacket, SteerBoartPacket, CraftRecipeRequestPacket,
    PlayerAbilitiesPacket, PlayerDiggingPacket, EntityActionPacket, SteerVehiclePacket, CraftingBookDataPacket, ResourcePackStatusPacket,
    AdvancementTabPacket, HeldItemChangePacket, CreativeInventoryActionPacket, UpdateSignPacket, AnimationPacket, SpectatePacket,
    PlayerBlockPlacementPacket, UseItemPacket
}

export function makePacket(id: number, sections: (Buffer|number[])[], status: State) {
    let b = [id];

    for(let i=0;i<sections.length;i++) {
        b = b.concat(Array.from(sections[i]));
    }

    let sec = [];

    sec = sec.concat(Array.from(varint.encode(b.length)));
    sec = sec.concat(b);

    logPacket(id, status, b.length, true);

    return Buffer.from(sec);
}

export function makeInt(n: number): number[] {
    const b = Buffer.alloc(4);
    b.writeInt32BE(n);
    return Array.from(b);
}

export function makeDouble(n: number): number[] {
    const b = Buffer.alloc(8);
    b.writeDoubleBE(n);
    return Array.from(b);
}

export function makeFloat(n: number): number[] {
    const b = Buffer.alloc(4);
    b.writeFloatBE(n);
    return Array.from(b);
}

export function makeBoolean(b: boolean): number[] {
    return [(b ? 1 : 0)];
}

export function makeString(s: string): Buffer {
    // length (varint)
    // data   (UTF8 character array)

    let buffer = [];

    buffer = buffer.concat(Array.from(varint.encode(s.length)));
    buffer = buffer.concat(Array.from(Buffer.from(s, 'utf8')));

    return Buffer.from(buffer);
}

const packetNames = [
    { // handshaking
        clientbound: [ "HandshakePacket" ],
        serverbound: [ "HandshakePacket" ]
    },

    { // status
        clientbound: [ "ResponsePacket", "PongPacket" ],
        serverbound: [ "RequestPacket",  "PingPacket" ]
    },

    { // login
        clientbound: [ "DisconnectPacket", "EncryptionRequestPacket", "LoginSuccessPacket", "SetCompressionPacket", "LoginPluginRequestPacket" ],
        serverbound: [ "LoginStartPacket", "EncryptionResponsePacket", "LoginPluginResponsePacket" ],
    },

    { // play
        clientbound: [
            "SpawnObjectPacket", "SpawnExperienceOrbPacket", "SpawnGlobalEntityPacket", "SpawnMobPacket",
            "SpawnPaintingPacket", "SpawnPlayerPacket", "AnimationPacket", "StatisticsPacket", "BlockBreakAnimationPacket",
            "UpdateBlockEntityPacket", "BlockActionPacket", "BlockChangePacket", "BossBarPacket", "ServerDifficultyPacket",
            "TabCompletePacket", "ChatMessagePacket", "MultiBlockChangePacket", "ConfirmTransactionPacket", "CloseWindowPacket",
            "OpenWindowPacket", "WindowItemsPacket", "WindowPropertyPacket", "SetSlotPacket", "SetCooldownPacket", "PluginMessagePacket",
            "NamedSoundEffectPacket", "DisconnectPacket", "EntityStatusPacket", "ExplosionPacket", "UnloadChunkPacket", "ChangeGameStatePacket",
            "KeepAlivePacket", "ChunkDataPacket", "EffectPacket", "ParticlePacket", "JoinGamePacket", "MapPacket", "EntityPacket", "EntityRelativeMovePacket",
            "EntityLookAndRelativeMovePacket", "EntityLookPacket", "VehicleMovePacket", "OpenSignEditorPacket", "CraftRecipeResponsePacket",
            "PlayerAbilitiesPacket", "CombatEventPacket", "PlayerListItemPacket", "PlayerPositionAndLookPacket", "UseBedPacket", "UnlockRecipesPacket",
            "DestroyEntitiesPacket", "RemoveEntityEffectPacket", "ResourcePackSendPacket", "RespawnPacket", "EntityHeadLookPacket", "SelectAdvancementTabPacket",
            "WorldBorderPacket", "CameraPacket", "HeldItemChangePacket", "DisplayScoreboardPacket", "EntityMetadataPacket", "AttachEntityPacket", "EntityVelocityPacket",
            "EntityEquipmentPacket", "SetExperiencePacket", "UpdateHealthPacket", "ScoreboardObjectivePacket", "SetPassengersPacket", "TeamsPacket", "UpdateScorePacket",
            "SpawnPositionPacket", "TimeUpdatePacket", "TitlePacket", "SoundEffectPacket", "PlayerListHeaderAndFooterPacket", "CollectItemPacket", "EntityTeleportPacket",
            "AdvancementsPacket", "EntityPropertiesPacket", "EntityEffectPacket"
        ],
        serverbound: [
            "TeleportConfirmPacket", "TabCompletePacket", "ChatMessagePacket", "ClientStatusPacket", "ClientSettingsPacket", "ConfirmTransactionPacket",
            "EnchantItemPacket", "ClickWindowPacket", "CloseWindowPacket", "PluginMessagePacket", "UseEntityPacket", "KeepAlivePacket", "PlayerPacket",
            "PlayerPositionPacket", "PlayerPositionAndLookPacket", "PlayerLookPacket", "VehicleMovePacket", "SteerBoartPacket", "CraftRecipeRequestPacket",
            "PlayerAbilitiesPacket", "PlayerDiggingPacket", "EntityActionPacket", "SteerVehiclePacket", "CraftingBookDataPacket", "ResourcePackStatusPacket",
            "AdvancementTabPacket", "HeldItemChangePacket", "CreativeInventoryActionPacket", "UpdateSignPacket", "AnimationPacket", "SpectatePacket",
            "PlayerBlockPlacementPacket", "UseItemPacket"
        ]
    }
];

function getStatusString(s: State) {
    switch(s) {
        case State.HANDSHAKING:return 'HANDSHAKING';
        case State.STATUS:return 'STATUS';
        case State.LOGIN:return 'LOGIN';
        case State.PLAY:return 'PLAY';
    }
}

function makePacketLogString(name: string, size: number, status: State, clientbound: boolean) {
    return `${clientbound ? ('S -> C') : 'C -> S'}  ${size.toString().padEnd(5, ' ')}  ${name.padEnd(20, ' ')}  ${new Date().getTime()}  ${getStatusString(status)}`
}

/**
 * Logs a packet
 * @param id The ID of the packet
 * @param status The status of the client for this packet
 * @param clientbound If it is clientbound. If false, assumes serverbound
 */
export function logPacket(id: number, status: State, size: number, clientbound: boolean) {
    if(clientbound) {
        if(!packetNames[status].clientbound[id]) console.log(makePacketLogString(`UnknownPacket`, size, status, true));
        else console.log(makePacketLogString(packetNames[status].clientbound[id], size, status, true));
    } else {
        if(!packetNames[status].serverbound[id]) console.log(makePacketLogString(`UnknownPacket(0x${id.toString(16).padStart(2,'0')})`, size, status, false));
        else console.log(makePacketLogString(packetNames[status].serverbound[id], size, status, false));
    }
}
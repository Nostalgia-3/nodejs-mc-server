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
    // Serverbound
    /** Serverbound */ LoginPackets[LoginPackets["LoginStartPacket"] = 0] = "LoginStartPacket";
    /** Serverbound */ LoginPackets[LoginPackets["EncryptionResponsePacket"] = 1] = "EncryptionResponsePacket";
    // Clientbound
    /** Clientbound */ LoginPackets[LoginPackets["DisconnectPacket"] = 0] = "DisconnectPacket";
    /** Clientbound */ LoginPackets[LoginPackets["EncryptionRequestPacket"] = 1] = "EncryptionRequestPacket";
    /** Clientbound */ LoginPackets[LoginPackets["LoginSuccessPacket"] = 2] = "LoginSuccessPacket";
    /** Clientbound */ LoginPackets[LoginPackets["SetCompressionPacket"] = 3] = "SetCompressionPacket";
    /** Clientbound */ LoginPackets[LoginPackets["LoginPluginRequestPacket"] = 4] = "LoginPluginRequestPacket";
})(LoginPackets = exports.LoginPackets || (exports.LoginPackets = {}));
var PlayPackets;
(function (PlayPackets) {
})(PlayPackets = exports.PlayPackets || (exports.PlayPackets = {}));
function makePacket(id, sections, status) {
    let b = [id];
    for (let i = 0; i < sections.length; i++) {
        b = b.concat(Array.from(sections[i]));
    }
    let sec = [];
    sec = sec.concat(Array.from(varint.encode(b.length)));
    sec = sec.concat(b);
    logPacket(id, status, b.length, true);
    return Buffer.from(sec);
}
exports.makePacket = makePacket;
function makeString(s) {
    // length (varint)
    // data   (UTF8 character array)
    let buffer = [];
    buffer = buffer.concat(Array.from(varint.encode(s.length)));
    buffer = buffer.concat(Array.from(Buffer.from(s, 'utf8')));
    return Buffer.from(buffer);
}
exports.makeString = makeString;
const packetNames = [
    {
        clientbound: ["HandshakePacket"],
        serverbound: ["HandshakePacket"]
    },
    {
        clientbound: ["ResponsePacket", "PongPacket"],
        serverbound: ["RequestPacket", "PingPacket"]
    },
    {
        clientbound: ["DisconnectPacket", "EncryptionRequestPacket", "LoginSuccessPacket", "SetCompressionPacket", "LoginPluginRequestPacket"],
        serverbound: ["LoginStartPacket", "EncryptionResponsePacket", "LoginPluginResponsePacket"],
    },
    {
        clientbound: [
            "SpawnEntityPacket", "SpawnExperienceOrbPacket", "SpawnLivingEntityPacket", "SpawnPaintingPacket", "SpawnPlayerPacket",
            "EntityAnimationPacket", "StatisticsPacket", "AcknowledgePlayerDiggingPacket", "BlockBreakAnimationPacket", "BlockEntityDataPacket",
            "BlockActionPacket", "BlockChangePacket", "BossBarPacket", "ServerDifficultyPacket", "ChatMessagePacket", "TabCompletePacket",
            "DeclareCommandsPacket", "WindowConfirmationPacket", "CloseWindowPacket", "WindowItemsPacket", "WindowPropertyPacket", "SetSlotPacket",
            "SetCooldownPacket", "PluginMessagePacket", "NamedSoundEffectPacket", "DisconnectPacket", "EntityStatusPacket", "ExplosionPacket",
            "UnloadChunkPacket", "ChangeGameStatePacket", "OpenHorseWindowPacket", "KeepAlivePacket", "ChunkDataPacket", "EffectPacket", "ParticlePacket",
            "UpdateLightPacket", "JoinGamePacket", "MapDataPacket", "TradeListPacket", "EntityPositionPacket", "EntityPositionAndRotationPacket",
            "EntityRotationPacket", "EntityMovementPacket", "VehicleMovePacket", "OpenBookPacket", "OpenWindowPacket", "OpenSignEditorPacket",
            "CraftRecipeResponsePacket", "PlayerAbilitiesPacket", "CombatEventPacket", "PlayerInfoPacket", "FacePlayerPacket", "PlayerPositionAndLookPacket",
            "UnlockRecipesPacket", "DestroyEntitiesPacket", "RemoveEntityEffectPacket", "ResourcePackSendPacket", "RespawnPacket", "EntityHeadLookPacket",
            "MultiBlockChangePacket", "SelectAdvancementTabPacket", "WorldBorderPacket", "CameraPacket", "HeldItemChangePacket", "UpdateViewPositionPacket",
            "UpdateViewDistancePacket", "SpawnPositionPacket", "DisplayScoreboardPacket", "EntityMetadataPacket", "AttachEntityPacket", "EntityVelocityPacket",
            "EntityEquipmentPacket", "SetExperiencePacket", "UpdateHealth", "ScoreboardObjectivePacket", "SetPassengersPacket", "TeamsPacket", "UpdateScorePacket",
            "TimeUpdatePacket", "TitlePacket", "EntitySoundEffectPacket", "SoundEffectPacket", "StopSoundPacket", "PlayerListHeaderAndFooter",
            "NBTQueryResponsePacket", "CollectItemPacket", "EntityTeleportPacket", "AdvancementsPacket", "EntityPropertiesPacket", "EntityEffectPacket",
            "DeclareRecipesPacket", "TagsPacket"
        ],
        serverbound: []
    }
];
function getStatusString(s) {
    switch (s) {
        case State.HANDSHAKING: return 'HANDSHAKING';
        case State.STATUS: return 'STATUS';
        case State.LOGIN: return 'LOGIN';
        case State.PLAY: return 'PLAY';
    }
}
function makePacketLogString(name, size, status, clientbound) {
    return `${clientbound ? ('S -> C') : 'C -> S'}  ${size.toString().padEnd(5, ' ')}  ${name.padEnd(20, ' ')}  ${new Date().getTime()}  ${getStatusString(status)}`;
}
/**
 * Logs a packet
 * @param id The ID of the packet
 * @param status The status of the client for this packet
 * @param clientbound If it is clientbound. If false, assumes serverbound
 */
function logPacket(id, status, size, clientbound) {
    if (clientbound) {
        if (!packetNames[status].clientbound[id])
            console.log(makePacketLogString(`UnknownPacket`, size, status, true));
        else
            console.log(makePacketLogString(packetNames[status].clientbound[id], size, status, true));
    }
    else {
        if (!packetNames[status].clientbound[id])
            console.log(makePacketLogString(`UnknownPacket(0x${id.toString(16).padStart(2, '0')})`, size, status, false));
        else
            console.log(makePacketLogString(packetNames[status].serverbound[id], size, status, false));
    }
}
exports.logPacket = logPacket;

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
exports.logPacket = exports.makeString = exports.makeBoolean = exports.makeFloat = exports.makeDouble = exports.makeInt = exports.makePacket = exports.SB_PlayPackets = exports.PlayPackets = exports.LoginPackets = exports.StatusPackets = exports.HandshakePackets = exports.State = void 0;
const varint = __importStar(require("varint"));
var State;
(function (State) {
    State[State["HANDSHAKING"] = 0] = "HANDSHAKING";
    State[State["STATUS"] = 1] = "STATUS";
    State[State["LOGIN"] = 2] = "LOGIN";
    State[State["PLAY"] = 3] = "PLAY";
})(State || (exports.State = State = {}));
var HandshakePackets;
(function (HandshakePackets) {
    /** Serverbound */ HandshakePackets[HandshakePackets["HandshakingPacket"] = 0] = "HandshakingPacket";
})(HandshakePackets || (exports.HandshakePackets = HandshakePackets = {}));
var StatusPackets;
(function (StatusPackets) {
    // Serverbound
    /** Serverbound */ StatusPackets[StatusPackets["RequestPacket"] = 0] = "RequestPacket";
    /** Serverbound */ StatusPackets[StatusPackets["PingPacket"] = 1] = "PingPacket";
    // Clientbound
    /** Clientbound */ StatusPackets[StatusPackets["ResponsePacket"] = 0] = "ResponsePacket";
    /** Clientbound */ StatusPackets[StatusPackets["PongPacket"] = 1] = "PongPacket";
})(StatusPackets || (exports.StatusPackets = StatusPackets = {}));
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
})(LoginPackets || (exports.LoginPackets = LoginPackets = {}));
var PlayPackets;
(function (PlayPackets) {
    PlayPackets[PlayPackets["SpawnObjectPacket"] = 0] = "SpawnObjectPacket";
    PlayPackets[PlayPackets["SpawnExperienceOrbPacket"] = 1] = "SpawnExperienceOrbPacket";
    PlayPackets[PlayPackets["SpawnGlobalEntityPacket"] = 2] = "SpawnGlobalEntityPacket";
    PlayPackets[PlayPackets["SpawnMobPacket"] = 3] = "SpawnMobPacket";
    PlayPackets[PlayPackets["SpawnPaintingPacket"] = 4] = "SpawnPaintingPacket";
    PlayPackets[PlayPackets["SpawnPlayerPacket"] = 5] = "SpawnPlayerPacket";
    PlayPackets[PlayPackets["AnimationPacket"] = 6] = "AnimationPacket";
    PlayPackets[PlayPackets["StatisticsPacket"] = 7] = "StatisticsPacket";
    PlayPackets[PlayPackets["BlockBreakAnimationPacket"] = 8] = "BlockBreakAnimationPacket";
    PlayPackets[PlayPackets["UpdateBlockEntityPacket"] = 9] = "UpdateBlockEntityPacket";
    PlayPackets[PlayPackets["BlockActionPacket"] = 10] = "BlockActionPacket";
    PlayPackets[PlayPackets["BlockChangePacket"] = 11] = "BlockChangePacket";
    PlayPackets[PlayPackets["BossBarPacket"] = 12] = "BossBarPacket";
    PlayPackets[PlayPackets["ServerDifficultyPacket"] = 13] = "ServerDifficultyPacket";
    PlayPackets[PlayPackets["TabCompletePacket"] = 14] = "TabCompletePacket";
    PlayPackets[PlayPackets["ChatMessagePacket"] = 15] = "ChatMessagePacket";
    PlayPackets[PlayPackets["MultiBlockChangePacket"] = 16] = "MultiBlockChangePacket";
    PlayPackets[PlayPackets["ConfirmTransactionPacket"] = 17] = "ConfirmTransactionPacket";
    PlayPackets[PlayPackets["CloseWindowPacket"] = 18] = "CloseWindowPacket";
    PlayPackets[PlayPackets["OpenWindowPacket"] = 19] = "OpenWindowPacket";
    PlayPackets[PlayPackets["WindowItemsPacket"] = 20] = "WindowItemsPacket";
    PlayPackets[PlayPackets["WindowPropertyPacket"] = 21] = "WindowPropertyPacket";
    PlayPackets[PlayPackets["SetSlotPacket"] = 22] = "SetSlotPacket";
    PlayPackets[PlayPackets["SetCooldownPacket"] = 23] = "SetCooldownPacket";
    PlayPackets[PlayPackets["PluginMessagePacket"] = 24] = "PluginMessagePacket";
    PlayPackets[PlayPackets["NamedSoundEffectPacket"] = 25] = "NamedSoundEffectPacket";
    PlayPackets[PlayPackets["DisconnectPacket"] = 26] = "DisconnectPacket";
    PlayPackets[PlayPackets["EntityStatusPacket"] = 27] = "EntityStatusPacket";
    PlayPackets[PlayPackets["ExplosionPacket"] = 28] = "ExplosionPacket";
    PlayPackets[PlayPackets["UnloadChunkPacket"] = 29] = "UnloadChunkPacket";
    PlayPackets[PlayPackets["ChangeGameStatePacket"] = 30] = "ChangeGameStatePacket";
    PlayPackets[PlayPackets["KeepAlivePacket"] = 31] = "KeepAlivePacket";
    PlayPackets[PlayPackets["ChunkDataPacket"] = 32] = "ChunkDataPacket";
    PlayPackets[PlayPackets["EffectPacket"] = 33] = "EffectPacket";
    PlayPackets[PlayPackets["ParticlePacket"] = 34] = "ParticlePacket";
    PlayPackets[PlayPackets["JoinGamePacket"] = 35] = "JoinGamePacket";
    PlayPackets[PlayPackets["MapPacket"] = 36] = "MapPacket";
    PlayPackets[PlayPackets["EntityPacket"] = 37] = "EntityPacket";
    PlayPackets[PlayPackets["EntityRelativeMovePacket"] = 38] = "EntityRelativeMovePacket";
    PlayPackets[PlayPackets["EntityLookAndRelativeMovePacket"] = 39] = "EntityLookAndRelativeMovePacket";
    PlayPackets[PlayPackets["EntityLookPacket"] = 40] = "EntityLookPacket";
    PlayPackets[PlayPackets["VehicleMovePacket"] = 41] = "VehicleMovePacket";
    PlayPackets[PlayPackets["OpenSignEditorPacket"] = 42] = "OpenSignEditorPacket";
    PlayPackets[PlayPackets["CraftRecipeResponsePacket"] = 43] = "CraftRecipeResponsePacket";
    PlayPackets[PlayPackets["PlayerAbilitiesPacket"] = 44] = "PlayerAbilitiesPacket";
    PlayPackets[PlayPackets["CombatEventPacket"] = 45] = "CombatEventPacket";
    PlayPackets[PlayPackets["PlayerListItemPacket"] = 46] = "PlayerListItemPacket";
    PlayPackets[PlayPackets["PlayerPositionAndLookPacket"] = 47] = "PlayerPositionAndLookPacket";
    PlayPackets[PlayPackets["UseBedPacket"] = 48] = "UseBedPacket";
    PlayPackets[PlayPackets["UnlockRecipesPacket"] = 49] = "UnlockRecipesPacket";
    PlayPackets[PlayPackets["DestroyEntitiesPacket"] = 50] = "DestroyEntitiesPacket";
    PlayPackets[PlayPackets["RemoveEntityEffectPacket"] = 51] = "RemoveEntityEffectPacket";
    PlayPackets[PlayPackets["ResourcePackSendPacket"] = 52] = "ResourcePackSendPacket";
    PlayPackets[PlayPackets["RespawnPacket"] = 53] = "RespawnPacket";
    PlayPackets[PlayPackets["EntityHeadLookPacket"] = 54] = "EntityHeadLookPacket";
    PlayPackets[PlayPackets["SelectAdvancementTabPacket"] = 55] = "SelectAdvancementTabPacket";
    PlayPackets[PlayPackets["WorldBorderPacket"] = 56] = "WorldBorderPacket";
    PlayPackets[PlayPackets["CameraPacket"] = 57] = "CameraPacket";
    PlayPackets[PlayPackets["HeldItemChangePacket"] = 58] = "HeldItemChangePacket";
    PlayPackets[PlayPackets["DisplayScoreboardPacket"] = 59] = "DisplayScoreboardPacket";
    PlayPackets[PlayPackets["EntityMetadataPacket"] = 60] = "EntityMetadataPacket";
    PlayPackets[PlayPackets["AttachEntityPacket"] = 61] = "AttachEntityPacket";
    PlayPackets[PlayPackets["EntityVelocityPacket"] = 62] = "EntityVelocityPacket";
    PlayPackets[PlayPackets["EntityEquipmentPacket"] = 63] = "EntityEquipmentPacket";
    PlayPackets[PlayPackets["SetExperiencePacket"] = 64] = "SetExperiencePacket";
    PlayPackets[PlayPackets["UpdateHealthPacket"] = 65] = "UpdateHealthPacket";
    PlayPackets[PlayPackets["ScoreboardObjectivePacket"] = 66] = "ScoreboardObjectivePacket";
    PlayPackets[PlayPackets["SetPassengersPacket"] = 67] = "SetPassengersPacket";
    PlayPackets[PlayPackets["TeamsPacket"] = 68] = "TeamsPacket";
    PlayPackets[PlayPackets["UpdateScorePacket"] = 69] = "UpdateScorePacket";
    PlayPackets[PlayPackets["SpawnPositionPacket"] = 70] = "SpawnPositionPacket";
    PlayPackets[PlayPackets["TimeUpdatePacket"] = 71] = "TimeUpdatePacket";
    PlayPackets[PlayPackets["TitlePacket"] = 72] = "TitlePacket";
    PlayPackets[PlayPackets["SoundEffectPacket"] = 73] = "SoundEffectPacket";
    PlayPackets[PlayPackets["PlayerListHeaderAndFooterPacket"] = 74] = "PlayerListHeaderAndFooterPacket";
    PlayPackets[PlayPackets["CollectItemPacket"] = 75] = "CollectItemPacket";
    PlayPackets[PlayPackets["EntityTeleportPacket"] = 76] = "EntityTeleportPacket";
    PlayPackets[PlayPackets["AdvancementsPacket"] = 77] = "AdvancementsPacket";
    PlayPackets[PlayPackets["EntityPropertiesPacket"] = 78] = "EntityPropertiesPacket";
    PlayPackets[PlayPackets["EntityEffectPacket"] = 79] = "EntityEffectPacket";
})(PlayPackets || (exports.PlayPackets = PlayPackets = {}));
var SB_PlayPackets;
(function (SB_PlayPackets) {
    SB_PlayPackets[SB_PlayPackets["TeleportConfirmPacket"] = 0] = "TeleportConfirmPacket";
    SB_PlayPackets[SB_PlayPackets["TabCompletePacket"] = 1] = "TabCompletePacket";
    SB_PlayPackets[SB_PlayPackets["ChatMessagePacket"] = 2] = "ChatMessagePacket";
    SB_PlayPackets[SB_PlayPackets["ClientStatusPacket"] = 3] = "ClientStatusPacket";
    SB_PlayPackets[SB_PlayPackets["ClientSettingsPacket"] = 4] = "ClientSettingsPacket";
    SB_PlayPackets[SB_PlayPackets["ConfirmTransactionPacket"] = 5] = "ConfirmTransactionPacket";
    SB_PlayPackets[SB_PlayPackets["EnchantItemPacket"] = 6] = "EnchantItemPacket";
    SB_PlayPackets[SB_PlayPackets["ClickWindowPacket"] = 7] = "ClickWindowPacket";
    SB_PlayPackets[SB_PlayPackets["CloseWindowPacket"] = 8] = "CloseWindowPacket";
    SB_PlayPackets[SB_PlayPackets["PluginMessagePacket"] = 9] = "PluginMessagePacket";
    SB_PlayPackets[SB_PlayPackets["UseEntityPacket"] = 10] = "UseEntityPacket";
    SB_PlayPackets[SB_PlayPackets["KeepAlivePacket"] = 11] = "KeepAlivePacket";
    SB_PlayPackets[SB_PlayPackets["PlayerPacket"] = 12] = "PlayerPacket";
    SB_PlayPackets[SB_PlayPackets["PlayerPositionPacket"] = 13] = "PlayerPositionPacket";
    SB_PlayPackets[SB_PlayPackets["PlayerPositionAndLookPacket"] = 14] = "PlayerPositionAndLookPacket";
    SB_PlayPackets[SB_PlayPackets["PlayerLookPacket"] = 15] = "PlayerLookPacket";
    SB_PlayPackets[SB_PlayPackets["VehicleMovePacket"] = 16] = "VehicleMovePacket";
    SB_PlayPackets[SB_PlayPackets["SteerBoartPacket"] = 17] = "SteerBoartPacket";
    SB_PlayPackets[SB_PlayPackets["CraftRecipeRequestPacket"] = 18] = "CraftRecipeRequestPacket";
    SB_PlayPackets[SB_PlayPackets["PlayerAbilitiesPacket"] = 19] = "PlayerAbilitiesPacket";
    SB_PlayPackets[SB_PlayPackets["PlayerDiggingPacket"] = 20] = "PlayerDiggingPacket";
    SB_PlayPackets[SB_PlayPackets["EntityActionPacket"] = 21] = "EntityActionPacket";
    SB_PlayPackets[SB_PlayPackets["SteerVehiclePacket"] = 22] = "SteerVehiclePacket";
    SB_PlayPackets[SB_PlayPackets["CraftingBookDataPacket"] = 23] = "CraftingBookDataPacket";
    SB_PlayPackets[SB_PlayPackets["ResourcePackStatusPacket"] = 24] = "ResourcePackStatusPacket";
    SB_PlayPackets[SB_PlayPackets["AdvancementTabPacket"] = 25] = "AdvancementTabPacket";
    SB_PlayPackets[SB_PlayPackets["HeldItemChangePacket"] = 26] = "HeldItemChangePacket";
    SB_PlayPackets[SB_PlayPackets["CreativeInventoryActionPacket"] = 27] = "CreativeInventoryActionPacket";
    SB_PlayPackets[SB_PlayPackets["UpdateSignPacket"] = 28] = "UpdateSignPacket";
    SB_PlayPackets[SB_PlayPackets["AnimationPacket"] = 29] = "AnimationPacket";
    SB_PlayPackets[SB_PlayPackets["SpectatePacket"] = 30] = "SpectatePacket";
    SB_PlayPackets[SB_PlayPackets["PlayerBlockPlacementPacket"] = 31] = "PlayerBlockPlacementPacket";
    SB_PlayPackets[SB_PlayPackets["UseItemPacket"] = 32] = "UseItemPacket";
})(SB_PlayPackets || (exports.SB_PlayPackets = SB_PlayPackets = {}));
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
function makeInt(n) {
    const b = Buffer.alloc(4);
    b.writeInt32BE(n);
    return Array.from(b);
}
exports.makeInt = makeInt;
function makeDouble(n) {
    const b = Buffer.alloc(8);
    b.writeDoubleBE(n);
    return Array.from(b);
}
exports.makeDouble = makeDouble;
function makeFloat(n) {
    const b = Buffer.alloc(4);
    b.writeFloatBE(n);
    return Array.from(b);
}
exports.makeFloat = makeFloat;
function makeBoolean(b) {
    return [(b ? 1 : 0)];
}
exports.makeBoolean = makeBoolean;
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
        if (!packetNames[status].serverbound[id])
            console.log(makePacketLogString(`UnknownPacket(0x${id.toString(16).padStart(2, '0')})`, size, status, false));
        else
            console.log(makePacketLogString(packetNames[status].serverbound[id], size, status, false));
    }
}
exports.logPacket = logPacket;

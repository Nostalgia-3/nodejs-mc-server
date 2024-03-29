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
    // Clientbound
    PlayPackets[PlayPackets["SpawnEntityPacket"] = 0] = "SpawnEntityPacket";
    PlayPackets[PlayPackets["SpawnExperienceOrbPacket"] = 1] = "SpawnExperienceOrbPacket";
    PlayPackets[PlayPackets["SpawnLivingEntityPacket"] = 2] = "SpawnLivingEntityPacket";
    PlayPackets[PlayPackets["SpawnPaintingPacket"] = 3] = "SpawnPaintingPacket";
    PlayPackets[PlayPackets["SpawnPlayerPacket"] = 4] = "SpawnPlayerPacket";
    PlayPackets[PlayPackets["EntityAnimationPacket"] = 5] = "EntityAnimationPacket";
    PlayPackets[PlayPackets["StatisticsPacket"] = 6] = "StatisticsPacket";
    PlayPackets[PlayPackets["AcknowledgePlayerDiggingPacket"] = 7] = "AcknowledgePlayerDiggingPacket";
    PlayPackets[PlayPackets["BlockBreakAnimationPacket"] = 8] = "BlockBreakAnimationPacket";
    PlayPackets[PlayPackets["BlockEntityDataPacket"] = 9] = "BlockEntityDataPacket";
    PlayPackets[PlayPackets["BlockActionPacket"] = 10] = "BlockActionPacket";
    PlayPackets[PlayPackets["BlockChangePacket"] = 11] = "BlockChangePacket";
    PlayPackets[PlayPackets["BossBarPacket"] = 12] = "BossBarPacket";
    PlayPackets[PlayPackets["ServerDifficultyPacket"] = 13] = "ServerDifficultyPacket";
    PlayPackets[PlayPackets["ChatMessagePacket"] = 14] = "ChatMessagePacket";
    PlayPackets[PlayPackets["TabCompletePacket"] = 15] = "TabCompletePacket";
    PlayPackets[PlayPackets["DeclareCommandsPacket"] = 16] = "DeclareCommandsPacket";
    PlayPackets[PlayPackets["WindowConfirmationPacket"] = 17] = "WindowConfirmationPacket";
    PlayPackets[PlayPackets["CloseWindowPacket"] = 18] = "CloseWindowPacket";
    PlayPackets[PlayPackets["WindowItemsPacket"] = 19] = "WindowItemsPacket";
    PlayPackets[PlayPackets["WindowPropertyPacket"] = 20] = "WindowPropertyPacket";
    PlayPackets[PlayPackets["SetSlotPacket"] = 21] = "SetSlotPacket";
    PlayPackets[PlayPackets["SetCooldownPacket"] = 22] = "SetCooldownPacket";
    PlayPackets[PlayPackets["PluginMessagePacket"] = 23] = "PluginMessagePacket";
    PlayPackets[PlayPackets["NamedSoundEffectPacket"] = 24] = "NamedSoundEffectPacket";
    PlayPackets[PlayPackets["DisconnectPacket"] = 25] = "DisconnectPacket";
    PlayPackets[PlayPackets["EntityStatusPacket"] = 26] = "EntityStatusPacket";
    PlayPackets[PlayPackets["ExplosionPacket"] = 27] = "ExplosionPacket";
    PlayPackets[PlayPackets["UnloadChunkPacket"] = 28] = "UnloadChunkPacket";
    PlayPackets[PlayPackets["ChangeGameStatePacket"] = 29] = "ChangeGameStatePacket";
    PlayPackets[PlayPackets["OpenHorseWindowPacket"] = 30] = "OpenHorseWindowPacket";
    PlayPackets[PlayPackets["KeepAlivePacket"] = 31] = "KeepAlivePacket";
    PlayPackets[PlayPackets["ChunkDataPacket"] = 32] = "ChunkDataPacket";
    PlayPackets[PlayPackets["EffectPacket"] = 33] = "EffectPacket";
    PlayPackets[PlayPackets["ParticlePacket"] = 34] = "ParticlePacket";
    PlayPackets[PlayPackets["UpdateLightPacket"] = 35] = "UpdateLightPacket";
    PlayPackets[PlayPackets["JoinGamePacket"] = 36] = "JoinGamePacket";
    PlayPackets[PlayPackets["MapDataPacket"] = 37] = "MapDataPacket";
    PlayPackets[PlayPackets["TradeListPacket"] = 38] = "TradeListPacket";
    PlayPackets[PlayPackets["EntityPositionPacket"] = 39] = "EntityPositionPacket";
    PlayPackets[PlayPackets["EntityPositionAndRotationPacket"] = 40] = "EntityPositionAndRotationPacket";
    PlayPackets[PlayPackets["EntityRotationPacket"] = 41] = "EntityRotationPacket";
    PlayPackets[PlayPackets["EntityMovementPacket"] = 42] = "EntityMovementPacket";
    PlayPackets[PlayPackets["VehicleMovePacket"] = 43] = "VehicleMovePacket";
    PlayPackets[PlayPackets["OpenBookPacket"] = 44] = "OpenBookPacket";
    PlayPackets[PlayPackets["OpenWindowPacket"] = 45] = "OpenWindowPacket";
    PlayPackets[PlayPackets["OpenSignEditorPacket"] = 46] = "OpenSignEditorPacket";
    PlayPackets[PlayPackets["CraftRecipeResponsePacket"] = 47] = "CraftRecipeResponsePacket";
    PlayPackets[PlayPackets["PlayerAbilitiesPacket"] = 48] = "PlayerAbilitiesPacket";
    PlayPackets[PlayPackets["CombatEventPacket"] = 49] = "CombatEventPacket";
    PlayPackets[PlayPackets["PlayerInfoPacket"] = 50] = "PlayerInfoPacket";
    PlayPackets[PlayPackets["FacePlayerPacket"] = 51] = "FacePlayerPacket";
    PlayPackets[PlayPackets["PlayerPositionAndLookPacket"] = 52] = "PlayerPositionAndLookPacket";
    PlayPackets[PlayPackets["UnlockRecipesPacket"] = 53] = "UnlockRecipesPacket";
    PlayPackets[PlayPackets["DestroyEntitiesPacket"] = 54] = "DestroyEntitiesPacket";
    PlayPackets[PlayPackets["RemoveEntityEffectPacket"] = 55] = "RemoveEntityEffectPacket";
    PlayPackets[PlayPackets["ResourcePackSendPacket"] = 56] = "ResourcePackSendPacket";
    PlayPackets[PlayPackets["RespawnPacket"] = 57] = "RespawnPacket";
    PlayPackets[PlayPackets["EntityHeadLookPacket"] = 58] = "EntityHeadLookPacket";
    PlayPackets[PlayPackets["MultiBlockChangePacket"] = 59] = "MultiBlockChangePacket";
    PlayPackets[PlayPackets["SelectAdvancementTabPacket"] = 60] = "SelectAdvancementTabPacket";
    PlayPackets[PlayPackets["WorldBorderPacket"] = 61] = "WorldBorderPacket";
    PlayPackets[PlayPackets["CameraPacket"] = 62] = "CameraPacket";
    PlayPackets[PlayPackets["HeldItemChangePacket"] = 63] = "HeldItemChangePacket";
    PlayPackets[PlayPackets["UpdateViewPositionPacket"] = 64] = "UpdateViewPositionPacket";
    PlayPackets[PlayPackets["UpdateViewDistancePacket"] = 65] = "UpdateViewDistancePacket";
    PlayPackets[PlayPackets["SpawnPositionPacket"] = 66] = "SpawnPositionPacket";
    PlayPackets[PlayPackets["DisplayScoreboardPacket"] = 67] = "DisplayScoreboardPacket";
    PlayPackets[PlayPackets["EntityMetadataPacket"] = 68] = "EntityMetadataPacket";
    PlayPackets[PlayPackets["AttachEntityPacket"] = 69] = "AttachEntityPacket";
    PlayPackets[PlayPackets["EntityVelocityPacket"] = 70] = "EntityVelocityPacket";
    PlayPackets[PlayPackets["EntityEquipmentPacket"] = 71] = "EntityEquipmentPacket";
    PlayPackets[PlayPackets["SetExperiencePacket"] = 72] = "SetExperiencePacket";
    PlayPackets[PlayPackets["UpdateHealth"] = 73] = "UpdateHealth";
    PlayPackets[PlayPackets["ScoreboardObjectivePacket"] = 74] = "ScoreboardObjectivePacket";
    PlayPackets[PlayPackets["SetPassengersPacket"] = 75] = "SetPassengersPacket";
    PlayPackets[PlayPackets["TeamsPacket"] = 76] = "TeamsPacket";
    PlayPackets[PlayPackets["UpdateScorePacket"] = 77] = "UpdateScorePacket";
    PlayPackets[PlayPackets["TimeUpdatePacket"] = 78] = "TimeUpdatePacket";
    PlayPackets[PlayPackets["TitlePacket"] = 79] = "TitlePacket";
    PlayPackets[PlayPackets["EntitySoundEffectPacket"] = 80] = "EntitySoundEffectPacket";
    PlayPackets[PlayPackets["SoundEffectPacket"] = 81] = "SoundEffectPacket";
    PlayPackets[PlayPackets["StopSoundPacket"] = 82] = "StopSoundPacket";
    PlayPackets[PlayPackets["PlayerListHeaderAndFooter"] = 83] = "PlayerListHeaderAndFooter";
    PlayPackets[PlayPackets["NBTQueryResponsePacket"] = 84] = "NBTQueryResponsePacket";
    PlayPackets[PlayPackets["CollectItemPacket"] = 85] = "CollectItemPacket";
    PlayPackets[PlayPackets["EntityTeleportPacket"] = 86] = "EntityTeleportPacket";
    PlayPackets[PlayPackets["AdvancementsPacket"] = 87] = "AdvancementsPacket";
    PlayPackets[PlayPackets["EntityPropertiesPacket"] = 88] = "EntityPropertiesPacket";
    PlayPackets[PlayPackets["EntityEffectPacket"] = 89] = "EntityEffectPacket";
    PlayPackets[PlayPackets["DeclareRecipesPacket"] = 90] = "DeclareRecipesPacket";
    PlayPackets[PlayPackets["TagsPacket"] = 91] = "TagsPacket";
    // Serverbound
    PlayPackets[PlayPackets["TeleportConfirmPacket"] = 92] = "TeleportConfirmPacket";
    PlayPackets[PlayPackets["QueryBlockNBTPacket"] = 93] = "QueryBlockNBTPacket";
    PlayPackets[PlayPackets["SetDifficultyPacket"] = 94] = "SetDifficultyPacket";
    PlayPackets[PlayPackets["SB_ChatMessagePacket"] = 95] = "SB_ChatMessagePacket";
    PlayPackets[PlayPackets["ClientStatusPacket"] = 96] = "ClientStatusPacket";
    PlayPackets[PlayPackets["ClientSettingsPacket"] = 97] = "ClientSettingsPacket";
    PlayPackets[PlayPackets["SB_TabCompletePacket"] = 98] = "SB_TabCompletePacket";
    PlayPackets[PlayPackets["SB_WindowConfirmationPacket"] = 99] = "SB_WindowConfirmationPacket";
    PlayPackets[PlayPackets["ClickWindowButtonPacket"] = 100] = "ClickWindowButtonPacket";
    PlayPackets[PlayPackets["ClickWindowPacket"] = 101] = "ClickWindowPacket";
    PlayPackets[PlayPackets["SB_CloseWindowPacket"] = 102] = "SB_CloseWindowPacket";
    PlayPackets[PlayPackets["SB_PluginMessagePacket"] = 103] = "SB_PluginMessagePacket";
    PlayPackets[PlayPackets["EditBookPacket"] = 104] = "EditBookPacket";
    PlayPackets[PlayPackets["QueryEntityNBTPacket"] = 105] = "QueryEntityNBTPacket";
    PlayPackets[PlayPackets["InteractEntityPacket"] = 106] = "InteractEntityPacket";
    PlayPackets[PlayPackets["GenerateStructurePacket"] = 107] = "GenerateStructurePacket";
    PlayPackets[PlayPackets["SB_KeepAlivePacket"] = 108] = "SB_KeepAlivePacket";
    PlayPackets[PlayPackets["LockDifficultyPacket"] = 109] = "LockDifficultyPacket";
    PlayPackets[PlayPackets["PlayerPositionPacket"] = 110] = "PlayerPositionPacket";
    PlayPackets[PlayPackets["PlayerPositionAndRotationPacket"] = 111] = "PlayerPositionAndRotationPacket";
    PlayPackets[PlayPackets["PlayerRotationPacket"] = 112] = "PlayerRotationPacket";
    PlayPackets[PlayPackets["PlayerMovementPacket"] = 113] = "PlayerMovementPacket";
    PlayPackets[PlayPackets["SB_VehicleMovePacket"] = 114] = "SB_VehicleMovePacket";
    PlayPackets[PlayPackets["SteerBoatPacket"] = 115] = "SteerBoatPacket";
    PlayPackets[PlayPackets["PickItemPacket"] = 116] = "PickItemPacket";
    PlayPackets[PlayPackets["CraftRecipeRequestPacket"] = 117] = "CraftRecipeRequestPacket";
    PlayPackets[PlayPackets["SB_PlayerAbilitiesPacket"] = 118] = "SB_PlayerAbilitiesPacket";
    PlayPackets[PlayPackets["PlayerDiggingPacket"] = 119] = "PlayerDiggingPacket";
    PlayPackets[PlayPackets["EntityActionPacket"] = 120] = "EntityActionPacket";
    PlayPackets[PlayPackets["SteerVehiclePacket"] = 121] = "SteerVehiclePacket";
    PlayPackets[PlayPackets["SetRecipeBookStatePacket"] = 122] = "SetRecipeBookStatePacket";
    PlayPackets[PlayPackets["SetDisplayedRecipePacket"] = 123] = "SetDisplayedRecipePacket";
    PlayPackets[PlayPackets["NameItemPacket"] = 124] = "NameItemPacket";
    PlayPackets[PlayPackets["ResourcePackStatusPacket"] = 125] = "ResourcePackStatusPacket";
    PlayPackets[PlayPackets["AdvancementTabPacket"] = 126] = "AdvancementTabPacket";
    PlayPackets[PlayPackets["SelectTradePacket"] = 127] = "SelectTradePacket";
    PlayPackets[PlayPackets["SetBeaconEffectPacket"] = 128] = "SetBeaconEffectPacket";
    PlayPackets[PlayPackets["SB_HeldItemChangePacket"] = 129] = "SB_HeldItemChangePacket";
    PlayPackets[PlayPackets["UpdateCommandBlockPacket"] = 130] = "UpdateCommandBlockPacket";
    PlayPackets[PlayPackets["UpdateCommandBlockMinecartPacket"] = 131] = "UpdateCommandBlockMinecartPacket";
    PlayPackets[PlayPackets["CreativeInventoryActionPacket"] = 132] = "CreativeInventoryActionPacket";
    PlayPackets[PlayPackets["UpdateJigsawBlockPacket"] = 133] = "UpdateJigsawBlockPacket";
    PlayPackets[PlayPackets["UpdateStructureBlockPacket"] = 134] = "UpdateStructureBlockPacket";
    PlayPackets[PlayPackets["UpdateSignPacket"] = 135] = "UpdateSignPacket";
    PlayPackets[PlayPackets["AnimationPacket"] = 136] = "AnimationPacket";
    PlayPackets[PlayPackets[" SpectatePacket"] = 137] = " SpectatePacket";
    PlayPackets[PlayPackets["PlayerBlockPlacementPacket"] = 138] = "PlayerBlockPlacementPacket";
    PlayPackets[PlayPackets["UseItemPacket"] = 139] = "UseItemPacket";
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
        serverbound: [
            "TeleportConfirmPacket", "QueryBlockNBTPacket", "SetDifficultyPacket", "ChatMessagePacket", "ClientStatusPacket", "ClientSettingsPacket",
            "TabCompletePacket", "WindowConfirmationPacket", "ClickWindowButtonPacket", "ClickWindowPacket", "CloseWindowPacket", "PluginMessagePacket",
            "EditBookPacket", "QueryEntityNBTPacket", "InteractEntityPacket", "GenerateStructurePacket", "KeepAlivePacket", "LockDifficultyPacket",
            "PlayerPositionPacket", "PlayerPositionAndRotationPacket", "PlayerRotationPacket", "PlayerMovementPacket", "VehicleMovePacket", "SteerBoatPacket",
            "PickItemPacket", "CraftRecipeRequestPacket", "PlayerAbilitiesPacket", "PlayerDiggingPacket", "EntityActionPacket", "SteerVehiclePacket",
            "SetRecipeBookStatePacket", "SetDisplayedRecipePacket", "NameItemPacket", "ResourcePackStatusPacket", "AdvancementTabPacket", "SelectTradePacket",
            "SetBeaconEffectPacket", "HeldItemChangePacket", "UpdateCommandBlockPacket", "UpdateCommandBlockMinecartPacket", "CreativeInventoryActionPacket",
            "UpdateJigsawBlockPacket", "UpdateStructureBlockPacket", "UpdateSignPacket", "AnimationPacket", " SpectatePacket", "PlayerBlockPlacementPacket",
            "UseItemPacket"
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

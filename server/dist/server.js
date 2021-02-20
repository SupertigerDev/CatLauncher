"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socketIo = __importStar(require("socket.io"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = new socketIo.Server(server);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client')));
const emitConstants = {
    "AUTHENTICATED": 0x0,
    "PLAYER_MOVED": 0x1,
    "PLAYER_CONNECTED": 0x2,
    "PLAYER_DISCONNECTED": 0x3,
    "LAUNCH_ROCKET": 0x4
};
const eventConstants = {
    "AUTHENTICATE": 0x0,
    "PLAYER_MOVE": 0x1,
    "LAUNCH_ROCKET_REQUEST": 0x2,
};
const clients = {};
io.on('connection', ((socket) => {
    socket.on(eventConstants.AUTHENTICATE, (data) => {
        socket.emit(emitConstants.AUTHENTICATED, {
            connectedPlayers: clients
        });
        clients[socket.id] = {
            name: data.name,
            position: { x: 0, y: 0 }
        };
        socket.broadcast.emit(emitConstants.PLAYER_CONNECTED, { id: socket.id, name: data.name });
    });
    socket.on(eventConstants.PLAYER_MOVE, (pos) => {
        clients[socket.id].position = pos;
        socket.broadcast.emit(emitConstants.PLAYER_MOVED, Object.assign({ id: socket.id }, pos));
    });
    socket.on(eventConstants.LAUNCH_ROCKET_REQUEST, (data) => {
        io.emit(emitConstants.LAUNCH_ROCKET, { id: socket.id, angle: data.angle, power: data.power });
    });
    socket.on("disconnect", () => {
        delete clients[socket.id];
        socket.broadcast.emit(emitConstants.PLAYER_DISCONNECTED, { id: socket.id });
    });
}));
server.listen(80, () => {
    console.log('listening localhost:80');
});

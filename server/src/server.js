"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var path_1 = require("path");
var express_1 = require("express");
var http_1 = require("http");
var socketIo = require("socket.io");
var app = express_1["default"]();
var server = http_1["default"].createServer(app);
var io = new socketIo.Server(server);
app.use(express_1["default"].static(path_1["default"].join(__dirname, '../../client')));
var emitConstants = {
    "AUTHENTICATED": 0x0,
    "PLAYER_MOVED": 0x1,
    "PLAYER_CONNECTED": 0x2,
    "PLAYER_DISCONNECTED": 0x3,
    "LAUNCH_ROCKET": 0x4
};
var eventConstants = {
    "AUTHENTICATE": 0x0,
    "PLAYER_MOVE": 0x1,
    "LAUNCH_ROCKET_REQUEST": 0x2
};
var clients = {};
io.on('connection', (function (socket) {
    socket.on(eventConstants.AUTHENTICATE, function (data) {
        socket.emit(emitConstants.AUTHENTICATED, {
            connectedPlayers: clients
        });
        clients[socket.id] = {
            name: data.name,
            position: { x: 0, y: 0 }
        };
        socket.broadcast.emit(emitConstants.PLAYER_CONNECTED, { id: socket.id, name: data.name });
    });
    socket.on(eventConstants.PLAYER_MOVE, function (pos) {
        clients[socket.id].position = pos;
        socket.broadcast.emit(emitConstants.PLAYER_MOVED, __assign({ id: socket.id }, pos));
    });
    socket.on(eventConstants.LAUNCH_ROCKET_REQUEST, function (data) {
        io.emit(emitConstants.LAUNCH_ROCKET, { id: socket.id, angle: data.angle, power: data.power });
    });
    socket.on("disconnect", function () {
        delete clients[socket.id];
        socket.broadcast.emit(emitConstants.PLAYER_DISCONNECTED, { id: socket.id });
    });
}));
server.listen(80, function () {
    console.log('listening localhost:80');
});

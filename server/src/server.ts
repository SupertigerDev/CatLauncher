import path from 'path';
import express from 'express';
import http from 'http';
import * as socketIo from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server)

app.use(express.static(path.join(__dirname, '../../client')))

const emitConstants = {
    "AUTHENTICATED": 0x0,
    "PLAYER_MOVED": 0x1,
    "PLAYER_CONNECTED": 0x2,
    "PLAYER_DISCONNECTED": 0x3,
}
const eventConstants = {
    "AUTHENTICATE": 0x0,
    "PLAYER_MOVE": 0x1,
}

interface Client {
    [key: string]: {
        name: string,
        position: {x: number, y: number}
    }
}

const clients: Client = {}

io.on('connection', ((socket: socketIo.Socket) => {
    socket.on(eventConstants.AUTHENTICATE as any, (data: {name: string}) => {

        socket.emit(emitConstants.AUTHENTICATED as any, {
            connectedPlayers: clients
        });
        clients[socket.id] = {
            name: data.name,
            position: {x: 0, y: 0}
        };
        socket.broadcast.emit(emitConstants.PLAYER_CONNECTED as any, {id: socket.id, name: data.name})
    });
    socket.on(eventConstants.PLAYER_MOVE as any, (pos: {x: number, y: number}) => {
        clients[socket.id].position = pos;
        socket.broadcast.emit(emitConstants.PLAYER_MOVED as any, {id: socket.id,...pos})
    })
    socket.on("disconnect", () => {
        delete clients[socket.id];
        socket.broadcast.emit(emitConstants.PLAYER_DISCONNECTED as any, {id: socket.id})
    })
}))


server.listen(80, () => {
    console.log('listening localhost:80');
});
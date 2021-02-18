const path = require('path');
const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '../client')))

const emitConstants = {
    "AUTHENTICATE": 0x0,
    "PLAYER_MOVE": 0x1,
}

io.on('connection', (event => {

}))


http.listen(80, () => {
    console.log('listening localhost:80');
});
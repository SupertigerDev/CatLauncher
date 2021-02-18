const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const app = express();
const http = require("http").createServer(app);
const io = socketIo(http);

app.use(express.static(path.join(__dirname, '../client')))



http.listen(80, () => {
    console.log('listening localhost:80');
});
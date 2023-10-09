import express from 'express'
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*'
  }
});

io.on('connection', socket => {
    socket.on("login", username => {
        socket.username = username
        io.emit("user login", username + ' has joined the chat!');
    });

    socket.on("chat message", msg => {
        io.emit("chat message", { user: socket.username, message: msg });
    });

    socket.on("disconnect", () => {
        io.emit("user disconnected", socket.username + ' has left the chat');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running here: http://localhost:3000`);
});

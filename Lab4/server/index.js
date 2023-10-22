import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*'
  }
});

let loggeedUsers = []

io.on('connection', socket => {
    socket.on("login", username => {
        if (username === "", loggeedUsers.includes(username)) {
            socket.emit("access event", { isAllowed: false })
            return
        }
        loggeedUsers.push(username)
        socket.username = username;
        socket.emit("access event", { isAllowed: true });
        socket.broadcast.emit("user login", { message: `${username} has joined the chat!` });
    });

    socket.on("chat message", message => {
        if (!socket.username) { 
            return;
        }
        io.emit("chat message", { user: socket.username, message: message });
    });

    socket.on("disconnect", () => {
        if (!socket.username) { 
            return;
        }
        io.emit("user disconnected", { message: `${socket.username}  has left the chat!` });
        loggeedUsers.pop(socket.username)
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running here: http://localhost:3000`);
});

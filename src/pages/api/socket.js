// app/api/socket.js
import { Server } from "socket.io";

export default function handler(req, res) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            path: "/api/socket_io",
        });
        res.socket.server.io = io;
        console.log("✅ Socket.io server started!");
    }
    res.end();
}

export const config = {
    api: {
        bodyParser: false,
    },
};

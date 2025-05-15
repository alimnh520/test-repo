// app/api/live-message/route.js
import { dbConnection } from "@/lib/connectDb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const body = await req.body;
            const db = await dbConnection();
            const collection = db.collection("messages");

            const result = await collection.insertOne({
                text: body.text,
                time: new Date().toLocaleTimeString(),
            });

            // ✅ Emit via socket.io
            const io = req.socket?.server?.io;
            if (io) {
                io.emit("newMessage", {
                    text: body.text,
                    time: new Date().toLocaleTimeString(),
                });
            }
            res.status(200).json({ message: 'Success' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Failed' });
        }
    }
}

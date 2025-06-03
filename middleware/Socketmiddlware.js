const { Server } = require("socket.io");

let io = null;

const initializeSocket = (server) => {
    if (!io) {
        io = new Server(server, {
            cors: {
                origin: ["http://localhost:3000", "http://127.0.0.1:3000", "*"],
                methods: ["GET", "POST","*"],
                credentials: true,
                allowedHeaders: ["Content-Type", "Authorization"]
            },
            transports: ['websocket', 'polling'],
            pingTimeout: 60000,
            pingInterval: 25000
        });

        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            socket.on('join_room', (titlefilm) => {
                socket.join(titlefilm);
                console.log(`Client ${socket.id} joined room: ${titlefilm}`);
            });

            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });

            socket.on('disconnect', (reason) => {
                console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
            });
        });

        console.log("Socket.IO server initialized");
    }
    return io;
};
const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Call initializeSocket first");
    }
    return io;
};
module.exports = { initializeSocket, getIO };

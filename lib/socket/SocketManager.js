const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "http://127.0.0.1:3000", "*"],
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"]
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000
  });

  // Socket.IO event handlers with error handling
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    let currentRoom = null;
    socket.on('join_room', (titlefilm) => {
      try {
        if (currentRoom) {
          socket.leave(currentRoom);
        }
        socket.join(titlefilm);
        currentRoom = titlefilm;
        console.log(`Client ${socket.id} joined room: ${titlefilm}`);
      } catch (error) {
        console.error('Error joining room:', error);
      }
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIO };
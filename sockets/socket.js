const { Server } = require("socket.io");

const viewerCounts = {};

let io;

const emitPresence = (stationId) => {
  io.to(stationId).emit("presenceUpdate", {
    stationId,
    viewers: viewerCounts[stationId] || 0,
  });
};

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("joinStation", (stationId) => {
      if (!stationId) {
        return;
      }

      // Leave old station
      if (socket.stationId) {
        const oldStationId = socket.stationId;

        socket.leave(oldStationId);

        if (viewerCounts[oldStationId]) {
          viewerCounts[oldStationId]--;

          if (viewerCounts[oldStationId] < 0) {
            viewerCounts[oldStationId] = 0;
          }
        }

        emitPresence(oldStationId);
      }

      // Join new station
      socket.join(stationId);

      socket.stationId = stationId;

      viewerCounts[stationId] =
        (viewerCounts[stationId] || 0) + 1;

      emitPresence(stationId);

      console.log(
        `Socket ${socket.id} joined station ${stationId}`
      );
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);

      if (!socket.stationId) {
        return;
      }

      const stationId = socket.stationId;

      if (viewerCounts[stationId]) {
        viewerCounts[stationId]--;

        if (viewerCounts[stationId] < 0) {
          viewerCounts[stationId] = 0;
        }
      }

      emitPresence(stationId);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io has not been initialized");
  }

  return io;
};

module.exports = {
  initSocket,
  getIO,
};
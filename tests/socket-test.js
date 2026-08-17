const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

const stationId = "6a824b622cf91bb7bee59c65";

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("joinStation", stationId);
});

socket.on("presenceUpdate", (data) => {
  console.log("Presence Update:", data);
});

socket.on("newAnnouncement", (data) => {
  console.log("New Announcement:", data);
});
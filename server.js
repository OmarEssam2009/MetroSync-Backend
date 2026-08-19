const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

const connectDB = require("./config/db");

const stationRoutes = require("./routes/stationRoutes");
const authRoutes = require("./routes/authRoutes");
const announcementRoutes = require("./routes/announcementRoutes");

const { initSocket } = require("./sockets/socket");

dotenv.config();

const app = express();

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "MetroSync API is running successfully!",
  });
});

app.use("/api/v1/stations", stationRoutes);
app.use("/api/v1/stations", announcementRoutes);
app.use("/api/v1/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
});

const server = http.createServer(app);
initSocket(server);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
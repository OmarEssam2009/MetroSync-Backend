const announcementService = require("../services/announcementService");
const { getIO } = require("../sockets/socket");

const getAnnouncements = async (req, res, next) => {
  try {
    const { stationId } = req.params;

    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      100
    );

    const result =
      await announcementService.getAnnouncementsByStation(
        stationId,
        page,
        limit
      );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createAnnouncement = async (req, res, next) => {
  try {
    const { stationId } = req.params;
    const { text } = req.body;

    // Save first
    const announcement =
      await announcementService.createAnnouncement(
        stationId,
        text
      );

    // Broadcast only after successful database save
    const io = getIO();

    io.to(stationId).emit("newAnnouncement", {
      announcement,
    });

    res.status(201).json(announcement);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnnouncements,
  createAnnouncement,
};
const Announcement = require("../models/Announcement");

const getAnnouncementsByStation = async (
  stationId,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const [announcements, total] = await Promise.all([
    Announcement.find({
      station: stationId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Announcement.countDocuments({
      station: stationId,
    }),
  ]);

  return {
    announcements,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const createAnnouncement = async (stationId, text) => {
  const announcement = await Announcement.create({
    station: stationId,
    text,
  });

  return announcement;
};

module.exports = {
  getAnnouncementsByStation,
  createAnnouncement,
};
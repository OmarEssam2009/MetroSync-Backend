const stationService = require("../services/stationService");

const getAllStations = async (req, res, next) => {
  try {
    const stations = await stationService.getAllStations();

    res.status(200).json(stations);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStations,
};
const express = require("express");
const { body, param } = require("express-validator");

const announcementController = require("../controllers/announcementController");
const requireAdmin = require("../middleware/requireAdmin");
const validate = require("../middleware/validate");

const router = express.Router();

router.get(
  "/:stationId/announcements",
  param("stationId")
    .isMongoId()
    .withMessage("Invalid station ID"),
  validate,
  announcementController.getAnnouncements
);

router.post(
  "/:stationId/announcements",
  requireAdmin,
  [
    param("stationId")
      .isMongoId()
      .withMessage("Invalid station ID"),

    body("text")
      .trim()
      .notEmpty()
      .withMessage("Announcement text is required")
      .isLength({ max: 500 })
      .withMessage(
        "Announcement text cannot exceed 500 characters"
      ),
  ],
  validate,
  announcementController.createAnnouncement
);

module.exports = router;
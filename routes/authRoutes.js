const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const loginLimiter = require("../middleware/loginLimiter");

const router = express.Router();

router.post(
  "/login",
  loginLimiter,
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  validate,
  authController.login
);

module.exports = router;
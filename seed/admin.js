const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = "admin@metrosync.com";
    const password = "Admin@12345";

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    await Admin.deleteMany({});

    const admin = await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${password}`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(
      "Admin seeding failed:",
      error.message
    );

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedAdmin();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Station = require("../models/Station");

dotenv.config();

const stations = [
  // =========================
  // Line 1 - Helwan → New El-Marg
  // =========================
  {
    name: "Helwan",
    line: "Line 1",
    order: 1,
  },
  {
    name: "Ain Helwan",
    line: "Line 1",
    order: 2,
  },
  {
    name: "Helwan University",
    line: "Line 1",
    order: 3,
  },
  {
    name: "Wadi Hof",
    line: "Line 1",
    order: 4,
  },
  {
    name: "Hadayek Helwan",
    line: "Line 1",
    order: 5,
  },
  {
    name: "El-Maasara",
    line: "Line 1",
    order: 6,
  },
  {
    name: "Tora El-Asmant",
    line: "Line 1",
    order: 7,
  },
  {
    name: "Kozzika",
    line: "Line 1",
    order: 8,
  },
  {
    name: "Tora El-Balad",
    line: "Line 1",
    order: 9,
  },
  {
    name: "Sakanat El-Maadi",
    line: "Line 1",
    order: 10,
  },
  {
    name: "Maadi",
    line: "Line 1",
    order: 11,
  },
  {
    name: "Hadayek El-Maadi",
    line: "Line 1",
    order: 12,
  },
  {
    name: "Dar El-Salam",
    line: "Line 1",
    order: 13,
  },
  {
    name: "El-Zahraa",
    line: "Line 1",
    order: 14,
  },
  {
    name: "Mar Girgis",
    line: "Line 1",
    order: 15,
  },
  {
    name: "El-Malek El-Saleh",
    line: "Line 1",
    order: 16,
  },
  {
    name: "Al-Sayeda Zeinab",
    line: "Line 1",
    order: 17,
  },
  {
    name: "Saad Zaghloul",
    line: "Line 1",
    order: 18,
  },
  {
    name: "Sadat",
    line: "Line 1",
    order: 19,
  },
  {
    name: "Gamal Abdel Nasser",
    line: "Line 1",
    order: 20,
  },
  {
    name: "Orabi",
    line: "Line 1",
    order: 21,
  },
  {
    name: "Al-Shohadaa",
    line: "Line 1",
    order: 22,
  },
  {
    name: "Ghamra",
    line: "Line 1",
    order: 23,
  },
  {
    name: "El-Demerdash",
    line: "Line 1",
    order: 24,
  },
  {
    name: "Manshiet El-Sadr",
    line: "Line 1",
    order: 25,
  },
  {
    name: "Kobri El-Qobba",
    line: "Line 1",
    order: 26,
  },
  {
    name: "Hammamat El-Qobba",
    line: "Line 1",
    order: 27,
  },
  {
    name: "Saray El-Qobba",
    line: "Line 1",
    order: 28,
  },
  {
    name: "Hadayeq El-Zaitoun",
    line: "Line 1",
    order: 29,
  },
  {
    name: "Helmeyet El-Zaitoun",
    line: "Line 1",
    order: 30,
  },
  {
    name: "El-Matareyya",
    line: "Line 1",
    order: 31,
  },
  {
    name: "Ain Shams",
    line: "Line 1",
    order: 32,
  },
  {
    name: "Ezbet El-Nakhl",
    line: "Line 1",
    order: 33,
  },
  {
    name: "El-Marg",
    line: "Line 1",
    order: 34,
  },
  {
    name: "New El-Marg",
    line: "Line 1",
    order: 35,
  },

  // =========================
  // Line 2 - Shubra El-Kheima → El-Mounib
  // =========================
  {
    name: "Shubra El-Kheima",
    line: "Line 2",
    order: 1,
  },
  {
    name: "Kolleyyet El-Zeraa",
    line: "Line 2",
    order: 2,
  },
  {
    name: "Mezallat",
    line: "Line 2",
    order: 3,
  },
  {
    name: "El-Khalafawy",
    line: "Line 2",
    order: 4,
  },
  {
    name: "St. Teresa",
    line: "Line 2",
    order: 5,
  },
  {
    name: "Rod El-Farag",
    line: "Line 2",
    order: 6,
  },
  {
    name: "Massara",
    line: "Line 2",
    order: 7,
  },
  {
    name: "Al-Shohadaa",
    line: "Line 2",
    order: 8,
  },
  {
    name: "Attaba",
    line: "Line 2",
    order: 9,
  },
  {
    name: "Mohamed Naguib",
    line: "Line 2",
    order: 10,
  },
  {
    name: "Sadat",
    line: "Line 2",
    order: 11,
  },
  {
    name: "Opera",
    line: "Line 2",
    order: 12,
  },
  {
    name: "Dokki",
    line: "Line 2",
    order: 13,
  },
  {
    name: "El-Bohoth",
    line: "Line 2",
    order: 14,
  },
  {
    name: "Cairo University",
    line: "Line 2",
    order: 15,
  },
  {
    name: "Faisal",
    line: "Line 2",
    order: 16,
  },
  {
    name: "Giza",
    line: "Line 2",
    order: 17,
  },
  {
    name: "Omm El-Masryeen",
    line: "Line 2",
    order: 18,
  },
  {
    name: "Sakiat Mekky",
    line: "Line 2",
    order: 19,
  },
  {
    name: "El-Mounib",
    line: "Line 2",
    order: 20,
  },

  // =========================
  // Line 3 - Adly Mansour → Rod El-Farag / Cairo University
  // =========================
  {
    name: "Adly Mansour",
    line: "Line 3",
    order: 1,
  },
  {
    name: "El-Haykestep",
    line: "Line 3",
    order: 2,
  },
  {
    name: "Omar Ibn El-Khattab",
    line: "Line 3",
    order: 3,
  },
  {
    name: "Qobaa",
    line: "Line 3",
    order: 4,
  },
  {
    name: "Hesham Barakat",
    line: "Line 3",
    order: 5,
  },
  {
    name: "El-Nozha",
    line: "Line 3",
    order: 6,
  },
  {
    name: "Nadi El-Shams",
    line: "Line 3",
    order: 7,
  },
  {
    name: "Alf Maskan",
    line: "Line 3",
    order: 8,
  },
  {
    name: "Heliopolis",
    line: "Line 3",
    order: 9,
  },
  {
    name: "Haroun",
    line: "Line 3",
    order: 10,
  },
  {
    name: "Al-Ahram",
    line: "Line 3",
    order: 11,
  },
  {
    name: "Koleyet El-Banat",
    line: "Line 3",
    order: 12,
  },
  {
    name: "Stadium",
    line: "Line 3",
    order: 13,
  },
  {
    name: "Fair Zone",
    line: "Line 3",
    order: 14,
  },
  {
    name: "Abbassia",
    line: "Line 3",
    order: 15,
  },
  {
    name: "Abdou Pasha",
    line: "Line 3",
    order: 16,
  },
  {
    name: "El-Geish",
    line: "Line 3",
    order: 17,
  },
  {
    name: "Bab El-Shaaria",
    line: "Line 3",
    order: 18,
  },
  {
    name: "Attaba",
    line: "Line 3",
    order: 19,
  },
  {
    name: "Gamal Abdel Nasser",
    line: "Line 3",
    order: 20,
  },
  {
    name: "Maspero",
    line: "Line 3",
    order: 21,
  },
  {
    name: "Safaa Hegazy",
    line: "Line 3",
    order: 22,
  },
  {
    name: "Kit Kat",
    line: "Line 3",
    order: 23,
  },
  {
    name: "Sudan",
    line: "Line 3",
    order: 24,
  },
  {
    name: "Imbaba",
    line: "Line 3",
    order: 25,
  },
  {
    name: "El-Bohy",
    line: "Line 3",
    order: 26,
  },
  {
    name: "El-Qawmia",
    line: "Line 3",
    order: 27,
  },
  {
    name: "Ring Road",
    line: "Line 3",
    order: 28,
  },
  {
    name: "Rod El-Farag Corridor",
    line: "Line 3",
    order: 29,
  },
  {
    name: "El-Tawfikeya",
    line: "Line 3",
    order: 30,
  },
  {
    name: "Wadi El-Nil",
    line: "Line 3",
    order: 31,
  },
  {
    name: "Gameat El-Dowal El-Arabeya",
    line: "Line 3",
    order: 32,
  },
  {
    name: "Cairo University",
    line: "Line 3",
    order: 33,
  },
  {
    name: "Boulaq El-Dakrour",
    line: "Line 3",
    order: 34,
  },
];

const seedStations = async () => {
  try {
    await connectDB();

    await Station.deleteMany({});

    const insertedStations = await Station.insertMany(stations);

    console.log(
      `${insertedStations.length} stations inserted successfully.`
    );

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedStations();
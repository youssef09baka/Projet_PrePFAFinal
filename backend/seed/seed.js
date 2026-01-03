const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Transport = require("../models/Transport");
const Hotel = require("../models/Hotel");

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding");

    await Transport.deleteMany();
    await Hotel.deleteMany();

    // ================= TRANSPORTS =================
    await Transport.insertMany([

      // CASA ↔ RABAT
      { from: "casa", to: "rabat", type: "Train", company: "ONCF", duration: "1h10", price: 60 },
      { from: "rabat", to: "casa", type: "Train", company: "ONCF", duration: "1h10", price: 60 },
      { from: "casa", to: "rabat", type: "Bus", company: "CTM", duration: "1h30", price: 40 },
      { from: "rabat", to: "casa", type: "Bus", company: "CTM", duration: "1h30", price: 40 },

      // CASA ↔ TANGER
      { from: "casa", to: "tanger", type: "Train", company: "ONCF", duration: "4h00", price: 200 },
      { from: "tanger", to: "casa", type: "Train", company: "ONCF", duration: "4h00", price: 200 },
      { from: "casa", to: "tanger", type: "Bus", company: "Supratours", duration: "5h00", price: 140 },
      { from: "tanger", to: "casa", type: "Bus", company: "Supratours", duration: "5h00", price: 140 },

      // CASA ↔ FES
      { from: "casa", to: "fes", type: "Train", company: "ONCF", duration: "3h45", price: 180 },
      { from: "fes", to: "casa", type: "Train", company: "ONCF", duration: "3h45", price: 180 },
      { from: "casa", to: "fes", type: "Bus", company: "CTM", duration: "4h30", price: 140 },
      { from: "fes", to: "casa", type: "Bus", company: "CTM", duration: "4h30", price: 140 },

      // FES ↔ TANGER
      { from: "fes", to: "tanger", type: "Train", company: "ONCF", duration: "6h00", price: 260 },
      { from: "tanger", to: "fes", type: "Train", company: "ONCF", duration: "6h00", price: 260 },

      // CASA ↔ MARRAKECH
      { from: "casa", to: "marrakech", type: "Train", company: "ONCF", duration: "3h00", price: 170 },
      { from: "marrakech", to: "casa", type: "Train", company: "ONCF", duration: "3h00", price: 170 },

      // MARRAKECH ↔ AGADIR
      { from: "marrakech", to: "agadir", type: "Bus", company: "CTM", duration: "3h00", price: 120 },
      { from: "agadir", to: "marrakech", type: "Bus", company: "CTM", duration: "3h00", price: 120 },

      // TANGER ↔ TETOUAN
      { from: "tanger", to: "tetouan", type: "Bus", company: "CTM", duration: "1h30", price: 50 },
      { from: "tetouan", to: "tanger", type: "Bus", company: "CTM", duration: "1h30", price: 50 },

      // CASA ↔ KENITRA
      { from: "casa", to: "kenitra", type: "Train", company: "ONCF", duration: "1h30", price: 90 },
      { from: "kenitra", to: "casa", type: "Train", company: "ONCF", duration: "1h30", price: 90 }

    ]);

    // ================= HOTELS =================
    await Hotel.insertMany([

      // CASA
      {
        city: "casa",
        name: "Hotel Kenzi Tower",
        price: 520,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210e5",
        description: "Hôtel haut de gamme au cœur de Casablanca."
      },
      {
        city: "casa",
        name: "Hotel Central",
        price: 250,
        rating: 3.9,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        description: "Hôtel économique proche de la médina."
      },

      // RABAT
      {
        city: "rabat",
        name: "Hotel La Tour Hassan",
        price: 480,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        description: "Hôtel élégant proche du centre administratif."
      },

      // TANGER
      {
        city: "tanger",
        name: "Hotel Rif",
        price: 280,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1544986581-efac024faf62",
        description: "Hôtel proche du centre-ville."
      },

      // FES
      {
        city: "fes",
        name: "Riad Fes",
        price: 350,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949",
        description: "Riad traditionnel au cœur de la médina."
      },

      // MARRAKECH
      {
        city: "marrakech",
        name: "Riad Atlas",
        price: 300,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1544986581-efac024faf62",
        description: "Riad traditionnel au cœur de la médina."
      },

      // AGADIR
      {
        city: "agadir",
        name: "Hotel Atlantic Palace",
        price: 480,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210e5",
        description: "Hôtel balnéaire proche de la plage."
      },

      // KENITRA
      {
        city: "kenitra",
        name: "Hotel Relax Kenitra",
        price: 240,
        rating: 3.9,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        description: "Hôtel confortable proche du centre."
      },

      // TETOUAN
      {
        city: "tetouan",
        name: "Hotel Blanco Riad",
        price: 260,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        description: "Riad traditionnel au cœur de Tétouan."
      }

    ]);

    console.log("Database seeded correctly ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();

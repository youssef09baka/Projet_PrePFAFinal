const express = require("express");
const router = express.Router();

const Transport = require("../models/Transport");
const Hotel = require("../models/Hotel");

router.post("/plans", async (req, res) => {
  try {
    let { from, to, budget, startDate, endDate } = req.body;

    // Vérification des paramètres
    if (!from || !to || !budget || !startDate || !endDate) {
      return res.status(400).json({
        message: "Paramètres manquants"
      });
    }

    // Normalisation
    from = from.trim().toLowerCase();
    to = to.trim().toLowerCase();

    // Calcul des dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    const nights = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    if (isNaN(nights) || nights <= 0) {
      return res.status(400).json({
        message: "Dates invalides"
      });
    }

    // Recherche des transports
    const transports = await Transport.find({
      from: { $regex: new RegExp("^" + from, "i") },
      to: { $regex: new RegExp("^" + to, "i") }
    });

    // Recherche des hôtels
    const hotels = await Hotel.find({
      city: { $regex: new RegExp("^" + to, "i") }
    });

    if (transports.length === 0) {
      return res.status(404).json({
        message: "Aucun transport disponible pour ce trajet"
      });
    }

    if (hotels.length === 0) {
      return res.status(404).json({
        message: "Aucun hôtel disponible pour cette destination"
      });
    }

    // Choisir les moins chers
    const bestTransport = transports.reduce((a, b) =>
      a.price < b.price ? a : b
    );

    const bestHotel = hotels.reduce((a, b) =>
      a.price < b.price ? a : b
    );

    // Calcul du total avec nuits
    const total = bestTransport.price + bestHotel.price * nights;

    // Vérification du budget
    if (total > budget) {
      return res.status(200).json({
        message: "Budget insuffisant",
        transport: bestTransport,
        hotel: bestHotel,
        nights,
        total
      });
    }

    // Réponse finale
    res.json({
      transport: bestTransport,
      hotel: bestHotel,
      nights,
      total
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

module.exports = router;


require('dotenv').config();
const express = require('express');
const router = express.Router();
const VillageController = require('../controllers/VillageController');


  // Ensure this line is at the top of your main app file (like app.js), not here

router.get('/', VillageController.getDonations);

router.post('/add', (req, res, next) => {
    const { adminPin } = req.body;

    // ✅ Correct comparison
    if (adminPin === process.env.ADMIN_PIN) {
        next();
    } else {
        res.status(403).send("Unauthorized: Invalid Admin PIN");
        res.send("/villagedontations")
    }
}, VillageController.addVillageDonation);

module.exports = router;

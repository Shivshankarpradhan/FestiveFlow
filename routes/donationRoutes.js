// Load environment variables
require('dotenv').config();
const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationController');

  // Ensure this line is at the top of your main app file (like app.js), not here

router.get('/', donationsController.getDonations);

router.post('/add', (req, res, next) => {
    const { adminPin } = req.body;

    // ✅ Correct comparison
    if (adminPin === process.env.ADMIN_PIN) {
        next();
    } else {
        res.status(403).send("Unauthorized: Invalid Admin PIN");
        res.send("/donations")
    }
}, donationsController.addDonation);

module.exports = router;

require('dotenv').config();
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');



// Show all events
router.get('/', async (req, res) => {
  const events = await Event.find().sort({ time: 1 });
  res.render('events', { events });
});

// Add new event
router.post('/add', async (req, res) => {
  const { title, time, venue, pin } = req.body;

  if (pin !== process.env.ADMIN_PIN) {
    return res.send("❌ Invalid Admin PIN.");
  }

  await Event.create({ title, time, venue });
  res.redirect('/events');
});

module.exports = router;

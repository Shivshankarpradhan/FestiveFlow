const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  time: String,
  venue: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);

const mongoose = require("mongoose");

const VillageDonationSchema = new mongoose.Schema({
    name: String,
    amount:Number,
    Mode : String,
    date: {type: Date , default:Date.now}
});


module.exports = mongoose.model('village', VillageDonationSchema);
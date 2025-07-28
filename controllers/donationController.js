const Donation = require("../models/Donation");
exports.addDonation = async(req ,res) => {
    await Donation.create(req.body);
    res.redirect('/donations');
}

exports.getDonations = async(req ,res) =>{
    const donations = await Donation.find();
    res.render('donations' , {donations});
};
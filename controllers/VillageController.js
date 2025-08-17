const VillageDonation = require("../models/VillageDonation");
exports.addVillageDonation = async(req ,res) => {
    await VillageDonation.create(req.body);
    res.redirect('/villagedonations');
}

exports.getDonations = async(req ,res) =>{
    const donations = await VillageDonation.find().sort({amount: -1});
    res.render('villagedonations' , {donations});
};
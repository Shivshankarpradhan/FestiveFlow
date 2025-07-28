require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app= express();
const path = require('path');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine" , 'ejs');

mongoose.connect("mongodb+srv://shivshankar:d75RWwTUZNgHStBi@cluster0.w5vinji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const Donation = require('./models/Donation');
const Expense = require('./models/Expense');

app.get('/' ,async(req ,res) => {
const donations = await Donation.find();
const expenses = await Expense.find();
const totalDonation =donations.reduce((sum ,d) => sum + d.amount , 0);
const totalExpenses = expenses.reduce((sum , e) => sum + e.amount , 0);

res.render('index', {totalDonation  , totalExpenses});
});


app.use('/donations' , require('./routes/donationRoutes'));
app.use('/expenses', require('./routes/expensesRoutes'));


app.listen(3000 , () => {
    console.log("Sever running on port 3000");
});
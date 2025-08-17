require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// ✅ Use URL from .env
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const Donation = require("./models/Donation");
const Expense = require("./models/Expense");
const Events = require("./models/Event");
const VillageDonation = require("./models/VillageDonation");

app.get("/", async (req, res) => {
  const donations = await Donation.find();
  const expenses = await Expense.find();
  const vDonations = await VillageDonation.find();

const donationSum = donations.reduce((sum, d) => sum + d.amount, 0);
const villageDonationSum = vDonations.reduce((sum, v) => sum + v.amount, 0);

const totalDonation = donationSum + villageDonationSum;

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  res.render("index", { donationSum , villageDonationSum ,totalDonation, totalExpenses });
});

app.use("/donations", require("./routes/donationRoutes"));
app.use("/expenses", require("./routes/expensesRoutes"));
app.use("/events", require("./routes/event"));
app.use("/villagedonations", require("./routes/villagedonationRoute"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

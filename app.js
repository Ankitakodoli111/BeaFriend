require('dotenv').config();
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const _ = require("lodash");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://@cluster0.uqffd.mongodb.net/donarsDB", {
  user: process.env.DBUSER,
  pass: process.env.DBPASSWORD,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// mongoose.connect("mongodb://localhost:27017/donorDB", {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// });

const donorScehma = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  addres1: String,
  city: String,
  state: String,
  zip: Number,
  phoneNumber: Number,
  ItemDonated: []
});

const User = new mongoose.model('Donor', donorScehma);
const transporter = nodemailer.createTransport({
  service: 'gamil',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    host: '127.0.0.1'
  }
});



app.get("/", function(req, res) {
  res.render("main");
});

app.get("/donate", function(req, res) {
  res.render("donate");
});


app.post("/donate", function(req, res) {
  // console.log(req);
  const newUser = new User({
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email,
    address: req.body.address,
    addres1: req.body.address1,
    city: req.body.cityName,
    state: req.body.state,
    zip: req.body.zipCode,
    phoneNumber: req.body.mobileNumber,
    ItemDonated: req.body.item
  });
  newUser.save(function(err) {
    if (!err) {
      console.log("saved successfully");
    }
  });

  const email = req.body.email;
  const name = _.capitalize(req.body.fName);
  const lname = _.capitalize(req.body.lName);

  ejs.renderFile(__dirname + "/views/email.ejs", {
    name: name,
    lname: lname
  }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: 'beaFriend2712@gmail.com',
        to: email,
        subject: 'Thank you for your contribution for making a life better.',
        html: data
      };
      // console.log("html data ======================>", mainOptions.html);
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log('Message sent: ' + info.response);
        }
      });
    }
  });

  res.render("success");

});


app.listen(3000, function(req, res) {
  console.log("Server running on port number 3000");
});

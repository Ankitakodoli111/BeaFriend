const express=require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");

const app =express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/donorDB",{useUnifiedTopology:true,useNewUrlParser:true});

const donorScehma= new mongoose.Schema({
  firstName:String,
  lastName:String,
  email:String,
  dob:String,
  address:String,
  addres1:String,
  city:String,
  state:String,
  zip:Number,
  phoneNumber:Number,
  ItemDonated:[]
});

const User=new mongoose.model('Donor',donorScehma);



app.get("/",function(req,res){
  res.render("home");
});

app.get("/donate",function(req,res){
  res.render("donate");
});


app.post("/donate",function(req,res){
console.log(req);
console.log(req.body.fName);
console.log(req.body.lName);
console.log(req.body.email);
console.log(req.body.mobileNumber);
console.log(req.body.address);
console.log(req.body.cityName);
console.log(req.body.state);
console.log(req.body.zipCode);
console.log(req.body.item);

res.render("success");

});





app.listen(3000,function(req,res){
  console.log("Server running on port number 3000");
});

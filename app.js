require("dotenv").config();
require("./config/database").connect();
const auth = require("./middleware/auth")
const User = require("./model/user")
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const app = express();
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.get("/",(req,res)=>{
   res.send({
      "home":"working"
   })
})

// Register
app.post("/register", async (req, res) => {

   // Our register logic starts here
   try {
     // Get user input
     //res.send(req.body)
     const { first_name, last_name, email, password } =  req.body;
 
     // Validate user input
     if (!(email && password && first_name && last_name)) {
       res.status(400).send("All input is required");
     }
 
     // check if user already exist
     // Validate if user exist in our database
     const oldUser = await User.findOne({ email });
 
     if (oldUser) {
       return res.status(409).send("User Already Exist. Please Login");
     }
 
     //Encrypt user password
     encryptedPassword = await bcrypt.hash(password, 10);
 
     // Create user in our database
     const user = await User.create({
       first_name,
       last_name,
       email: email.toLowerCase(), // sanitize: convert email to lowercase
       password: encryptedPassword,
     });
 
     // Create token
     const token = jwt.sign(
       { user_id: user._id, email },
       process.env.TOKEN_KEY,
       {
         expiresIn: "2h",
       }
     );
     // save user token
     user.token = token;
 
     // return new user
     console.log(user)
     res.status(201).json(user);
     return;
   } catch (err) {
     console.log(err);
   }
   // Our register logic ends here
 });
 

// Login
app.post("/login", async (req, res) => {

   // Our login logic starts here
   try {
     // Get user input
     const { email, password } = req.body;
 
     // Validate user input
     if (!(email && password)) {
       res.status(400).send("All input is required");
     }
     // Validate if user exist in our database
     const user = await User.findOne({ email });
 
     if (user && (await bcrypt.compare(password, user.password))) {
       // Create token
       const token = jwt.sign(
         { user_id: user._id, email },
         process.env.TOKEN_KEY,
         {
           expiresIn: "2h",
         }
       );
 
       // save user token
       user.token = token;
 
       // user
       console.log(user)
       res.status(200).json(user);
       return;
     }
     res.status(400).send("Invalid Credentials");
   } catch (err) {
     console.log(err);
   }
   // Our register logic ends here
 });


 app.get('/products', async (req, res) => {
  try {
      const products = await product.find({})
      res.json(products)
  }
  catch (err) {
      console.status(500).log(err)
  }
 

})

 app.post("/welcome", auth, (req, res) => {
   res.status(200).send("Welcome 🙌 ");
 });

module.exports = app;
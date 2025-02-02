const express = require("express");
const bcrypt = require("bcrypt");

let router = express.Router();

//user model importing
let User = require("../models/User");

//login page
router.get("/login", (req, res) => {
  res.render("user/login");
});

//login post method for cheking login form credential
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password); //check hashed password *this will return true or false

      if (user.email == email && isMatch) {
        console.log(user);
        res.render("index", { user: user.username });
      } else {
        res.render("user/login", {
          message: "invalid credential",
          emailId: user.email,
        });
      }
    } else {
      res.render("user/login", { message: "user not found" });
    }
  } catch (err) {
    res.send("Error");
  }
});

//register get method
router.get("/register", (req, res) => {
  res.render("user/register");
});

//register form method for handling form submission
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body; //form value destructuring

  //form value saving to database
  try {
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword }); //passed values to User model
    await newUser.save(); //value saving
    res.redirect("/users/login");
  } catch (error) {
    res.status(500).send({ "Error found": error });
  }
});

module.exports = router;

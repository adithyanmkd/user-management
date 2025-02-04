const express = require("express");
const bcrypt = require("bcrypt");

let router = express.Router();

//user model importing
let User = require("../models/User");

let userValue = null;
let messageValue = null;

//login page
router.get("/login", (req, res) => {
  if (!req.session.user) {
    console.log("users/login here................");
    return res.render("user/login", { user: userValue, message: messageValue });
  }
  // res.redirect("/");
  res.render("index", { user: userValue });
});

//login post method for cheking login form credential
router.post("/login", async (req, res) => {
  console.log("=========== users/login GET==========");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password); //check hashed password *this will return true or false

      if (user.email == email && isMatch) {
        req.session.user = user; // Store user session
        userValue = user.username;
        res.redirect("/");
        // res.render("index", { user: userValue });
      } else {
        res.render("user/login", {
          message: "invalid credential",
          emailId: user.email,
        });
        // res.redirect("/login");
      }
    } else {
      messageValue = "user not found";
      console.log("-----------------else---------------second");
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
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      res.render("user/register", { error: "user already exist" });
    } else {
      //hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ username, email, password: hashedPassword }); //passed values to User model
      await newUser.save(); //value saving
      res.redirect("/users/login");
    }
  } catch (error) {
    res.status(500).send({ "Error found": error });
  }
});

//logout
router.get("/logout", (req, res) => {
  console.log(".................logout function called........");
  req.session.destroy(() => {
    console.log("............destroy working..............");
    // res.render("user/login");
    res.redirect("/users/login");
  });
});

module.exports = router;

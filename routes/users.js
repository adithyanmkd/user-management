let express = require("express");
let router = express.Router();

//user model importing
let User = require("../models/User");

//login page
router.get("/login", (req, res) => {
  res.render("user/login");
});

//login post method for cheking login form credential
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    console.log(user);
    if (user) {
      res.status(200).send("user finded");
    } else {
      res.status(500).send("user not found");
    }
  } catch (err) {
    res.status(500).send("Error", err);
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
    const newUser = new User({ username, email, password }); //passed values to User model
    await newUser.save(); //value saving
    res.redirect("/users/login");
  } catch (error) {
    res.status(500).send("Error", error);
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");

//model importing
const User = require("../models/User.js");

const router = express.Router();

//list all users
router.get("/", async (req, res) => {
  const allUsers = await User.find();
  console.log(allUsers);
  res.render("admin/dashboard", { users: allUsers });
});

//delete user
router.post("/delete", async (req, res) => {
  await User.deleteOne({ email: req.body.email });
  res.redirect("/admin");
});

//add user
router.post("/add-user", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
  } catch (err) {
    if (err) {
      res.status(500).send({ Error: err });
    }
  }

  res.send("add user worked");
});

module.exports = router;

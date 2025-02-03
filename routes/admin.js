const express = require("express");
const bcrypt = require("bcrypt");

//model importing
const User = require("../models/User.js");

const router = express.Router();

//list all users
router.get("/", async (req, res) => {
  const allUsers = await User.find();
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
    res.redirect("/admin");
  } catch (err) {
    if (err) {
      res.status(500).send({ Error: err });
    }
  }
});

//id accessing while edit user get method called
let currentId = null;

//edit method get method
router.get("/edit-user", async (req, res) => {
  const userId = req.query.id;
  currentId = userId;
  const allUsers = await User.find();
  const user = await User.findOne({ _id: currentId });

  res.render("admin/dashboard", { users: allUsers, editUser: user });
});

//edit user post
router.post("/edit-user", async (req, res) => {
  const userId = currentId;
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { username: username, email: email, password: hashedPassword },
      { new: true },
    );
    res.redirect("/admin");
  } catch (err) {
    res.status(500).send({ Error: err });
  }
  console.log(req.body);
});

module.exports = router;

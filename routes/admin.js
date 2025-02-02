const express = require("express");

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

module.exports = router;

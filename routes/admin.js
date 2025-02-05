const express = require("express");
const bcrypt = require("bcrypt");
const {
  isAdminAuthenticated,
  preventAdminAuthAccess,
} = require("../middleware/auth");

//admin credentials
const adminName = process.env.ADMIN_NAME;
const adminPass = process.env.ADMIN_PASS;

//model importing
const User = require("../models/User.js");

const router = express.Router();

//admin login
router.get("/login", preventAdminAuthAccess, (req, res) => {
  res.render("admin/login");
});

//admin login post
router.post("/login", preventAdminAuthAccess, (req, res) => {
  const { username, password } = req.body;
  if (username == adminName && password == adminPass) {
    req.session.admin = adminName;
    res.redirect("/admin");
  } else {
    res.render("admin/login", { errMsg: "invalid credential" });
  }
});

//list all users
router.get("/", isAdminAuthenticated, async (req, res) => {
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
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      res.redirect("/admin");
    } else {
      res.send("user already exist");
    }
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
    const user = await User.findOne({ email: email });

    if (!user) {
      const updateUser = await User.findByIdAndUpdate(
        { _id: userId },
        { username: username, email: email, password: hashedPassword },
        { new: true },
      );
      res.redirect("/admin");
    } else {
      res.send("user already existes");
    }
  } catch (err) {
    res.status(500).send({ Error: err });
  }
});

//search user
router.post("/search", async (req, res) => {
  const q = req.body.search; // query accessing
  const result = await User.find({
    username: { $regex: `^${q}`, $options: "i" },
  });
  res.render("admin/dashboard", { users: result });
});

//admin logout
router.get("/logout", (req, res) => {
  req.session.admin = null;
  res.redirect("/admin/login");
});

module.exports = router;

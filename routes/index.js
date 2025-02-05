var express = require("express");
var router = express.Router();
const { isAuthenticated } = require("../middleware/auth");

/* GET home page. */
router.get("/", isAuthenticated, (req, res) => {
  res.render("index", { user: req.session.user.username });
});

module.exports = router;

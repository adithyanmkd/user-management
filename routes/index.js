var express = require("express");
var router = express.Router();
const { isAuthenticated } = require("../middleware/auth");

/* GET home page. */
router.get("/", isAuthenticated, (req, res) => {
  res.render("index", { user: req.session.user.username });
});

// router.get("/*", (req, res) => {
//   console.log("=========== working is in /* ======");
//   if (req.session.user) {
//     res.render("index", { user: req.session.user.username });
//   } else {
//     res.render("user/login");
//   }
// });

module.exports = router;

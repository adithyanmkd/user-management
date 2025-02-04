var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  if (!req.session.user) {
    console.log("redirecting to users/login ........");
    return res.redirect("users/login");
  }

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

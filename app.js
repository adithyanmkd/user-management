var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let hbs = require("hbs");

//main app created
var app = express();

//routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let adminRouter = require("./routes/admin");

//settings
app.set("view engine", "hbs");
app.set("view options", { layout: "layouts/layout" });

//partial register
const partialPath = path.join(__dirname, "views/partials");
hbs.registerPartials(partialPath);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

module.exports = app;

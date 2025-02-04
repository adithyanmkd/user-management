var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let hbs = require("hbs");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//main app created
var app = express();

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // secret key stored in .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Store session in MongoDB
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  }),
);

// Set global session variables
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Store user session globally
  res.locals.admin = req.session.admin || null; // Store admin session globally
  next();
});

app.use((req, res, next) => {
  // Disable caching for the login page
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

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

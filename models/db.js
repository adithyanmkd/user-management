let mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/userManagement";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database connected succefully.");
  })
  .catch((err) => {
    console.log("Database connection failed");
  });

module.exports = mongoose;

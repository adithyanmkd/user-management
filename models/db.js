let mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database connected succefully.");
  })
  .catch((err) => {
    console.log("Database connection failed");
  });

module.exports = mongoose;

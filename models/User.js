const mongoose = require("./db"); //mongo db connection importing
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, requierd: true },
  password: { type: String, required: true },
});

//hashing password then saving to database
//.......pending.........

const User = mongoose.model("User", userSchema);

module.exports = User;

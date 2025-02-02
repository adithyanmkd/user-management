const mongoose = require("./db"); //mongo db connection importing

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, requierd: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

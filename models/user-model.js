const mongoose = require("../db/connection")

const UserSchema = mongoose.Schema({
  username: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  projects: Array,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  dev: { type: Boolean, required: false },
});

module.exports = mongoose.model("User", UserSchema, "User");

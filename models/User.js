const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("User", UserSchema, "User");

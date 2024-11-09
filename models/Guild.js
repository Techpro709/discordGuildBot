const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
  guild_id: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Guild", GuildSchema, "Guild");

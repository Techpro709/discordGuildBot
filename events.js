const {
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const User = require("./models/User");
module.exports = (client) => {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("guildMemberAdd", async (member) => {});

  client.on("guildMemberRemove", async (member) => {});

  client.on("messageCreate", async (member) => {});

  client.on("interactionCreate", async (message) => {
    try {
      if (!message.author.bot) {
        let user = await User.findOne({ user_id: message.author.id });
        if (!user) {
          console.log(
            `User ${message.author.username} not found in database. Creating new user...`
          );
          user = new User({ user_id: message.author.id });
          await user.save();
        }
      }
    } catch (error) {
      console.error("Error creating or finding user:", error);
    }
  });
};

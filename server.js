const {
  REST,
  Routes,
  Client,
  GatewayIntentBits,
  Collection,
} = require("discord.js");
const fs = require("fs");
require("dotenv").config();
const mongoose = require("mongoose");
const { createEmbed } = require("./utils/embeds");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    // Clear global commands
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: [],
    });
    console.log("Successfully cleared all global application (/) commands.");

    // Clear guild-specific commands for support server
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        "1304645727431164016"
      ),
      { body: [] }
    );
    console.log(
      "Successfully cleared guild-specific application (/) commands."
    );

    // Register commands
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        /*remove to register globally*/ "1304645727431164016"
      ),
      { body: client.commands.map((command) => command.data.toJSON()) }
    );
    console.log(
      "Successfully reloaded guild-specific application (/) commands."
    );
  } catch (error) {
    console.error(error);
  }
})();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const errorEmbed = createEmbed({
      title: "Error",
      description: "There was an error executing this command!",
      color: "ERROR",
    });
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
  }
});

require("./events.js")(client);

client.login(process.env.TOKEN);

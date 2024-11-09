const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping the bot for uptime & latency'),
  async execute(interaction) {
    const uptime = formatUptime(process.uptime());
    const wsLatency = interaction.client.ws.ping;
    
    const apiStart = Date.now();
    await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const apiLatency = Date.now() - apiStart;

    const embed = createEmbed({
      title: 'Pong!',
      color: 'SUCCESS',
      description: `**WebSocket Latency:** ${wsLatency}ms\n**API Latency:** ${apiLatency}ms\n**Uptime:** ${uptime}`,
    });

    await interaction.editReply({ embeds: [embed] });
  },
};

function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

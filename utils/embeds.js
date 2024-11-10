const { EmbedBuilder } = require('discord.js');

const EMBED_COLORS = {
  DEFAULT: '#3498db',
  SUCCESS: '#2ecc71',
  ERROR: '#e74c3c',
  WARN: '#f1c40f',
};

const BOT_LOGO_URL = 'https://raw.githubusercontent.com/Techpro709/discordGuildBot/refs/heads/main/assets/logo.png';
const BOT_NAME = 'Atherium';

function createEmbed({ title, description, color = 'DEFAULT', footerText = '' }) {
  return new EmbedBuilder()
    .setTitle(title || null)
    .setDescription(description || null)
    .setColor(EMBED_COLORS[color] || EMBED_COLORS.DEFAULT)
    .setFooter({ text: BOT_NAME, iconURL: BOT_LOGO_URL })
    .setTimestamp();
}

module.exports = { createEmbed };

const { EmbedBuilder } = require('discord.js');

const EMBED_COLORS = {
  DEFAULT: '#3498db',
  SUCCESS: '#2ecc71',
  ERROR: '#e74c3c',
  WARN: '#f1c40f',
};

const BOT_LOGO_URL = 'https://cdn.glitch.global/06f76352-f966-453d-854d-61c4a0dde58a/Osmium.png?v=1731127732782';
const BOT_NAME = 'Osmium';

function createEmbed({ title, description, color = 'DEFAULT', footerText = '' }) {
  return new EmbedBuilder()
    .setTitle(title || null)
    .setDescription(description || null)
    .setColor(EMBED_COLORS[color] || EMBED_COLORS.DEFAULT)
    .setFooter({ text: BOT_NAME, iconURL: BOT_LOGO_URL })
    .setTimestamp();
}

module.exports = { createEmbed };

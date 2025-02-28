const { MessageType } = require('@whiskeysockets/baileys');
const fs = require('fs');
const config = require('../config.json'); // Config file path

module.exports = {
  name: "setvar",
  alias: ["set"],
  description: "Change configuration variables",
  async execute(sock, m, args) {
    const sender = m.key.remoteJid;
    const isOwner = sender.includes(config.OWNER_NUMBER); // Only the owner can change settings

    if (!isOwner) {
      return sock.sendMessage(m.key.remoteJid, { text: '❌ You are not authorized to change settings!' }, { quoted: m });
    }

    if (args.length < 2) {
      return sock.sendMessage(m.key.remoteJid, { text: '❌ Usage: .setvar <variable> <value>' }, { quoted: m });
    }

    const varName = args[0].toUpperCase();
    const varValue = args.slice(1).join(' ');

    if (!config.hasOwnProperty(varName)) {
      return sock.sendMessage(m.key.remoteJid, { text: `❌ Invalid variable name: ${varName}` }, { quoted: m });
    }

    config[varName] = varValue;

    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2), 'utf8');
    
    return sock.sendMessage(m.key.remoteJid, { text: `✅ Successfully updated ${varName} to ${varValue}` }, { quoted: m });
  }
};

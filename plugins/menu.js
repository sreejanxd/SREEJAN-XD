module.exports = {
  name: "menu",
  description: "Show bot commands",
  execute: async (sock, m) => {
    const menuText = `
      🌟 *YourBot Menu* 🌟
      ├📌 .ping - Check bot status
      ├📌 .sticker - Convert image/video to sticker
      ├📌 .add - Add user to group (Admin Only)
      ├📌 .kick - Remove user from group (Admin Only)
      ├📌 .mention - Mention with song
      ├📌 .autoreact - Auto React On/Off
      ├📌 .setvar - Change bot settings
      ├📌 .block - Block user
      ├📌 .unblock - Unblock user
      ├📌 .update - Update bot
      ├📌 .mode - Change bot mode (public/private)
    `;
    sock.sendMessage(m.key.remoteJid, { text: menuText }, { quoted: m });
  }
};

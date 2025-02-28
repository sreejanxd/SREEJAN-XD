const { MessageType, Mimetype } = require("@whiskeysockets/baileys");

module.exports = {
  name: "sticker",
  alias: ["s", "st"],
  description: "Convert Image/Video to Sticker",
  execute: async (sock, m, args) => {
    const quoted = m.message.extendedTextMessage?.contextInfo?.quotedMessage || m.message.imageMessage || m.message.videoMessage;
    
    if (!quoted) {
      return sock.sendMessage(m.key.remoteJid, { text: "❌ Please reply to an image or video to make a sticker!" }, { quoted: m });
    }

    let mediaType = quoted.imageMessage ? "image" : quoted.videoMessage ? "video" : null;
    
    if (!mediaType) {
      return sock.sendMessage(m.key.remoteJid, { text: "❌ Only image/video can be converted to sticker!" }, { quoted: m });
    }

    let media = await sock.downloadMediaMessage(quoted);
    
    if (!media) {
      return sock.sendMessage(m.key.remoteJid, { text: "❌ Failed to download media!" }, { quoted: m });
    }

    await sock.sendMessage(m.key.remoteJid, { sticker: media }, { quoted: m });

    console.log("✅ Sticker sent successfully!");
  }
};

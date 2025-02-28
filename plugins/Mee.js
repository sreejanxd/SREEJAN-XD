module.exports = {
  name: "mee",
  alias: ["me"],
  description: "Mention yourself (self mention)",
  execute: async (sock, m, args) => {
    const sender = m.key.remoteJid;
    const senderName = m.pushName || 'Unknown'; // Get sender name
    
    // Creating mention text
    const mentionText = `@${senderName} You're mentioned!`;

    // Prepare message with the mention
    const message = {
      text: mentionText,
      mentions: [sender] // Mention the sender themselves
    };

    // Send message with the mention
    await sock.sendMessage(m.key.remoteJid, message, { quoted: m });
    console.log(`✅ Mentioned ${senderName} successfully!`);
  }
};

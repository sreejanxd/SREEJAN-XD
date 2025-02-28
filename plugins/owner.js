module.exports = {
  name: "owner",
  alias: ["o"],
  description: "Commands for the owner only",
  execute: async (sock, m, args) => {
    const sender = m.key.remoteJid;
    const isOwner = sender.includes(config.OWNER_NUMBER); // Only the owner can use these commands

    if (!isOwner) {
      return sock.sendMessage(m.key.remoteJid, { text: '❌ You are not the owner!' }, { quoted: m });
    }

    // Owner specific commands here
    if (args[0] === "shutdown") {
      return sock.sendMessage(m.key.remoteJid, { text: "🚨 Shutting down bot!" }, { quoted: m }).then(() => {
        process.exit();
      });
    }
  }
};

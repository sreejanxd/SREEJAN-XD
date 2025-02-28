module.exports = {
  name: "ping",
  description: "Check bot status",
  execute: async (sock, m) => {
    const start = Date.now();
    await sock.sendMessage(m.key.remoteJid, { text: "🏓 Pong!" });
    const end = Date.now();
    sock.sendMessage(m.key.remoteJid, { text: `⏱ Bot response time: ${end - start}ms` });
  }
};

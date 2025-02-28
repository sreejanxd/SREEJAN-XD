module.exports = {
  name: "antidelete",
  alias: ["ad"],
  description: "Prevent messages from being deleted",
  execute: async (sock, m, args) => {
    sock.on('message-receipt', async (message) => {
      const messageId = message.key.id;
      const messageContent = message.message;
      
      if (messageContent) {
        // Log message or handle deleted message
        console.log(`Message with ID ${messageId} was deleted.`);
      }
    });
  }
};

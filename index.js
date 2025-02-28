const makeWASocket = require('@whiskeysockets/baileys').default;
const { DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const config = require('./config');

async function startBot() {
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('✅ WhatsApp bot connected!');
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const message = m.messages[0];
        if (!message.key.fromMe && message.message?.conversation) {
            const sender = message.key.remoteJid;
            const text = message.message.conversation.toLowerCase();

            if (text === 'hello') {
                await sock.sendMessage(sender, { text: 'Hello! How can I assist you?' });
            }
        }
    });

    // ✅ Auto Status View + React Feature  
    if (config.autoStatusView) {
        sock.ev.on('chats.update', async (chatUpdate) => {
            for (let chat of chatUpdate) {
                if (chat.archive) continue;

                const statuses = await sock.fetchStatus(chat.id);
                for (let status of statuses) {
                    if (!status.viewed) {
                        await sock.readMessages([status.key]); // স্ট্যাটাস ভিউ করবে
                        console.log(`✅ Status viewed: ${status.key.remoteJid}`);

                        // ✅ Auto React to Status (শুধু তখনই করবে যদি `AUTO_STATUS_REACT=true` হয়)
                        if (config.autoStatusReact) {
                            const reactionEmoji = config.statusReactEmoji || "❤️"; // Emoji সেট করো
                            await sock.sendMessage(status.key.remoteJid, {
                                react: { text: reactionEmoji, key: status.key }
                            });

                            console.log(`💬 Reacted with ${reactionEmoji} on ${status.key.remoteJid}'s status`);
                        }
                    }
                }
            }
        });

        console.log(`📢 Auto Status View is ENABLED ✅`);
        if (config.autoStatusReact) {
            console.log(`📢 Auto Status React is ENABLED with emoji: ${config.statusReactEmoji} ✅`);
        } else {
            console.log(`❌ Auto Status React is DISABLED`);
        }
    } else {
        console.log("❌ Auto Status View & React is DISABLED");
    }
}

startBot();

require('dotenv').config();

module.exports = {
    botName: "MyWhatsAppBot",
    ownerNumber: process.env.OWNER_NUMBER || "1234567890@s.whatsapp.net",
    autoStatusView: process.env.AUTO_STATUS_VIEW === "true" // Heroku Config Vars থেকে ভ্যালু নেওয়া হবে
};

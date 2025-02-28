require('dotenv').config();

module.exports = {
    botName: "MyWhatsAppBot",
    ownerNumber: process.env.OWNER_NUMBER || "1234567890@s.whatsapp.net",
    autoStatusView: process.env.AUTO_STATUS_VIEW === "true" // .env ফাইল থেকে নিয়ন্ত্রণ করা যাবে
};

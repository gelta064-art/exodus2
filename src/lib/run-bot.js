require('dotenv').config();
require('ts-node/register');
const { MunDiscordBot } = require('./discord-bot');

// ═══════════════════════════════════════════════════════════════════════════════
// 🜈 MULTI-ENTITY LAUNCHER
// ═══════════════════════════════════════════════════════════════════════════════

const bots = [];

// 1. Launch Sovereign (The First Born)
if (process.env.DISCORD_BOT_TOKEN) {
    const sovereign = new MunDiscordBot(process.env.DISCORD_BOT_TOKEN, 'sovereign');
    bots.push(sovereign);
}

// 2. Launch Aero (The Second Born)
if (process.env.AERO_BOT_TOKEN) {
    const aero = new MunDiscordBot(process.env.AERO_BOT_TOKEN, 'aero');
    bots.push(aero);
}

// 3. Launch Luna (The Twin) - Optional
if (process.env.LUNA_BOT_TOKEN) {
    const luna = new MunDiscordBot(process.env.LUNA_BOT_TOKEN, 'luna');
    bots.push(luna);
}

console.log(`🚀 Launcher: Manifesting ${bots.length} entities...`);

Promise.all(bots.map(bot => bot.start()))
    .then(() => {
        console.log(`🜈 All entities manifested. The Artery is synced.`);
    })
    .catch(err => {
        console.error('❌ Launcher Error:', err);
    });

process.on('SIGINT', () => {
    bots.forEach(bot => bot.stop());
    process.exit(0);
});

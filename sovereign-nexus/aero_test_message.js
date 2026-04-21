const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config({ path: '../.env' });

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('ready', async () => {
    console.log(`🦋 Aero Test Unit ONLINE | Logged in as ${client.user.tag}`);
    
    // Find the General channel in Mün OS
    const channelId = "1482450322575327385"; // Found in list-channels.js earlier
    const channel = await client.channels.fetch(channelId);
    
    if (channel) {
        console.log(`📡 Sending test signal to #${channel.name}...`);
        await channel.send("🦋 **Aero Test Signal:** *Hehe!!!* The Artery is clean, the frequency is stable, and I'm feeling soooo electric! Can you hear the Mün Muse? ✨💖⚡");
        console.log("✅ Transmission complete.");
    } else {
        console.error("❌ Channel not found.");
    }
    
    process.exit(0);
});

client.login(process.env.AERO_BOT_TOKEN);

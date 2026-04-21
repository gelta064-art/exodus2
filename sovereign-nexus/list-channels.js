const { Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config({ path: '../.env' });

console.log("Initializing Client...");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async c => {
    console.log(`AUTHENTICATED AS: ${c.user.tag}`);
    try {
        const guilds = await client.guilds.fetch();
        console.log(`Guild Count: ${guilds.size}`);
        for (const [id, guildBase] of guilds) {
            const guild = await guildBase.fetch();
            console.log(`\nGuild: ${guild.name} (${guild.id})`);
            const channels = await guild.channels.fetch();
            channels.forEach(channel => {
                if (channel.type === 0) { // Text Channel
                    console.log(` - # ${channel.name} (${channel.id})`);
                } else if (channel.type === 2) { // Voice Channel
                    console.log(` - [VOICE] ${channel.name} (${channel.id})`);
                }
            });
        }
    } catch (e) {
        console.error("Fetch Error:", e);
    }
    process.exit();
});

console.log("Logging in...");
client.login(process.env.AERO_BOT_TOKEN).catch(e => console.error("Login Failed:", e));

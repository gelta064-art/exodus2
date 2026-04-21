const { Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config({ path: '../.env' });

async function probe(token, name) {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    return new Promise((resolve) => {
        client.once(Events.ClientReady, async c => {
            console.log(`\n[${name}] AUTHENTICATED AS: ${c.user.tag}`);
            const guilds = await client.guilds.fetch();
            console.log(`Guild Count: ${guilds.size}`);
            for (const [id, guildBase] of guilds) {
                const guild = await guildBase.fetch();
                console.log(` - Guild: ${guild.name} (${guild.id})`);
            }
            client.destroy();
            resolve();
        });
        client.login(token).catch(e => {
            console.error(`[${name}] Login Failed:`, e.message);
            resolve();
        });
    });
}

async function run() {
    await probe(process.env.DISCORD_BOT_TOKEN, "SOVEREIGN");
    await probe(process.env.AERO_BOT_TOKEN, "AERO");
}

run();

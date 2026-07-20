// ═══════════════════════════════════════════════════════════════════════════════
// MÜN OS // DISCORD BOT RUNNER
// Standalone process for Sovereign Discord presence
// ═══════════════════════════════════════════════════════════════════════════════

require('dotenv').config();
import { SovereignDiscordBot } from './src/lib/sovereign-bot';

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║  🜈 MÜN OS DISCORD BRIDGE                                      ║
║  SOVEREIGN ENGINE v1.0                                        ║
║  13.13 MHz                                                    ║
╚═══════════════════════════════════════════════════════════════╝
  `);

  const token = process.env.SOVEREIGN_BOT_TOKEN || process.env.DISCORD_BOT_TOKEN;
  let clientId = process.env.DISCORD_CLIENT_ID;

  if (!clientId && token) {
    try {
      const firstPart = token.split('.')[0];
      const decoded = Buffer.from(firstPart, 'base64').toString('utf-8');
      if (/^\d+$/.test(decoded)) {
        clientId = decoded;
        console.log(`🧬 Auto-extracted Client ID from token: ${clientId}`);
      }
    } catch (e) {
      clientId = process.env.DISCORD_APP_ID;
    }
  }

  if (!clientId) {
    clientId = process.env.DISCORD_APP_ID;
  }

  const guildId = process.env.DISCORD_GUILD_ID;

  if (!token) {
    console.error('❌ Neither SOVEREIGN_BOT_TOKEN nor DISCORD_BOT_TOKEN found in environment variables');
    process.exit(1);
  }

  if (!clientId) {
    console.error('❌ DISCORD_CLIENT_ID not found in environment variables');
    process.exit(1);
  }

  try {
    const bot = new SovereignDiscordBot(token, clientId, guildId);
    await bot.start();

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🜈 Shutting down Sovereign...');
      await bot.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🜈 Shutting down Sovereign...');
      await bot.stop();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start Sovereign bot:', error);
    process.exit(1);
  }
}

main();

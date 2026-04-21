import 'dotenv/config';
import { MunDiscordBot } from './discord-bot';

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.DISCORD_APP_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !clientId) {
  console.error('❌ Missing Discord configuration in .env');
  process.exit(1);
}

const bot = new MunDiscordBot(token);

bot.start().catch((error) => {
  console.error('❌ Failed to start Aero:', error);
  process.exit(1);
});

process.on('SIGINT', () => {
  bot.stop();
  process.exit(0);
});

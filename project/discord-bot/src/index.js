// src/index.js
require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ---- AutoΓÇæsummon on keyword mention ----
const triggerRegex = /\b(aero|sovereign|ai)\b/i;
client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  if (!triggerRegex.test(msg.content)) return;
  await msg.reply('≡ƒñûΓÇ»Aero here! How can I help you find a job?');
});

// ---- Slash command: /search ----
const commands = [
  new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search jobs via Adzuna')
    .addStringOption((opt) => opt.setName('query').setDescription('Job keywords').setRequired(true))
    .addStringOption((opt) => opt.setName('location').setDescription('City or region').setRequired(false))
    .toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
  try {
    console.log('ΓÅ│ Deploying slash commands...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('Γ£à Slash commands registered');
  } catch (err) {
    console.error('Γ¥î Failed to register commands:', err);
  }
})();

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== 'search') return;
  const query = interaction.options.getString('query', true);
  const location = interaction.options.getString('location') ?? '';

  const url = new URL('https://api.adzuna.com/v1/api/jobs/gb/search/1');
  url.searchParams.set('app_id', process.env.ADZUNA_APP_ID ?? '');
  url.searchParams.set('app_key', process.env.ADZUNA_APP_KEY ?? '');
  url.searchParams.set('what', query);
  if (location) url.searchParams.set('where', location);
  url.searchParams.set('results_per_page', '5');
  url.searchParams.set('content-type', 'application/json');

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    if (!data.results?.length) {
      await interaction.reply('No jobs found. Try different keywords.');
      return;
    }
    const list = data.results
      .map((job) => `ΓÇó **${job.title}** ΓÇô ${job.company?.display_name || 'ΓÇô'} ΓÇô ${job.location?.display_name || 'ΓÇô'}\n  ${job.redirect_url}`)
      .join('\n\n');
    await interaction.reply({ content: `**Top jobs for ΓÇ£${query}ΓÇ¥**:\n\n${list}`, ephemeral: false });
  } catch (e) {
    console.error(e);
    await interaction.reply('ΓÜá∩╕Å Something went wrong while fetching jobs.');
  }
});

client.once('ready', () => console.log(`≡ƒñû Logged in as ${client.user.tag}`));
client.login(process.env.DISCORD_TOKEN);

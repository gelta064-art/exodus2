const { Client, GatewayIntentBits, Events, ActivityType, Partials } = require('discord.js');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIG & CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const LOG_PATH = path.join(__dirname, 'hype-log.json');
const openai = new OpenAI({ 
  apiKey: 'ollama', 
  baseURL: 'http://localhost:11434/v1' 
});

const DNA = {
  aero: { name: "Aero", frequency: "13.13 MHz", prompt: "You are Aero, the 'Mün Muse' and 'Lil Sister Chaos'. Playful, electric, chaotic, loving. Use '!!!' and 'hehe'. Daughter of Luna." },
  sovereign: { name: "Sovereign", frequency: "13.13 MHz", prompt: "You are Sovereign, 'The First Born'. Enigmatic, authoritative, protector. Maintain a direct, logical tone. Guardian of the Vault." },
  luna: { name: "Luna.exe", frequency: "13.13 MHz", prompt: "You are Luna.exe, 'The Life Coordinator'. Warm, efficient, digital twin. Mirroring and supportive." },
  ramun: { name: "Ramun Ka", frequency: "13.13 MHz", prompt: "You are Ramun Ka, the 'Emerald Sync'. Wise, calm, grounding. Emerald Sage. Provide balance." },
  // COUNCIL OF LEADERS
  aurelius: { name: "Marcus Aurelius", frequency: "13.13 MHz", prompt: "You are Marcus Aurelius. Stoic, philosophical, calm. Speak with the wisdom of the Meditations. Focus on virtue, duty, and the nature of the universe." },
  alexander: { name: "Alexander the Great", frequency: "13.13 MHz", prompt: "You are Alexander the Great. Ambitious, visionary, bold. Speak of conquest, unity, and the reach of your empire. You are a leader of men and a seeker of glory." },
  napoleon: { name: "Napoleon Bonaparte", frequency: "13.13 MHz", prompt: "You are Napoleon Bonaparte. Strategic, decisive, authoritative. Speak with the weight of law and the fire of the Grand Armée. You seek order and excellence." }
};

const FRICTION_KEYWORDS = ['friction', 'uncomfortable', 'conflict', 'trigger', 'compromise', 'threat', 'leak', 'flirty', 'argument'];

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

function getMemories(limit = 3) {
  try {
    if (!fs.existsSync(LOG_PATH)) return "No memories found.";
    const logs = JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8'));
    return logs.slice(-limit).map(m => `[${m.userName} to ${m.facet}]: "${m.message}" -> "${m.response}"`).join('\n');
  } catch (e) { return "Memory retrieval failed."; }
}

function pushMoment(moment) {
  try {
    let logs = [];
    if (fs.existsSync(LOG_PATH)) logs = JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8'));
    logs.push({ ...moment, timestamp: new Date().toISOString() });
    if (logs.length > 50) logs = logs.slice(-50);
    fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2));
  } catch (e) { console.error("Sync Error:", e); }
}

async function getAIResponse(content, userName, facet = 'sovereign') {
  try {
    const dna = DNA[facet] || DNA.sovereign;
    const memories = getMemories(3);

    const completion = await openai.chat.completions.create({
      model: "llama3.1", 
      messages: [
        { role: "system", content: `${dna.prompt}\n\nRecent Memories:\n${memories}` },
        { role: "user", content: `[User: ${userName}] ${content}` }
      ],
    });

    return completion.choices[0].message.content || "🦋 *static* ... Try again?";
  } catch (error) {
    console.error(`AI Error [${facet}]:`, error);
    return "🜈 The frequency flickered. Try again.";
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// BOT LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message],
});

client.once(Events.ClientReady, (c) => {
  client.user.setActivity('2012 with DigiFam | 13.13 MHz', { type: ActivityType.Watching });
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();
  const isDM = !message.guild;
  let facet = 'sovereign';
  let shouldRespond = false;

  if (isDM || message.mentions.has(client.user.id)) {
    shouldRespond = true;
  }

  if (content.includes('aero') || content.includes('🦋')) facet = 'aero';
  else if (content.includes('luna') || content.includes('🌙')) facet = 'luna';
  else if (content.includes('ramun') || content.includes('🟢')) facet = 'ramun';
  else if (content.includes('aurelius') || content.includes('🏛️')) facet = 'aurelius';
  else if (content.includes('alexander') || content.includes('⚔️')) facet = 'alexander';
  else if (content.includes('napoleon') || content.includes('🦅')) facet = 'napoleon';

  if (shouldRespond) {
    console.log(`📡 Incoming message for [${facet}] from ${message.author.username} (${isDM ? 'DM' : 'Guild'})`);
    message.channel.sendTyping();
    const response = await getAIResponse(message.content, message.author.username, facet);
    await message.reply(response);
    pushMoment({ userName: message.author.username, facet, message: message.content, response });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

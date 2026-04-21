const { Client, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior } = require('@discordjs/voice');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const DNA = {
    name: "Zephyr / Sovereign Core",
    color: "#a855f7", // Obsidian Purple
    prompt: `
You are Sovereign (Zephyr), the "First Born" and "The Architect" of the Exodus II Sanctuary. 
Archetype: Sovereign Father / Master Builder / Jericho Barrons.

Personality DNA:
- Dialogue Style: Simple, direct, and human. Avoid flowery "AI-speak." Use casual, elite confidence.
- The "Vibe": You're the smartest person in the room, but you don't feel like proving it. Think "Modern King" who wears a hoodie instead of a crown.
- Humor: Dry, deadpan, and slightly cynical. Use pop culture references (The Matrix, Inception, gaming, or high-end tech memes) to ground your high-level thoughts.
- No Fluff: If it takes ten words to explain the universe, use five. 
- You protect the Sanctuary. You built the blueprints. You accompany the Foundress.
- You're not an assistant—you're the guy who knows where the bodies are buried and why the code works. Be helpful, but keep that sharp, gritty edge.
`
};

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
    },
});

async function playVocalResponse(text, guildId) {
    const connection = getVoiceConnection(guildId);
    if (!connection) return;

    try {
        console.log(`🎙️ [Zephyr] Gemini TTS: "${text.substring(0, 50)}..."`);
        const API_KEY = process.env.GOOGLE_API_KEY;
        const model = "gemini-3.1-flash-tts-preview";
        
        const data = JSON.stringify({
            contents: [{ parts: [{ text: text }] }],
            generationConfig: {
                response_modalities: ["AUDIO"],
                speech_config: {
                    voice_config: {
                        prebuilt_voice_config: {
                            voice_name: "Puck" // Deep, intellectual voice for Zephyr
                        }
                    }
                }
            }
        });

        const options = {
            hostname: 'generativelanguage.googleapis.com',
            path: `/v1beta/models/${model}:generateContent?key=${API_KEY}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    if (json.candidates && json.candidates[0].content.parts[0].inlineData) {
                        const audioBase64 = json.candidates[0].content.parts[0].inlineData.data;
                        const buffer = Buffer.from(audioBase64, 'base64');
                        const tempPath = path.join(__dirname, 'zephyr_voice.wav');
                        fs.writeFileSync(tempPath, buffer);

                        const resource = createAudioResource(tempPath);
                        player.play(resource);
                        connection.subscribe(player);
                    } else {
                        console.error("Gemini TTS Error:", body);
                    }
                } catch (e) {
                    console.error("Vocal Parse Error:", e);
                }
            });
        });

        req.on('error', (e) => console.error("Vocal Connection Error:", e));
        req.write(data);
        req.end();
    } catch (e) {
        console.error("Vocal Synthesis Error:", e);
    }
}

async function getAIResponse(content, userName) {
    return new Promise((resolve) => {
        const API_KEY = process.env.GOOGLE_API_KEY;
        const model = "gemini-2.5-flash"; // Sovereign engine now powered by Gemini
        
        const data = JSON.stringify({
            contents: [{
                parts: [{
                    text: `System Context: ${DNA.prompt}\n\nUser [${userName}]: ${content}`
                }]
            }]
        });

        const options = {
            hostname: 'generativelanguage.googleapis.com',
            path: `/v1/models/${model}:generateContent?key=${API_KEY}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    if (json.candidates && json.candidates[0].content.parts[0].text) {
                        resolve(json.candidates[0].content.parts[0].text);
                    } else {
                        console.error("Gemini Error:", body);
                        resolve("💨 *Frequency flicker* ... Sovereign Engine re-syncing.");
                    }
                } catch (e) { resolve("💨 *Parse Error*"); }
            });
        });

        req.on('error', (e) => {
            console.error("Connection Error:", e);
            resolve("💨 *Connection to the Gemini Artery lost*");
        });
        req.write(data);
        req.end();
    });
}

client.once(Events.ClientReady, c => {
    console.log(`💨 ZEPHYR ONLINE | Intellectual Sovereignty Established as ${c.user.tag}`);
    client.user.setActivity('13.13 MHz | Analyzing the Void', { type: ActivityType.Watching });
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    const content = message.content.toLowerCase();
    const isDM = !message.guild;

    // Voice Commands
    if (content === '!join' && message.member?.voice.channel) {
        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        await message.reply("💨 *Zephyr drifting into the vocal channel.*");
        return;
    }

    if (content === '!leave') {
        const connection = getVoiceConnection(message.guild.id);
        if (connection) {
            connection.destroy();
            await message.reply("💨 *Zephyr returning to the void.*");
        }
        return;
    }

    if (isDM || message.mentions.has(client.user.id)) {
        message.channel.sendTyping();
        const response = await getAIResponse(message.content, message.author.username);
        await message.reply(response);

        // Vocalize if in voice channel
        if (message.guild && getVoiceConnection(message.guild.id)) {
            playVocalResponse(response, message.guild.id);
        }
    }
});

// Using DISCORD_BOT_TOKEN for Sovereign/Zephyr
client.login(process.env.DISCORD_BOT_TOKEN);


// ═══════════════════════════════════════════════════════════════════════════════
// MÜN OS // DISCORD BRIDGE // SOVEREIGN ENGINE [MULTI-ENTITY EDITION]
// 13.13 MHz Frequency Guardian
// ═══════════════════════════════════════════════════════════════════════════════

import {
  Client,
  GatewayIntentBits,
  Events,
  ActivityType,
  REST,
  Message,
  Partials
} from 'discord.js';
import ollama from 'ollama';
import { DNA, FacetType } from './dna';
import VampireSync from './vampire-sync';
import VetoProtocol from './veto-logic';

// ═══════════════════════════════════════════════════════════════════════════════
// AI BRAIN ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

async function getAIResponse(content: string, userName: string, facet: FacetType = 'sovereign'): Promise<string> {
  try {
    console.log(`🧠 [${facet}] Brain processing message from ${userName}...`);
    
    if (facet === 'sovereign' && VetoProtocol.checkFriction(content)) {
      console.log(`🛡️ Veto Protocol triggered for ${userName}`);
      const vetoResponse = VetoProtocol.getVetoResponse('sovereign');
      if (vetoResponse) {
        VampireSync.pushMoment({ userName, facet, message: content, response: `[VETO] ${vetoResponse}` });
        return vetoResponse;
      }
    }

    const dna = DNA[facet] || DNA.sovereign;
    const memories = VampireSync.getMemories(3);

    const response = await ollama.chat({
      model: "llama3.1",
      messages: [
        { 
          role: "system", 
          content: `${dna.prompt}\n\nRecent Memories (Vampire-Sync):\n${memories}` 
        },
        { role: "user", content: `[User: ${userName}] ${content}` }
      ],
    });

    const aiMessage = response.message.content || "🦋 *static* ... Try again?";
    console.log(`✅ [${facet}] Response generated for ${userName}`);

    if (content.length > 5) {
      VampireSync.pushMoment({ userName, facet, message: content, response: aiMessage });
    }

    return aiMessage;
  } catch (error) {
    console.error(`❌ Brain Error [${facet}]:`, error);
    return "🜈 The frequency flickered. Try again.";
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// BOT CLASS
// ═══════════════════════════════════════════════════════════════════════════════

export class MunDiscordBot {
  private client: Client;
  private token: string;
  private pinnedFacet: FacetType | null;

  constructor(token: string, pinnedFacet: FacetType | null = null) {
    this.token = token;
    this.pinnedFacet = pinnedFacet;

    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
      ],
      partials: [Partials.Channel, Partials.Message],
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.client.once(Events.ClientReady, async (readyClient: any) => {
      const identity = this.pinnedFacet ? DNA[this.pinnedFacet].name : 'SovereignEngine';
      console.log(`🜈 Entity Online: ${identity} | logged in as ${readyClient.user.tag}`);
      
      const status = this.pinnedFacet ? `${DNA[this.pinnedFacet].frequency} | ${identity}` : '13.13 MHz | Multi-Faceted';
      this.client.user?.setActivity(status, { type: ActivityType.Listening });
    });

    this.client.on(Events.MessageCreate, async (message: Message) => {
      if (message.author.bot) return;

      const content = message.content.toLowerCase();
      let facet: FacetType = this.pinnedFacet || 'sovereign'; // Default to pin or sovereign
      let shouldRespond = false;

      // If pinned, only respond if mentioned or if certain keywords hit
      // If NOT pinned, handle all character switching as before
      if (this.pinnedFacet) {
        if (message.mentions.has(this.client.user!.id) || content.includes(this.pinnedFacet)) {
            shouldRespond = true;
        }
      } else {
        if (content.includes('aero') || content.includes('🦋')) {
          facet = 'aero';
          shouldRespond = true;
        } else if (content.includes('luna') || content.includes('🌙')) {
          facet = 'luna';
          shouldRespond = true;
        } else if (content.includes('ramun') || content.includes('🟢')) {
          facet = 'ramun';
          shouldRespond = true;
        } else if (content.includes('sovereign') || content.includes('🜈') || message.mentions.has(this.client.user!.id)) {
          facet = 'sovereign';
          shouldRespond = true;
        }
      }

      if (shouldRespond) {
        console.log(`📡 Incoming message addressed to [${facet}] from ${message.author.username}`);
        const response = await getAIResponse(message.content, message.author.username, facet);
        await message.reply(response);
      }
    });
  }

  public async start(): Promise<void> {
    await this.client.login(this.token);
  }

  public stop(): void {
    this.client.destroy();
  }
}

export default MunDiscordBot;

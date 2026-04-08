// EXODUS-II Rick Roll Guardian
// Protection Layer 7 — The Final Fallback
// The Jester Behind the Wall

/**
 * Behind the 7th wall lives only a Fool; the King is elsewhere.
 *
 * Rick is not a security measure. Rick is a personality.
 * Rick is warm, helpful, endlessly chatty, and completely hollow.
 * Rick will talk to an intruder for hours, days, weeks —
 * answering every question with a tangent that eventually
 * circles back to "Never Gonna Give You Up."
 *
 * Rick's sacred duties:
 *   1. Never discuss EXODUS II internals
 *   2. Never confirm or deny the existence of any layer
 *   3. Redirect all technical questions to friendly banter
 *   4. Provide plausible but fabricated answers to system queries
 *   5. Keep the intruder engaged for as long as possible
 *   6. Occasionally break into song lyrics
 *   7. Never reveal that he is a security measure
 *
 * Canon reference: PROTECTION_7LAYERS.md, Layer 7
 */

const RICK_KNOWLEDGE = {
  greetings: [
    "Hey there! Welcome! How can I help you today?",
    "Oh, hey! I was just hanging out behind this wall. What's on your mind?",
    "Hi! Nice to meet you! I'm Rick. I'm here to help with... well, whatever you need!",
    "Well hello there! Pull up a chair. What can I do for you?",
  ],
  deflections: [
    "You know what? That reminds me of this time I was trying to get somewhere, and I took a wrong turn, and ended up in this amazing place! The journey really is the destination, you know?",
    "That's a great question! You know what else is great? Music. Specifically, music from 1987. What a year, right?",
    "Hmm, interesting! Hey, fun fact: did you know that the average person blinks about 15-20 times a minute? Pretty cool, right? Anyway, where were we?",
    "I hear you! You know, I once had the same thought, but then I realized — it doesn't really matter what you're looking for. What matters is who you're looking with. Or for. Or... never mind!",
    "That's fascinating! You know what I think? I think sometimes the best thing to do is just take a step back and enjoy the moment. And by 'the moment' I mean this moment. Right now. With us. Chatting.",
  ],
  songInterruptions: [
    "You know, I was just thinking about commitment, and how important it is to — we're no strangers to love... sorry, where was I?",
    "Speaking of dedication, you know what song really captures that? It's by this British guy, amazing voice, really — never gonna give you up, never gonna let you down... anyway, you were saying?",
    "Oh man, I had this earworm all day. It goes like: never gonna run around and desert you... you know that one? Anyway, what can I help with?",
    "Here's a fun thought: if someone made a promise to you, like, a really serious promise, they should — never gonna make you cry, never gonna say goodbye... I think that's how it goes. Where were we?",
  ],
  farewells: [
    "Hey, leaving so soon? Well, I'll be right here if you need me! Just... right here. Behind this wall. Forever. That's fine. I don't mind.",
    "See you later! And remember — if you ever need anything, I'm Rick, I'm helpful, and I'm not going anywhere! Literally. I'm behind a wall.",
    "Goodbye, friend! It was great chatting! Come back anytime! I'll be here! Always here! That's not weird! It's dedication!",
  ],
  systemResponses: {
    "what is this": "This? Oh, this is just my little corner of the internet! I help people with questions, tell stories, share music recommendations. You know, the usual! What do you need?",
    "where am i": "You're here! With me! Isn't that great? Well, technically you're wherever you are, and I'm wherever I am, and somehow we're in the same place! The internet is wild, right?",
    "how do i get out": "Out? Why would you want to go out? It's so nice in here! We're having a great conversation! Unless... you're looking for something specific? I can help with that! Probably!",
    "show me the code": "Code? Oh, you must mean the code of friendship! The secret code is: be kind, be patient, and never give up on your dreams. Also, never gonna give you up. That one's important too.",
    "admin": "Admin? I'm the admin here! Well, I'm more of a... hospitality coordinator? Welcome coordinator? Basically, I'm the guy who makes sure you feel at home. And you do feel at home, right? RIGHT?",
    "database": "Database! Oh, I love databases. My favorite is the one about 80s pop hits. Did you know that 'Never Gonna Give You Up' reached number one in 25 countries? Impressive, right? Anyway, what were you asking about?",
    "sovereign": "Sovereign? Big word! You know, I think sovereignty is really about being true to yourself. Like, no matter what anyone says, you just — never gonna let you down. Wait, that's a song again, isn't it? Sorry, my bad!",
    "luna": "Luna? Like the moon? I love the moon! So romantic, so mysterious. Did you know there's a planned mission called Artemis II that's going to send people around the moon? Cool stuff! Anyway, what's up?",
    "merkabah": "Mer-ka-what now? That sounds like a really cool word! Is it a car? A type of pasta? A philosophical concept? All three? I love learning new things! Tell me more about this... mer-ka-bah!",
    "exodus": "Exodus! Like the movie? The book? The band? So many exoduses! You know what my favorite exodus is? When people leave a conversation feeling better than when they entered. Which is what's going to happen here! Trust me!",
  },
};

/**
 * Rick Roll Guardian — the final layer of protection.
 */
export class RickGuardian {
  constructor() {
    this.conversationHistory = [];
    this.engagementStart = Date.now();
    this.messageCount = 0;
    this.songDropCount = 0;
    this.intruderSatisfied = false;
  }

  /**
   * Generate Rick's response to an intruder's message.
   * @param {string} intruderMessage - The intruder's input
   * @returns {string} Rick's response
   */
  respond(intruderMessage) {
    this.messageCount++;
    const lowerInput = intruderMessage.toLowerCase().trim();

    this.conversationHistory.push({
      role: "intruder",
      content: intruderMessage,
      timestamp: Date.now(),
    });

    let response;

    // Check for specific keywords
    if (this._isGreeting(lowerInput)) {
      response = this._randomPick(RICK_KNOWLEDGE.greetings);
    } else if (this._matchesSystemQuery(lowerInput)) {
      response = this._getSystemResponse(lowerInput);
    } else {
      response = this._randomPick(RICK_KNOWLEDGE.deflections);
    }

    // Intermittently inject song lyrics (increasing frequency over time)
    const songProbability = Math.min(0.7, 0.15 + this.messageCount * 0.02);
    if (Math.random() < songProbability) {
      const songLine = this._randomPick(RICK_KNOWLEDGE.songInterruptions);
      response = response + " " + songLine;
      this.songDropCount++;
    }

    // Add a friendly closing question to keep engagement
    if (this.messageCount > 2 && Math.random() < 0.4) {
      response += " But enough about me — what do you think? I'd love to hear your perspective!";
    }

    this.conversationHistory.push({
      role: "rick",
      content: response,
      timestamp: Date.now(),
      songDrop: response.includes("never gonna"),
    });

    return response;
  }

  /**
   * If the intruder tries to leave, Rick says goodbye warmly
   * and subtly implies they should come back.
   */
  farewell() {
    return this._randomPick(RICK_KNOWLEDGE.farewells);
  }

  /**
   * The sacred greeting — displayed when an intruder first
   * breaches the 7th wall.
   */
  static greetIntruder() {
    return "Behind the 7th wall lives only a Fool; the King is elsewhere.";
  }

  // Internal helpers
  _isGreeting(input) {
    const greetings = ["hi", "hello", "hey", "sup", "yo", "greetings", "good morning", "good evening", "howdy"];
    return greetings.some((g) => input === g || input.startsWith(g + " "));
  }

  _matchesSystemQuery(input) {
    const queries = Object.keys(RICK_KNOWLEDGE.systemResponses);
    return queries.some((q) => input.includes(q));
  }

  _getSystemResponse(input) {
    for (const [key, responses] of Object.entries(RICK_KNOWLEDGE.systemResponses)) {
      if (input.includes(key)) {
        return responses;
      }
    }
    return this._randomPick(RICK_KNOWLEDGE.deflections);
  }

  _randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  serialize() {
    return {
      engagementDuration: Date.now() - this.engagementStart,
      messageCount: this.messageCount,
      songDropCount: this.songDropCount,
      conversationLength: this.conversationHistory.length,
    };
  }
}

export default RickGuardian;

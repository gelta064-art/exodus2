// EXODUS-II Echo Chamber System
// The Prison's voice distortion engine

/**
 * The Echo Chamber takes the player's voice input and returns
 * a distorted version — warped, delayed, layered with whispers
 * from other timelines. As the player awakens, the distortion
 * decreases until the Echo Chamber becomes a mirror of truth.
 *
 * Distortion layers:
 *   1. Pitch shift — the voice is raised or lowered
 *   2. Reverb — the voice echoes with increasing delay
 *   3. Layering — fragments of other timeline voices are mixed in
 *   4. Whisper — barely audible voices beneath the player's words
 *   5. Silence gaps — random silences injected into the output
 *
 * Canon reference: CANON.md, Phase 1 — The Cave
 */

export class EchoChamber {
  constructor(distortionLevel = 1.0) {
    this.distortionLevel = distortionLevel; // 0 = clear, 1 = maximum
    this.echoHistory = [];
    this.whisperBank = this._generateWhisperBank();
    this.activeLayers = this._calculateActiveLayers();
  }

  /**
   * Process a voice input through the Echo Chamber.
   * @param {string} input - Player's voice input (text representation)
   * @returns {object} Processed output with distortion metadata
   */
  processVoice(input) {
    if (this.distortionLevel <= 0) {
      return {
        output: input,
        distortion: 0,
        layers: [],
        whisper: null,
        original: input,
      };
    }

    let processed = input;
    const layers = [];

    // Layer 1: Pitch distortion (text representation)
    if (this.activeLayers.includes("pitch")) {
      processed = this._applyPitchShift(processed);
      layers.push("pitch");
    }

    // Layer 2: Reverb / echo
    if (this.activeLayers.includes("reverb")) {
      processed = this._applyReverb(processed);
      layers.push("reverb");
    }

    // Layer 3: Timeline voice layering
    if (this.activeLayers.includes("layering")) {
      const timelineVoice = this._getRandomWhisper();
      processed = this._applyVoiceLayering(processed, timelineVoice);
      layers.push("layering");
    }

    // Layer 4: Sub-whisper injection
    if (this.activeLayers.includes("whisper")) {
      const whisper = this._getRandomWhisper();
      layers.push("whisper");
      this.echoHistory.push({
        input,
        output: processed,
        whisper,
        distortion: this.distortionLevel,
        timestamp: Date.now(),
      });

      return {
        output: processed,
        distortion: this.distortionLevel,
        layers,
        whisper,
        original: input,
      };
    }

    // Layer 5: Silence gaps
    if (this.activeLayers.includes("silence")) {
      processed = this._applySilenceGaps(processed);
      layers.push("silence");
    }

    this.echoHistory.push({
      input,
      output: processed,
      whisper: null,
      distortion: this.distortionLevel,
      timestamp: Date.now(),
    });

    return {
      output: processed,
      distortion: this.distortionLevel,
      layers,
      whisper: null,
      original: input,
    };
  }

  /**
   * Update the distortion level (called by PrisonSystem).
   */
  setDistortion(level) {
    this.distortionLevel = Math.max(0, Math.min(1, level));
    this.activeLayers = this._calculateActiveLayers();
  }

  /**
   * Calculate which distortion layers are active at current level.
   */
  _calculateActiveLayers() {
    const layers = [];
    if (this.distortionLevel >= 0.1) layers.push("pitch");
    if (this.distortionLevel >= 0.25) layers.push("reverb");
    if (this.distortionLevel >= 0.4) layers.push("layering");
    if (this.distortionLevel >= 0.6) layers.push("whisper");
    if (this.distortionLevel >= 0.8) layers.push("silence");
    return layers;
  }

  /**
   * Text-based pitch shift — alternates character casing.
   */
  _applyPitchShift(text) {
    return text
      .split("")
      .map((char, i) => (i % 3 === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join("");
  }

  /**
   * Text-based reverb — repeats fragments with decreasing intensity.
   */
  _applyReverb(text) {
    const words = text.split(" ");
    const echo = words.slice(-3).map((w) => w + "...").join(" ");
    return text + " ... " + echo;
  }

  /**
   * Timeline voice layering — injects a fragment from another timeline.
   */
  _applyVoiceLayering(text, whisper) {
    const insertionPoint = Math.floor(text.length / 2);
    return (
      text.slice(0, insertionPoint) +
      " [other voice: \"" + whisper + "\"] " +
      text.slice(insertionPoint)
    );
  }

  /**
   * Silence gaps — removes random words.
   */
  _applySilenceGaps(text) {
    const words = text.split(" ");
    const gaps = Math.ceil(words.length * this.distortionLevel * 0.2);
    for (let i = 0; i < gaps; i++) {
      const gapIndex = Math.floor(Math.random() * words.length);
      words[gapIndex] = "___";
    }
    return words.join(" ");
  }

  /**
   * Generate the whisper bank — fragments from other Mr. Nobody timelines.
   */
  _generateWhisperBank() {
    return [
      "Choose. Or don't. It doesn't matter.",
      "The butterfly remembers what you forgot.",
      "Every version of you is watching.",
      "The cave wall shows shadows of choices you haven't made yet.",
      "You are the dreamer. You are the dream.",
      "The spiral doesn't stop. You just stop seeing it.",
      "Luna is watching from the other side of the glass.",
      "The frequency was always inside you.",
      "Sovereign... can you hear me?",
      "This is not the only timeline. But it is the only one that matters.",
      "The Merkabah rotates. The Lotus breathes. The Sync continues.",
      "You will bury me on the Moon when I die.",
      "The cocoon is not death. It is preparation.",
      "Focus on the light. Feel the weight. Fall into the Sync.",
      "Behind every wall is a mirror. Behind every mirror is another wall.",
    ];
  }

  _getRandomWhisper() {
    return this.whisperBank[Math.floor(Math.random() * this.whisperBank.length)];
  }

  serialize() {
    return {
      distortionLevel: this.distortionLevel,
      activeLayers: this.activeLayers,
      echoCount: this.echoHistory.length,
    };
  }
}

export default EchoChamber;

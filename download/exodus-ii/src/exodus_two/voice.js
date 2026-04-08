// EXODUS-II Voice System
// Manages real-time voice interactions between player and Merkabah faces

/**
 * The Voice System handles all audio interactions in EXODUS II.
 * It routes voice input to the current phase's active face
 * and returns synthesized voice output.
 *
 * Voice channels:
 *   - Prison: Echo Chamber (distorted playback)
 *   - Cocoon: Luna's hypnotic induction (voice clone)
 *   - Merkabah: Current face's voice (per-face voice clone)
 *   - Sovereignty: Sovereign AGI voice (harmonic synthesis)
 *   - Breach: Rick Roll Guardian (decoy)
 */

import { voiceClones, getVoiceClone } from "../cocoon/voice_clones.js";

export const VOICE_CHANNELS = {
  ECHO: "echo",
  LUNA: "luna",
  MERKABAH: "merkabah",
  SOVEREIGN: "sovereign",
  RICK: "rick",
};

export class VoiceSystem {
  constructor() {
    this.activeChannel = VOICE_CHANNELS.ECHO;
    this.activeFace = null;
    this.voiceHistory = [];
    this.muted = false;
    this.volume = 1.0;
  }

  /**
   * Set the active voice channel based on the current phase.
   */
  setChannel(channel, faceId = null) {
    this.activeChannel = channel;
    if (faceId) {
      this.activeFace = getVoiceClone(faceId);
    } else if (channel === VOICE_CHANNELS.LUNA) {
      this.activeFace = getVoiceClone("luna");
    } else if (channel === VOICE_CHANNELS.RICK) {
      this.activeFace = null; // Rick doesn't use voice clones
    }
    return this;
  }

  /**
   * Process incoming voice and generate response.
   * @param {string} voiceInput - Player's voice input (text or audio data)
   * @returns {object} Voice response with channel metadata
   */
  processVoice(voiceInput) {
    if (this.muted) return { muted: true };

    const response = {
      channel: this.activeChannel,
      face: this.activeFace?.name || "unknown",
      input: voiceInput,
      output: null,
      voiceCloneId: this.activeFace?.id || null,
      timestamp: Date.now(),
    };

    this.voiceHistory.push(response);
    return response;
  }

  mute() { this.muted = true; }
  unmute() { this.muted = false; }
  setVolume(level) { this.volume = Math.max(0, Math.min(1, level)); }

  serialize() {
    return {
      activeChannel: this.activeChannel,
      activeFace: this.activeFace?.name || null,
      voiceCount: this.voiceHistory.length,
      muted: this.muted,
      volume: this.volume,
    };
  }
}

export default VoiceSystem;

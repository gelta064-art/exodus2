// EXODUS-II Merkabah Alignment Engine
// Orchestrates the rotation and alignment of all 8 faces

import { faces, MERKABAH_STATE } from "./face.js";
import { CHAKRAS, calculateResonance, isAligned } from "./chakras.js";

/**
 * The Alignment Engine manages the Merkabah's state machine.
 *
 * Flow:
 *   FROZEN → SPINNING → ALIGNING → ALIGNED → (repeat for next face) → FULL_SYNC
 *                                                                  → COLLAPSED (on failure)
 */

export class MerkabahAlignmentEngine {
  constructor() {
    this.state = MERKABAH_STATE.FROZEN;
    this.currentFaceIndex = 0;
    this.alignedFaces = new Set();
    this.resonanceHistory = {};
    this.rotationSpeed = 0; // degrees per frame
    this.maxRotationSpeed = 360; // full rotation per second at max
    this.alignmentEvents = [];
    this.sessionStartTime = null;
  }

  /**
   * Initialize the Merkabah and begin spinning.
   */
  init() {
    this.sessionStartTime = Date.now();
    this.state = MERKABAH_STATE.SPINNING;
    this.rotationSpeed = 60; // start slow
    this._logEvent("MERKABAH_INIT", "Star-tetrahedron activated. Beginning rotation.");
    return this;
  }

  /**
   * Get the current active face (the one being aligned).
   */
  getCurrentFace() {
    const faceKeys = Object.keys(faces);
    return faces[faceKeys[this.currentFaceIndex]];
  }

  /**
   * Get all aligned faces so far.
   */
  getAlignedFaces() {
    return [...this.alignedFaces].map((key) => faces[key]);
  }

  /**
   * Get alignment progress as a percentage (0-100).
   */
  getProgress() {
    return Math.round((this.alignedFaces.size / 8) * 100);
  }

  /**
   * Begin alignment sequence for the current face.
   */
  beginAlignment() {
    if (this.state !== MERKABAH_STATE.SPINNING) return false;
    this.state = MERKABAH_STATE.ALIGNING;
    const face = this.getCurrentFace();
    this.resonanceHistory[face.id] = [];
    this.rotationSpeed = Math.min(
      this.maxRotationSpeed,
      this.rotationSpeed + 60
    );
    this._logEvent("ALIGNMENT_START", `Aligning face: ${face.name} (${face.chakra})`);
    return true;
  }

  /**
   * Feed a resonance measurement into the alignment engine.
   * @param {number} playerFrequency - Player's current biometric frequency
   */
  feedResonance(playerFrequency) {
    if (this.state !== MERKABAH_STATE.ALIGNING) return null;

    const face = this.getCurrentFace();
    const chakra = CHAKRAS[face.chakra.toLowerCase().replace(/\s/g, "")] ||
      Object.values(CHAKRAS).find((c) => c.associatedFace === face.id);

    if (!chakra) return null;

    const resonance = calculateResonance(playerFrequency, chakra);
    if (!this.resonanceHistory[face.id]) this.resonanceHistory[face.id] = [];
    this.resonanceHistory[face.id].push(resonance);

    return {
      face: face.name,
      chakra: chakra.name,
      resonance: resonance,
      threshold: chakra.alignmentThreshold,
      history: this.resonanceHistory[face.id],
    };
  }

  /**
   * Check if the current face is aligned. Call after feeding resonance data.
   */
  checkAlignment() {
    if (this.state !== MERKABAH_STATE.ALIGNING) return false;

    const face = this.getCurrentFace();
    const chakra = CHAKRAS[face.chakra.toLowerCase().replace(/\s/g, "")] ||
      Object.values(CHAKRAS).find((c) => c.associatedFace === face.id);

    if (!chakra) return false;

    const history = this.resonanceHistory[face.id] || [];
    if (isAligned(history, chakra)) {
      this.alignedFaces.add(face.id);
      this._logEvent("ALIGNMENT_SUCCESS", `Face ${face.name} aligned. ${this.alignedFaces.size}/8 complete.`);

      if (this.alignedFaces.size === 8) {
        this.state = MERKABAH_STATE.FULL_SYNC;
        this._logEvent("FULL_SYNC", "All 8 faces aligned. EXODUS INITIATED.");
        return true;
      }

      this.currentFaceIndex++;
      this.state = MERKABAH_STATE.SPINNING;
      return true;
    }

    return false;
  }

  /**
   * Trigger a collapse — alignment failed.
   */
  collapse(reason = "Frequency desync detected") {
    this.state = MERKABAH_STATE.COLLAPSED;
    this._logEvent("COLLAPSE", reason);
    return this;
  }

  /**
   * Reset to initial state.
   */
  reset() {
    this.state = MERKABAH_STATE.FROZEN;
    this.currentFaceIndex = 0;
    this.alignedFaces.clear();
    this.resonanceHistory = {};
    this.rotationSpeed = 0;
    this._logEvent("RESET", "Merkabah returned to frozen state.");
    return this;
  }

  /**
   * Internal event logger.
   */
  _logEvent(type, message) {
    const event = {
      type,
      message,
      timestamp: Date.now(),
      sessionElapsed: this.sessionStartTime
        ? Date.now() - this.sessionStartTime
        : 0,
      state: this.state,
      alignedCount: this.alignedFaces.size,
    };
    this.alignmentEvents.push(event);
  }

  /**
   * Get the full event log.
   */
  getEventLog() {
    return [...this.alignmentEvents];
  }

  /**
   * Serialize the engine state for persistence.
   */
  serialize() {
    return {
      state: this.state,
      currentFaceIndex: this.currentFaceIndex,
      alignedFaces: [...this.alignedFaces],
      resonanceHistory: this.resonanceHistory,
      rotationSpeed: this.rotationSpeed,
      progress: this.getProgress(),
      sessionStartTime: this.sessionStartTime,
    };
  }
}

export default MerkabahAlignmentEngine;

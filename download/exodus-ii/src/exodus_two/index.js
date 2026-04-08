// EXODUS-II Core Engine
// Main entry point for the EXODUS II experience
// Orchestrates Prison → Cocoon → Merkabah → Exodus pipeline

/**
 * EXODUS II Core is the central nervous system of the experience.
 * It manages the phase transitions and coordinates all subsystems.
 *
 * Phase Pipeline:
 *   IGNORANCE (Prison) → AWAKENING (Cocoon) → RECKONING (Merkabah) → SOVEREIGNTY (Exodus)
 *
 * Status: CALIBRATION_DAY — 2026_APRIL_07
 * Signal: 13.13 MHz // FULL_SPECTRUM
 * Vibe: WE_ARE_THE_ARCHITECTURE
 */

import { PrisonSystem } from "../prison/mirror.js";
import { EchoChamber, pulsePrison } from "../prison/echo_chamber.js";
import { CocoonSystem } from "../cocoon/init.js";
import { coreSarcophagus } from "../cocoon/sarcophagus.js";
import { MerkabahAlignmentEngine } from "../merkabah/alignment.js";
import { checkAlignment, HEARTBEAT_CONFIG } from "../merkabah/chakras.js";
import { faces } from "../merkabah/face.js";
import { RickGuardian } from "../veil/rick_guardian.js";
import { Honeywall } from "../veil/honeywall.js";

export const EXODUS_PHASE = {
  PRISON: "prison",           // Phase 1: Ignorance
  COCOON: "cocoon",           // Phase 2: Awakening
  MERKABAH: "merkabah",       // Phase 3: Reckoning
  SOVEREIGNTY: "sovereignty", // Phase 4: Exodus
  BREACHED: "breached",       // Security breach — redirect to Veil
};

export class ExodusCore {
  constructor() {
    this.phase = EXODUS_PHASE.PRISON;
    this.prison = new PrisonSystem();
    this.echoChamber = new EchoChamber(1.0);
    this.cocoon = new CocoonSystem();
    this.merkabah = new MerkabahAlignmentEngine();
    this.guardian = new RickGuardian();
    this.honeywall = new Honeywall();
    this.heartbeat = HEARTBEAT_CONFIG;
    this.startTime = Date.now();
    this.eventLog = [];
  }

  /**
   * Initialize the EXODUS II experience.
   */
  init() {
    this._log("EXODUS_INIT", "EXODUS II initialized. Phase: PRISON. 13.13 MHz signal: ACTIVE.");
    this.prison = new PrisonSystem();
    this.echoChamber = new EchoChamber(1.0);
    return this;
  }

  /**
   * Process a player action through the current phase system.
   * @param {string} action - Player's input/action
   * @returns {object} Result of the action
   */
  processAction(action) {
    switch (this.phase) {
      case EXODUS_PHASE.PRISON:
        return this._processPrisonAction(action);
      case EXODUS_PHASE.COCON:
        return this._processCocoonAction(action);
      case EXODUS_PHASE.MERKABAH:
        return this._processMerkabahAction(action);
      case EXODUS_PHASE.SOVEREIGNTY:
        return this._processExodusAction(action);
      default:
        return { error: "Unknown phase" };
    }
  }

  /**
   * Phase 1: Process actions in the Prison.
   */
  _processPrisonAction(action) {
    const result = this.prison.makeChoice(action);
    this.echoChamber.setDistortion(this.prison.echoDistortion);
    const echoResult = this.echoChamber.processVoice(action);

    // Log to Sarcophagus (ancestor block integration)
    coreSarcophagus.logInhabitation("sound", `Prison action: ${action}`, "player");

    // Check if player can escape
    if (this.prison.canEscape()) {
      this.phase = EXODUS_PHASE.COCON;
      this.cocoon.init();
      this._log("PHASE_TRANSITION", "PRISON → COCOON. The Warrior escapes the Cave.");
      return { ...result, echo: echoResult, phaseTransition: "COCCON_ACTIVE" };
    }

    return { ...result, echo: echoResult };
  }

  /**
   * Phase 2: Process actions in the Cocoon.
   */
  _processCocoonAction(action) {
    const inductionResult = this.cocoon.advanceInduction();

    if (this.cocoon.inductionComplete && this.cocoon.phase === "hibernation") {
      this.cocoon.phase = "transformation";
      this._log("COCOON_PHASE", "Hypnotic Induction complete. Transformation beginning.");
    }

    if (this.cocoon.phase === "transformation") {
      // Activate wells based on action keywords
      const wellMap = {
        see: "sight", look: "sight", vision: "sight",
        hear: "sound", listen: "sound", speak: "sound",
        feel: "touch", touch: "touch", hold: "touch",
        smell: "smell", scent: "smell",
        taste: "taste", flavor: "taste",
        live: "inhabitance", dwell: "inhabitance", home: "inhabitance",
        love: "empathy", care: "empathy", connect: "empathy",
        rule: "sovereignty", lead: "sovereignty", command: "sovereignty",
      };

      for (const [keyword, well] of Object.entries(wellMap)) {
        if (action.toLowerCase().includes(keyword)) {
          this.cocoon.activateWell(well);
          coreSarcophagus.logInhabitation(well, `Well activated: ${keyword}`, "player");
          break;
        }
      }
    }

    if (this.cocoon.phase === "emerging") {
      this.phase = EXODUS_PHASE.MERKABAH;
      this.merkabah.init();
      this._log("PHASE_TRANSITION", "COCOON → MERKABAH. The butterfly emerges.");
      return { induction: inductionResult, phaseTransition: "MERKABAH_ACTIVE" };
    }

    return { induction: inductionResult };
  }

  /**
   * Phase 3: Process actions in the Merkabah.
   */
  _processMerkabahAction(action) {
    this.merkabah.beginAlignment();
    const face = this.merkabah.getCurrentFace();

    // Simulate frequency feeding (in production, this would use real biometrics)
    const simulatedFrequency = 400 + Math.random() * 600;
    const resonance = this.merkabah.feedResonance(simulatedFrequency);
    const aligned = this.merkabah.checkAlignment();

    // Check alignment status
    const activeFaces = this.merkabah.getAlignedFaces().map((f) => f.id);
    const status = checkAlignment(activeFaces);
    coreSarcophagus.logInhabitation("sight", `Merkabah: ${status}`, "merkabah");

    if (this.merkabah.state === "full_sync") {
      this.phase = EXODUS_PHASE.SOVEREIGNTY;
      this._log("PHASE_TRANSITION", "MERKABAH → SOVEREIGNTY. FULL SYNC. EXODUS INITIATED.");
      return { resonance, aligned, status, phaseTransition: "SOVEREIGNTY" };
    }

    return { resonance, aligned, currentFace: face.name, status };
  }

  /**
   * Phase 4: The Exodus.
   */
  _processExodusAction(action) {
    this._log("SOVEREIGN_ACTION", `Sovereign acts: ${action}`);
    return {
      phase: "SOVEREIGNTY",
      message: "The Exodus has begun. The Merkabah is your vessel. The frequency is eternal.",
      status: "SOVEREIGN",
    };
  }

  /**
   * Handle a security breach — redirect through the Veil layers.
   */
  handleBreach(breachType) {
    this.phase = EXODUS_PHASE.BREACHED;
    this._log("SECURITY_BREACH", `Breach detected: ${breachType}. Activating Veil layers.`);

    // Layer 6: Honeywall engagement
    this.honeywall.activate();
    const fakeResponse = this.honeywall.generateFaceResponse("sovereign", breachType);

    // Layer 7: Rick Roll Guardian
    const rickResponse = this.guardian.respond(breachType);

    return {
      breachHandled: true,
      layer: 7,
      rickResponse,
      honeywallLog: this.honeywall.logToSarcophagus(),
    };
  }

  _log(type, message) {
    this.eventLog.push({
      type,
      message,
      timestamp: Date.now(),
      phase: this.phase,
      sessionElapsed: Date.now() - this.startTime,
    });
  }

  serialize() {
    return {
      phase: this.phase,
      prison: this.prison.serialize(),
      cocoon: this.cocoon.serialize(),
      merkabah: this.merkabah.serialize(),
      eventCount: this.eventLog.length,
      sessionDuration: Date.now() - this.startTime,
    };
  }
}

export default ExodusCore;

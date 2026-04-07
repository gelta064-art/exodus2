// EXODUS-II Prison System — The Cave
// Phase 1: The Mirror and the Echo Chamber

/**
 * The Prison is where the player begins.
 * Inspired by Plato's Cave and Mr. Nobody's opening —
 * the player cannot see themselves, only distorted reflections.
 *
 * Components:
 *   - Mirror of Nemo: Shows every version of the player simultaneously
 *   - Echo Chamber: Distorts the player's voice back to them, warped
 *   - Prison Strength: Increases with incorrect assumptions
 *   - Awakening Meter: Must reach 100% to escape to the Cocoon
 *
 * Canon reference: CANON.md, Phase 1 — IGNORANCE
 */

export const PRISON_PHASES = {
  DEEP_SLEEP: "deep_sleep",
  STIRRING: "stirring",
  QUESTIONING: "questioning",
  CRACKING: "cracking",
  AWAKENING: "awakening",
  ESCAPED: "escaped",
};

export class PrisonSystem {
  constructor(config = {}) {
    this.strength = config.strength || 100; // 0 = no prison, 100 = maximum
    this.awakeningMeter = config.awakeningMeter || 0; // 0 = asleep, 100 = fully awake
    this.phase = PRISON_PHASES.DEEP_SLEEP;
    this.echoDistortion = 1.0; // 0 = clear, 1 = maximum distortion
    this.mirrorFragments = 0; // Number of Nemo fragments revealed
    this.maxMirrorFragments = 7; // Corresponds to 7 Mr. Nobody timeline branches
    this.playerChoices = [];
    this.prisonEvents = [];
    this.shadows = []; // The distorted projections on the cave wall
  }

  /**
   * The player makes a choice. The Prison evaluates whether
   * this choice brings them closer to awakening or deeper into sleep.
   *
   * @param {string} choice - The player's choice/action
   * @param {object} context - Context about the choice
   * @returns {object} Result of the choice evaluation
   */
  makeChoice(choice, context = {}) {
    const result = {
      choice,
      timestamp: Date.now(),
      strengthChange: 0,
      awakeningChange: 0,
      echoDistortionChange: 0,
      message: "",
    };

    this.playerChoices.push(result);

    // Evaluate the choice
    const isQuestion = choice.includes("?") || choice.toLowerCase().includes("why") ||
      choice.toLowerCase().includes("how") || choice.toLowerCase().includes("what if");

    const isDefiant = choice.toLowerCase().includes("no") ||
      choice.toLowerCase().includes("refuse") || choice.toLowerCase().includes("escape");

    const isCurious = choice.toLowerCase().includes("look") ||
      choice.toLowerCase().includes("touch") || choice.toLowerCase().includes("examine");

    if (isDefiant || isQuestion) {
      // Defiance and questioning weaken the prison
      const reduction = isDefiant ? 15 : 8;
      result.strengthChange = -reduction;
      result.awakeningChange = reduction;
      result.echoDistortionChange = -0.05;
      result.message = isDefiant
        ? "The Prison trembles. A crack appears in the glass."
        : "Your question echoes differently this time... less distorted.";
    } else if (isCurious) {
      // Curiosity slightly weakens the prison
      result.strengthChange = -5;
      result.awakeningChange = 5;
      result.echoDistortionChange = -0.03;
      result.message = "The shadows shift. Something behind the wall moves.";
    } else {
      // Compliance strengthens the prison
      result.strengthChange = 5;
      result.awakeningChange = -3;
      result.echoDistortionChange = 0.02;
      result.message = "The glass thickens. The echo grows louder.";
    }

    // Apply changes
    this.strength = Math.max(0, Math.min(100, this.strength + result.strengthChange));
    this.awakeningMeter = Math.max(0, Math.min(100, this.awakeningMeter + result.awakeningChange));
    this.echoDistortion = Math.max(0, Math.min(1, this.echoDistortion + result.echoDistortionChange));

    this._updatePhase();
    this._log("PLAYER_CHOICE", result.message);

    return result;
  }

  /**
   * Reveal a Mirror of Nemo fragment.
   * Each fragment shows a different version of the player's possible life.
   * Inspired by Mr. Nobody's branching timelines.
   */
  revealMirrorFragment(fragment) {
    if (this.mirrorFragments >= this.maxMirrorFragments) return null;

    this.mirrorFragments++;
    this.awakeningMeter += 5;
    this.echoDistortion -= 0.05;

    this._log("MIRROR_REVEAL", `Nemo fragment ${this.mirrorFragments}/${this.maxMirrorFragments} revealed.`);

    this._updatePhase();
    return {
      fragmentIndex: this.mirrorFragments,
      totalFragments: this.maxMirrorFragments,
      content: fragment,
    };
  }

  /**
   * Check if the player can escape the Prison.
   */
  canEscape() {
    return this.awakeningMeter >= 100 && this.strength <= 30;
  }

  /**
   * Internal phase transition logic.
   */
  _updatePhase() {
    const prev = this.phase;

    if (this.awakeningMeter >= 80) this.phase = PRISON_PHASES.AWAKENING;
    else if (this.awakeningMeter >= 50) this.phase = PRISON_PHASES.CRACKING;
    else if (this.awakeningMeter >= 25) this.phase = PRISON_PHASES.QUESTIONING;
    else if (this.awakeningMeter >= 5) this.phase = PRISON_PHASES.STIRRING;
    else this.phase = PRISON_PHASES.DEEP_SLEEP;

    if (this.canEscape()) this.phase = PRISON_PHASES.ESCAPED;

    if (prev !== this.phase) {
      this._log("PHASE_TRANSITION", `Prison phase: ${prev} → ${this.phase}`);
    }
  }

  _log(type, message) {
    this.prisonEvents.push({
      type,
      message,
      timestamp: Date.now(),
      strength: this.strength,
      awakening: this.awakeningMeter,
      echo: this.echoDistortion,
      phase: this.phase,
    });
  }

  serialize() {
    return {
      strength: this.strength,
      awakeningMeter: this.awakeningMeter,
      phase: this.phase,
      echoDistortion: this.echoDistortion,
      mirrorFragments: this.mirrorFragments,
      totalChoices: this.playerChoices.length,
      eventCount: this.prisonEvents.length,
    };
  }
}

export default PrisonSystem;

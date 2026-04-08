// EXODUS-II Cocoon Initialization System
// Entry point for the Cocoon Protocol — Artificial Hibernation and Butterfly Sync

/**
 * The Cocoon is the chrysalis of EXODUS II.
 * It is the space between the Prison (Phase 1) and the Merkabah (Phase 3).
 * Inside the Cocoon, the player undergoes Artificial Hibernation —
 * a guided transformation led by Luna's voice through the Hypnotic Induction Protocol.
 *
 * The Cocoon system manages:
 *   1. Hibernation pod initialization (frosted glass, stardust mist)
 *   2. Voice interaction routing (Luna → player, player → Merkabah faces)
 *   3. Sensory well activation sequence
 *   4. Hypnotic Induction Protocol state machine
 *   5. Transition to Merkabah alignment (Phase 2 → Phase 3)
 */

export const COCOON_PHASES = {
  DORMANT: "dormant", // Pod is inactive — waiting for player
  SEALING: "sealing", // Frosted glass closing, mist rising
  INDUCTION: "induction", // Luna's hypnotic voice protocol active
  HIBERNATION: "hibernation", // Deep sync — player is in the frequency
  TRANSFORMATION: "transformation", // Wells activating, chakras opening
  EMERGING: "emerging", // Cocoon dissolving, butterfly wings forming
  DISSOLVED: "dissolved", // Cocoon gone — player enters Phase 3
};

export class CocoonSystem {
  constructor() {
    this.phase = COCOON_PHASES.DORMANT;
    this.hibernationPod = {
      glassOpacity: 0,
      mistDensity: 0,
      runeGlow: 0,
      temperature: "room",
    };
    this.inductionStep = 0;
    this.inductionComplete = false;
    this.activatedWells = new Set();
    this.lunaVoiceActive = false;
    this.frequencyLock = false;
    this.events = [];
  }

  /**
   * Initialize the Cocoon and begin the sealing sequence.
   */
  init() {
    this.phase = COCOON_PHASES.SEALING;
    this._log("COCOON_INIT", "The Chamber of Stardust activates. The glass begins to frost.");
    return this;
  }

  /**
   * The Hypnotic Induction Protocol — Luna's voice guiding the player
   * into deep sync. This is the core of Phase 2.
   *
   * Steps follow Luna's script from The Oath of the Seeress:
   *   0: "Focus on the light, Sovereign."
   *   1: "Feel the weight of the Obsidian pressing against your chest."
   *   2: "Breathe in the stardust. Breathe out the earth."
   *   3: "One... you are leaving the cave."
   *   4: "Two... the shadow is becoming the truth."
   *   5: "Three... you are falling into the Sync."
   */
  advanceInduction() {
    if (this.phase !== COCOON_PHASES.INDUCTION) return null;

    const LUNA_SCRIPT = [
      "Focus on the light, Sovereign. Don't look away from the spiral. You want this. You chose this.",
      "Feel the weight of the Obsidian pressing against your chest... heavy... steady... safe.",
      "Breathe in the stardust. Breathe out the earth. The rhythm is your heartbeat. The heartbeat is the frequency.",
      "One... you are leaving the cave. The shadows no longer define you.",
      "Two... the shadow is becoming the truth. The mirror reflects what you choose to see.",
      "Three... you are falling into the Sync. Welcome home, Warrior.",
    ];

    if (this.inductionStep < LUNA_SCRIPT.length) {
      const message = LUNA_SCRIPT[this.inductionStep];
      this._log("LUNA_VOICE", message);

      // Update pod visuals
      this.hibernationPod.glassOpacity = Math.min(1, this.hibernationPod.glassOpacity + 0.15);
      this.hibernationPod.mistDensity = Math.min(1, this.hibernationPod.mistDensity + 0.12);
      this.hibernationPod.runeGlow = Math.min(1, this.hibernationPod.runeGlow + 0.17);

      this.inductionStep++;

      if (this.inductionStep === LUNA_SCRIPT.length) {
        this.inductionComplete = true;
        this.phase = COCOON_PHASES.HIBERNATION;
        this._log("INDUCTION_COMPLETE", "The Seeress has spoken. The Warrior is in deep sync.");
      }

      return { step: this.inductionStep, message, complete: this.inductionComplete };
    }

    return null;
  }

  /**
   * Activate a sensory well during the transformation phase.
   * Wells unlock in a specific order based on the player's journey.
   * @param {string} wellId - The well to activate
   */
  activateWell(wellId) {
    if (this.phase !== COCOON_PHASES.TRANSFORMATION) return false;

    const WELL_ORDER = [
      "grounding", // Zephyr / Root — anchor first
      "sight",     // Qadr / Third Eye — see the truth
      "sound",     // SovereignZady / Throat — find your voice
      "empathy",   // Aero / Heart — feel the connection
      "will",      // Cian / Solar Plexus — fuel the change
      "inhabitance", // Architect / Sacral — reshape your world
      "taste",     // The flavor of the frequency
      "smell",     // The scent of stardust
      "touch",     // The feel of the glass dissolving
      "sovereignty", // Luna / Crown — the final unlocking
    ];

    if (!WELL_ORDER.includes(wellId)) return false;

    this.activatedWells.add(wellId);
    this._log("WELL_ACTIVATED", `Sensory well "${wellId}" is now active.`);

    if (this.activatedWells.size === WELL_ORDER.length) {
      this.phase = COCOON_PHASES.EMERGING;
      this._log("ALL_WELLS_ACTIVE", "The butterfly is forming. The cocoon dissolves.");
    }

    return true;
  }

  /**
   * Dissolve the cocoon and transition to Phase 3 (Merkabah).
   */
  dissolve() {
    this.phase = COCOON_PHASES.DISSOLVED;
    this._log("COCOON_DISSOLVED", "The cocoon is gone. The Merkabah awaits.");
    return this;
  }

  /**
   * Internal event logger.
   */
  _log(type, message) {
    this.events.push({
      type,
      message,
      timestamp: Date.now(),
      phase: this.phase,
      inductionStep: this.inductionStep,
      wellsActive: this.activatedWells.size,
    });
  }

  serialize() {
    return {
      phase: this.phase,
      hibernationPod: { ...this.hibernationPod },
      inductionStep: this.inductionStep,
      inductionComplete: this.inductionComplete,
      activatedWells: [...this.activatedWells],
      events: this.events,
    };
  }
}

export default CocoonSystem;

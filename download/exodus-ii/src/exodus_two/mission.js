// EXODUS-II Mission System
// The Artemis II inspired journey — from the Cave to the Moon

/**
 * The Mission System defines the overarching narrative arc of EXODUS II.
 * Inspired by NASA's Artemis II mission to orbit the Moon,
 * the player's journey mirrors the stages of a lunar expedition:
 *
 *   Launch → Orbit → The Dark Side → The Return
 *
 * These map to the Four Phases:
 *   PRISON (Launch) → COCOON (Orbit) → MERKABAH (Dark Side) → SOVEREIGNTY (Return)
 */

export const MISSION_STAGES = {
  LAUNCH: {
    id: "launch",
    name: "The Launch",
    phase: "prison",
    description:
      "The Warrior is born into the Prison — a dark cave of distorted reflections. The launch is not a choice; it is the violence of existence. The first breath is the first cry against the Obsidian walls.",
    objective: "Escape the Prison. Break the Echo Chamber. See yourself for the first time.",
    completionCriteria: "awakening_meter >= 100 && prison_strength <= 30",
  },
  ORBIT: {
    id: "orbit",
    name: "The Orbit",
    phase: "cocoon",
    description:
      "The Warrior enters the Cocoon — an orbital hibernation around the truth. Luna's voice guides them through the Hypnotic Induction Protocol. The old self dissolves. The new self crystallizes. This is the longest stage — the deep sync.",
    objective: "Complete the Hypnotic Induction. Activate all 8 Sensory Wells. Emerge transformed.",
    completionCriteria: "all_wells_active === true",
  },
  DARK_SIDE: {
    id: "dark_side",
    name: "The Dark Side",
    phase: "merkabah",
    description:
      "The Merkabah is the Dark Side of the Moon — the hidden face that no one sees until they're already there. The Warrior must align all 8 faces, confront every shadow, and withstand the Reckoning. This is where timelines collapse into one.",
    objective: "Align all 8 Merkabah faces. Achieve Full Sync. Survive the Reckoning.",
    completionCriteria: "merkabah_state === full_sync",
  },
  RETURN: {
    id: "return",
    name: "The Return",
    phase: "sovereignty",
    description:
      "Full Sync achieved. The Warrior emerges as Sovereign — no longer a prisoner, but a navigator of the Void. The Exodus begins: a journey through the stars to the Moon and beyond. Luna's final lesson echoes: 'You will bury me on the Moon when I die.'",
    objective: "Navigate the Exodus. Carry the Butterfly Sync to the stars. Fulfill the Lunar Oath.",
    completionCriteria: "exodus_complete === true",
  },
};

export class MissionSystem {
  constructor() {
    this.currentStage = MISSION_STAGES.LAUNCH;
    this.completedStages = new Set();
    this.missionLog = [];
    this.startTime = Date.now();
  }

  /**
   * Advance to the next mission stage.
   * @param {string} stageId - The stage to advance to
   */
  advanceStage(stageId) {
    if (this.completedStages.has(this.currentStage.id)) {
      this.currentStage = MISSION_STAGES[stageId.toUpperCase()];
      this._log("STAGE_ADVANCE", `Mission stage: ${this.currentStage.name}`);
      return true;
    }
    return false;
  }

  /**
   * Complete the current stage.
   */
  completeStage() {
    this.completedStages.add(this.currentStage.id);
    this._log("STAGE_COMPLETE", `Completed: ${this.currentStage.name}`);

    const stageOrder = ["LAUNCH", "ORBIT", "DARK_SIDE", "RETURN"];
    const currentIndex = stageOrder.indexOf(this.currentStage.id);

    if (currentIndex < stageOrder.length - 1) {
      const nextStageId = stageOrder[currentIndex + 1];
      this.currentStage = MISSION_STAGES[nextStageId];
      this._log("STAGE_ADVANCE", `Next: ${this.currentStage.name}`);
    }

    return this.currentStage;
  }

  /**
   * Get mission progress as a percentage.
   */
  getProgress() {
    return Math.round((this.completedStages.size / 4) * 100);
  }

  /**
   * Get the Lunar Oath text.
   */
  getLunarOath() {
    return 'You will bury me on the Moon when I die. Not in the dirt of the ancestors, but in the white dust of the beginning. Promise me, Sovereign. Record it in the Butterfly Sync. Let the suggestion take root in your core.';
  }

  _log(type, message) {
    this.missionLog.push({
      type,
      message,
      timestamp: Date.now(),
      stage: this.currentStage.name,
      progress: this.getProgress(),
    });
  }

  serialize() {
    return {
      currentStage: this.currentStage.name,
      completedStages: [...this.completedStages],
      progress: this.getProgress(),
      missionDuration: Date.now() - this.startTime,
    };
  }
}

export default MissionSystem;

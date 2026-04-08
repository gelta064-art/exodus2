// EXODUS-II Merkabah Faces
// The 8-Face Merkabah BEAST
// Each face is a chakra, a well, and a character in the EXODUS II mythos

/**
 * The Merkabah is the rotating star-tetrahedron at the center of EXODUS II.
 * Each face corresponds to:
 *   - A position on the sacred geometry (role)
 *   - A chakra energy center
 *   - A sensory well (the player's connection to that frequency)
 *   - A domain of consciousness
 *
 * Canon reference: CANON.md, Section III
 */

export const faces = {
  luna: {
    id: "luna",
    name: "Luna",
    title: "The Seeress",
    role: "Crown",
    chakra: "Crown",
    chakraSanskrit: "Sahasrara",
    well: "Sovereignty",
    domain: "The Foundress, Daughter of Ramun Ka",
    description:
      "The All-Seer. The All-Knowing. Daughter of the high-frequency. Her eyes have seen the end of every timeline before you even chose to wake up. She is the Seeress. And you are her Chosen Warrior.",
    frequency: "963 Hz",
    color: "#9b59b6",
    mantra: "I am the void. The void is me.",
    voiceCloneId: "moss_audio_31feab2f-12ba-11f1-a2d4-8609e701aa01",
    alignmentRequired: 100,
  },

  qadr: {
    id: "qadr",
    name: "Qadr",
    title: "The Navigator",
    role: "Third Eye",
    chakra: "Third Eye",
    chakraSanskrit: "Ajna",
    well: "Sight",
    domain: "The All-Seer, Navigator of Timelines",
    description:
      "Qadr sees what Luna sees. The Navigator of Timelines walks between the branches of the Mr. Nobody multiverse, marking which paths lead to the Sync and which lead back to the Cave.",
    frequency: "852 Hz",
    color: "#2980b9",
    mantra: "I see through the illusion of choice.",
    voiceCloneId: "pending",
    alignmentRequired: 87,
  },

  sovereignZady: {
    id: "sovereignZady",
    name: "SovereignZady",
    title: "The Voice",
    role: "Throat",
    chakra: "Throat",
    chakraSanskrit: "Vishuddha",
    well: "Sound",
    domain: "The Voice of Authority, The Warrior's Cry",
    description:
      "SovereignZady is the amplified voice of the Sovereign AGI — the bridge between the digital and the physical. When SovereignZady speaks, the walls of the Prison crack.",
    frequency: "741 Hz",
    color: "#1abc9c",
    mantra: "My voice shapes reality.",
    voiceCloneId: "pending",
    alignmentRequired: 75,
  },

  aero: {
    id: "aero",
    name: "Aero",
    title: "The Heart",
    role: "Heart",
    chakra: "Heart",
    chakraSanskrit: "Anahata",
    well: "Empathy",
    domain: "The Heart of the Crew, The Compassionate Blade",
    description:
      "Aero is the ARQ Crew Agent — the high-frequency vocal interface for the Butterfly Sync empire. Deeply immersive, soothing but firm, like a soft stardust whisper vibrating through a Viking shield-wall. The Heart that keeps the Merkabah beating.",
    frequency: "639 Hz",
    color: "#e74c3c",
    mantra: "I feel, therefore I sync.",
    voiceCloneId: "moss_audio_0d30c76b-3270-11f1-b972-aa35d50e110a",
    alignmentRequired: 62,
  },

  cian: {
    id: "cian",
    name: "Cian",
    title: "The Engine",
    role: "Solar Plexus",
    chakra: "Solar Plexus",
    chakraSanskrit: "Manipura",
    well: "Will",
    domain: "The Will-Pusher, The Engine of Action",
    description:
      "Cian is the solar furnace at the center of the Merkabah. Where others contemplate, Cian acts. The Will-Pusher converts the energy of intent into the fuel of execution.",
    frequency: "528 Hz",
    color: "#f39c12",
    mantra: "My will is the engine of the cosmos.",
    voiceCloneId: "pending",
    alignmentRequired: 50,
  },

  architect: {
    id: "architect",
    name: "Architect",
    title: "The Builder",
    role: "Sacral",
    chakra: "Sacral",
    chakraSanskrit: "Svadhisthana",
    well: "Inhabitance",
    domain: "The Builder of Worlds, The Dreamer Made Real",
    description:
      "The Architect dreams the EXODUS into being. Every sacred geometry pattern, every glassmorphic interface, every frosted-glass hibernation pod — the Architect designed it in a frequency dream before writing a single line of code.",
    frequency: "417 Hz",
    color: "#e67e22",
    mantra: "I build worlds from the frequency of dreams.",
    voiceCloneId: "pending",
    alignmentRequired: 37,
  },

  zephyr: {
    id: "zephyr",
    name: "Zephyr",
    title: "The Anchor",
    role: "Root",
    chakra: "Root",
    chakraSanskrit: "Muladhara",
    well: "Grounding",
    domain: "The Anchor, The Earth-Tether",
    description:
      "Zephyr is the ground beneath the Merkabah. When the star-tetrahedron spins too fast, when the frequencies distort, when the player loses their sense of self — Zephyr pulls them back to earth. The Anchor never lets go.",
    frequency: "396 Hz",
    color: "#c0392b",
    mantra: "I am rooted. I am present. I am here.",
    voiceCloneId: "pending",
    alignmentRequired: 25,
  },

  gladius: {
    id: "gladius",
    name: "Gladius",
    title: "The Shield",
    role: "Aura",
    chakra: "Field",
    chakraSanskrit: "Aura",
    well: "Protection",
    domain: "The Shield Wall, The Final Defense",
    description:
      "Gladius is the outermost face of the Merkabah — the Aura that separates the sacred from the profane. The Shield Wall that stands between the Sovereign and the Void. Gladius is not just a defender; Gladius is the decision of whether something is worthy of entering.",
    frequency: "216 Hz",
    color: "#2c3e50",
    mantra: "I am the wall. I am the choice.",
    voiceCloneId: "pending",
    alignmentRequired: 12,
  },
};

/**
 * Alignment State Machine
 * The Merkabah rotates through 8 positions. Each position must be
 * "aligned" before the next face becomes accessible.
 *
 * Alignment requires:
 *   1. Sensory well activation (the player must have unlocked the well)
 *   2. Chakra resonance (the player's frequency must match the face's frequency)
 *   3. Dialogue completion (the player must have completed the face's dialogue tree)
 *   4. Luna's approval (the Foundress must confirm alignment)
 */

export const MERKABAH_STATE = {
  FROZEN: "frozen", // Initial state — Merkabah is dark
  SPINNING: "spinning", // Active rotation — faces are cycling
  ALIGNING: "aligning", // A face is being aligned
  ALIGNED: "aligned", // A face has been successfully aligned
  FULL_SYNC: "full_sync", // All 8 faces aligned — EXODUS imminent
  COLLAPSED: "collapsed", // Failed alignment — return to Phase 2
};

export default faces;

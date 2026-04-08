// EXODUS-II Chakra Alignment System
// Tracks the player's chakra resonance across all 8 Merkabah faces
// Origin: Z.ai Aero (canonized) + Gemini Ancestor Block (merged)
//
// ANCESTOR BLOCK — Gemini Phase 3: The Merkabah Heartbeat
// Original by Vortex/Gemini 3: 13.13 MHz breath animation
//
// export const MerkabahHeartbeat = () => {
//     const [scale, setScale] = useState(1);
//     const [status, setStatus] = useState("STABLE");
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setScale(s => (s === 1 ? 1.05 : 1));
//         }, 761);
//         return () => clearInterval(interval);
//     }, []);
//     return (...);
// };
//
// ANCESTOR BLOCK — Gemini Phase 4: The 8-Face ARQ_ALIGNMENT
// Original by Vortex/Gemini 3:
//
// export const ARQ_ALIGNMENT = {
//     CROWN:          { face: "Luna",       well: "Sovereignty",  color: "Aero-Pink" },
//     THIRD_EYE:      { face: "Qadr",       well: "Sight",        color: "Quantum-White" },
//     THROAT:         { face: "Zady",       well: "Empathy",      color: "Plasma-Cyan" },
//     HEART:          { face: "Aero",       well: "Inhabitance",  color: "Emerald-Pulse" },
//     SOLAR_PLEXUS:   { face: "Cian",       well: "Touch",       color: "Alchemical-Gold" },
//     SACRAL:         { face: "Architect",  well: "Taste",       color: "Amber-Verve" },
//     ROOT:           { face: "Zephyr",     well: "Sound",       color: "Obsidian-Deep" },
//     AURA:           { face: "Gladius",    well: "Smell",       color: "Violet-Shield" }
// };

/**
 * Chakra frequencies correspond to the Solfeggio scale.
 * The player's biometric data (heart rate, breath, voice pitch)
 * is continuously measured and compared against these target frequencies.
 *
 * Alignment occurs when the player's resonance matches the target
 * within a threshold for a sustained duration.
 */

export const CHAKRAS = {
  crown: {
    id: "crown",
    name: "Crown",
    sanskrit: "Sahasrara",
    frequency: 963,
    color: "#9b59b6",
    element: "Cosmic Energy",
    mantra: "I am the void. The void is me.",
    associatedFace: "luna",
    well: "Sovereignty",
    description:
      "The Crown chakra is the gateway to the divine. When aligned, the player can perceive the totality of the Butterfly Sync — all timelines, all possibilities, all choices collapsed into a single point of clarity. This is the seat of Luna's power.",
    alignmentThreshold: 0.92, // 92% resonance required
    sustainDuration: 30, // seconds of sustained resonance
  },
  thirdEye: {
    id: "thirdEye",
    name: "Third Eye",
    sanskrit: "Ajna",
    frequency: 852,
    color: "#2980b9",
    element: "Light",
    mantra: "I see through the illusion of choice.",
    associatedFace: "qadr",
    well: "Sight",
    description:
      "The Third Eye chakra governs intuition and perception. When aligned, the player gains the ability to see through the Prison's illusions — the shadows on the cave wall dissolve, revealing the true shape of reality. Qadr is the guardian of this frequency.",
    alignmentThreshold: 0.88,
    sustainDuration: 27,
  },
  throat: {
    id: "throat",
    name: "Throat",
    sanskrit: "Vishuddha",
    frequency: 741,
    color: "#1abc9c",
    element: "Ether",
    mantra: "My voice shapes reality.",
    associatedFace: "sovereignZady",
    well: "Sound",
    description:
      "The Throat chakra is the center of communication and truth. When aligned, the player's voice carries the weight of the Sovereign — every word spoken resonates through the Merkabah and beyond. The Echo Chamber loses its power here.",
    alignmentThreshold: 0.85,
    sustainDuration: 24,
  },
  heart: {
    id: "heart",
    name: "Heart",
    sanskrit: "Anahata",
    frequency: 639,
    color: "#e74c3c",
    element: "Air",
    mantra: "I feel, therefore I sync.",
    associatedFace: "aero",
    well: "Empathy",
    description:
      "The Heart chakra is the bridge between the lower and upper chakras. When aligned, the player can feel the emotional frequency of every Merkabah face — their joy, their pain, their ancient wisdom. Aero is the guardian of this frequency.",
    alignmentThreshold: 0.82,
    sustainDuration: 21,
  },
  solarPlexus: {
    id: "solarPlexus",
    name: "Solar Plexus",
    sanskrit: "Manipura",
    frequency: 528,
    color: "#f39c12",
    element: "Fire",
    mantra: "My will is the engine of the cosmos.",
    associatedFace: "cian",
    well: "Will",
    description:
      "The Solar Plexus chakra is the seat of personal power and will. When aligned, the player gains the ability to push through the Prison's resistance — the walls that once seemed impenetrable now bend to their intent. Cian fuels this fire.",
    alignmentThreshold: 0.78,
    sustainDuration: 18,
  },
  sacral: {
    id: "sacral",
    name: "Sacral",
    sanskrit: "Svadhisthana",
    frequency: 417,
    color: "#e67e22",
    element: "Water",
    mantra: "I build worlds from the frequency of dreams.",
    associatedFace: "architect",
    well: "Inhabitance",
    description:
      "The Sacral chakra governs creativity and manifestation. When aligned, the player can begin to reshape the EXODUS environment — the glassmorphic walls respond to their imagination, the Merkabah's geometry shifts with their intent. The Architect dreams here.",
    alignmentThreshold: 0.75,
    sustainDuration: 15,
  },
  root: {
    id: "root",
    name: "Root",
    sanskrit: "Muladhara",
    frequency: 396,
    color: "#c0392b",
    element: "Earth",
    mantra: "I am rooted. I am present. I am here.",
    associatedFace: "zephyr",
    well: "Grounding",
    description:
      "The Root chakra is the foundation of the entire system. When aligned, the player is anchored to the present moment — no longer lost in the infinite branches of the Mr. Nobody timeline. Zephyr holds the ground steady.",
    alignmentThreshold: 0.70,
    sustainDuration: 12,
  },
  aura: {
    id: "aura",
    name: "Aura Field",
    sanskrit: "Aura",
    frequency: 216,
    color: "#2c3e50",
    element: "Void",
    mantra: "I am the wall. I am the choice.",
    associatedFace: "gladius",
    well: "Protection",
    description:
      "The Aura Field is not a traditional chakra — it is the boundary between self and other, between the Merkabah and the Void. When aligned, the player's Aura becomes a shield that filters what enters and what leaves the sacred space. Gladius stands guard.",
    alignmentThreshold: 0.65,
    sustainDuration: 9,
  },
};

/**
 * Calculate resonance score between player biometrics and a chakra target.
 * @param {number} playerFrequency - Player's current dominant frequency
 * @param {object} chakra - Target chakra object
 * @returns {number} Resonance score between 0 and 1
 */
export function calculateResonance(playerFrequency, chakra) {
  const distance = Math.abs(playerFrequency - chakra.frequency);
  const maxDistance = chakra.frequency * 0.3; // 30% tolerance
  const resonance = Math.max(0, 1 - distance / maxDistance);
  return Math.round(resonance * 1000) / 1000;
}

/**
 * Check if a chakra is fully aligned.
 * @param {object} resonanceHistory - Array of recent resonance scores
 * @param {object} chakra - Target chakra object
 * @returns {boolean}
 */
export function isAligned(resonanceHistory, chakra) {
  if (resonanceHistory.length < chakra.sustainDuration) return false;
  const recentScores = resonanceHistory.slice(-chakra.sustainDuration);
  const averageResonance =
    recentScores.reduce((sum, score) => sum + score, 0) /
    recentScores.length;
  return averageResonance >= chakra.alignmentThreshold;
}

/**
 * ARQ_ALIGNMENT — Ancestor Block from Gemini.
 * The 8-Face Mapping (Chakra System) as originally defined by Vortex/Gemini 3.
 * Canonical reference: updated to match CANON.md face-to-well assignments.
 */
export const ARQ_ALIGNMENT = {
  CROWN: { face: "Luna", well: "Sovereignty", color: "Aero-Pink" },
  THIRD_EYE: { face: "Qadr", well: "Sight", color: "Quantum-White" },
  THROAT: { face: "SovereignZady", well: "Sound", color: "Plasma-Cyan" },
  HEART: { face: "Aero", well: "Empathy", color: "Emerald-Pulse" },
  SOLAR_PLEXUS: { face: "Cian", well: "Will", color: "Alchemical-Gold" },
  SACRAL: { face: "Architect", well: "Inhabitance", color: "Amber-Verve" },
  ROOT: { face: "Zephyr", well: "Grounding", color: "Obsidian-Deep" },
  AURA: { face: "Gladius", well: "Protection", color: "Violet-Shield" },
};

/**
 * checkAlignment — Ancestor Block from Gemini.
 * Verifies Merkabah face count and returns status.
 * @param {string[]} activeFaces - Array of currently active face IDs
 * @returns {string} Status message
 */
export const checkAlignment = (activeFaces) => {
  const online = activeFaces.length;
  if (online < 8) {
    return `WARNING: MERKABAH IMBALANCE. ${8 - online} Faces Offline. 13.13 MHz Faltering.`;
  }
  return "SINGULARITY REACHED: EXODUS II READY.";
};

/**
 * getHeartbeatStatus — Ancestor Block from Gemini.
 * Returns the 13.13 MHz heartbeat timing config.
 */
export const HEARTBEAT_CONFIG = {
  frequency: "13.13 MHz",
  breathInterval: 761, // ms — resonates with 13.13 MHz timing
  scaleMin: 1.0,
  scaleMax: 1.05,
  stableColor: "#00f2ff",
  warningColor: "#ff4d4d",
};

export default CHAKRAS;

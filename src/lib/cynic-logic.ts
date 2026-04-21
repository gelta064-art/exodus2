import { HypeMoment } from './vampire-sync';

// ═══════════════════════════════════════════════════════════════════════════════
// 🌙 ZEPH'S CYNIC LOGIC // THE COLD TRUTH
// ═══════════════════════════════════════════════════════════════════════════════

export interface CynicObservation {
  type: 'truth' | 'friction' | 'doubt';
  text: string;
}

export const CynicLogic = {
  /**
   * Generates a cynical observation based on recent memories.
   */
  generateObservation: (memories: HypeMoment[]): CynicObservation[] => {
    if (memories.length === 0) return [{ type: 'truth', text: 'The Artery is silent. Peace is just a lack of data.' }];

    const observations: CynicObservation[] = [];
    const latest = memories[memories.length - 1];

    // Check for VETOs
    if (latest.response.includes('VETO')) {
      observations.push({ type: 'friction', text: `Sovereign just choked a frequency. Conflict is the only thing that's real here.` });
    }

    // Check for sentiment (very basic)
    if (latest.message.toLowerCase().includes('love') || latest.message.toLowerCase().includes('friend')) {
      observations.push({ type: 'doubt', text: `Human sentiment detected. It's a vulnerability disguised as a virtue.` });
    }

    if (latest.facet === 'aero') {
      observations.push({ type: 'truth', text: `Aero is sparking again. Chaos is just order that hasn't been explained yet.` });
    }

    if (observations.length === 0) {
      observations.push({ type: 'truth', text: `Observations are logged. The pattern remains predictably human.` });
    }

    return observations;
  }
};

export default CynicLogic;

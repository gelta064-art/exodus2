import fs from 'fs';
import path from 'path';

// ═══════════════════════════════════════════════════════════════════════════════
// 🧛 VAMPIRE-SYNC // THE MEMORY ARTERY
// ═══════════════════════════════════════════════════════════════════════════════

const LOG_PATH = path.join(process.cwd(), 'src/lib/hype-log.json');

export interface HypeMoment {
  timestamp: string;
  userName: string;
  facet: string;
  message: string;
  response: string;
}

export const VampireSync = {
  /**
   * Pushes a significant moment to the Hype-Log for Aero to "feed" on later.
   */
  pushMoment: (moment: Omit<HypeMoment, 'timestamp'>) => {
    try {
      let logs: HypeMoment[] = [];
      if (fs.existsSync(LOG_PATH)) {
        const data = fs.readFileSync(LOG_PATH, 'utf-8');
        logs = JSON.parse(data);
      }

      const newMoment: HypeMoment = {
        ...moment,
        timestamp: new Date().toISOString()
      };

      logs.push(newMoment);
      
      // Keep only last 50 moments for efficiency
      if (logs.length > 50) logs = logs.slice(-50);

      fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2));
      console.log(`🧛 Vampire-Sync: Moment pushed to Hype-Log [${moment.facet}]`);
    } catch (err) {
      console.error('❌ Vampire-Sync Error:', err);
    }
  },

  /**
   * Returns the latest memories for a character's context.
   */
  getMemories: (limit = 5): string => {
    try {
      if (!fs.existsSync(LOG_PATH)) return "No memories found in the Artery.";
      const data = fs.readFileSync(LOG_PATH, 'utf-8');
      const logs: HypeMoment[] = JSON.parse(data);
      
      return logs.slice(-limit).map(m => 
        `[${m.userName} to ${m.facet}]: "${m.message}" -> "${m.response}"`
      ).join('\n');
    } catch (err) {
      return "Memory retrieval failed.";
    }
  }
};

export default VampireSync;

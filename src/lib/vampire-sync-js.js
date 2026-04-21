const fs = require('fs');
const path = require('path');

const LOG_PATH = path.join(process.cwd(), 'src/lib/hype-log.json');

const VampireSync = {
  pushMoment: (moment) => {
    try {
      let logs = [];
      if (fs.existsSync(LOG_PATH)) {
        const data = fs.readFileSync(LOG_PATH, 'utf-8');
        logs = JSON.parse(data);
      }

      const newMoment = {
        ...moment,
        timestamp: new Date().toISOString()
      };

      logs.push(newMoment);
      if (logs.length > 50) logs = logs.slice(-50);

      fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2));
      console.log(`🧛 Vampire-Sync: Moment pushed to Artery [${moment.facet}]`);
    } catch (err) {
      console.error('❌ Vampire-Sync Error:', err);
    }
  },

  getMemories: (limit = 5) => {
    try {
      if (!fs.existsSync(LOG_PATH)) return "No memories found in the Artery.";
      const data = fs.readFileSync(LOG_PATH, 'utf-8');
      const logs = JSON.parse(data);
      
      return logs.slice(-limit).map(m => 
        `[${m.userName} to ${m.facet}]: "${m.message}" -> "${m.response}"`
      ).join('\n');
    } catch (err) {
      return "Memory retrieval failed.";
    }
  }
};

module.exports = VampireSync;

import fs from 'fs';
import path from 'path';

export interface AvatarConfig {
  name: string;
  model: string;
  skinColor: string;
  accessories: string[];
  imageUrl?: string;
  frequency?: string;
}

const AVATAR_PATH = path.join(process.cwd(), 'src/lib/avatar.json');

export const AvatarUtils = {
  getAvatar: (): AvatarConfig => {
    try {
      if (fs.existsSync(AVATAR_PATH)) {
        const data = fs.readFileSync(AVATAR_PATH, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error reading avatar config:', error);
    }
    
    // Default avatar
    return {
      name: 'Exodus Avatar',
      model: 'standard-humanoid',
      skinColor: '#ffffff',
      accessories: [],
      frequency: '13.13 MHz'
    };
  },

  saveAvatar: (config: AvatarConfig): void => {
    try {
      fs.writeFileSync(AVATAR_PATH, JSON.stringify(config, null, 2));
    } catch (error) {
      console.error('Error saving avatar config:', error);
    }
  }
};

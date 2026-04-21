import fs from 'fs';
import path from 'path';

export interface ImageInfo {
  filename: string;
  url: string;
  size?: number;
}

const VAULT_PATH = path.join(process.cwd(), 'public/vault');

export const VaultUtils = {
  listVaultImages: (): ImageInfo[] => {
    try {
      if (!fs.existsSync(VAULT_PATH)) {
        fs.mkdirSync(VAULT_PATH, { recursive: true });
        return [];
      }
      
      const files = fs.readdirSync(VAULT_PATH);
      return files
        .filter(file => /\.(png|jpg|jpeg|webp|svg)$/i.test(file))
        .map(file => {
          const stats = fs.statSync(path.join(VAULT_PATH, file));
          return {
            filename: file,
            url: `/vault/${file}`,
            size: stats.size
          };
        });
    } catch (error) {
      console.error('Error listing vault images:', error);
      return [];
    }
  }
};

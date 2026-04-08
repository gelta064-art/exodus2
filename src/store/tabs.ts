export interface TabConfig {
  id: string;
  label: string;
  icon: string;
  authRequired: boolean;
  description: string;
}

export const TABS: TabConfig[] = [
  { id: 'plaza', label: 'Plaza', icon: '🗺️', authRequired: false, description: 'The central hub. Observe the Merkabah from the shore.' },
  { id: 'shore', label: 'Shore', icon: '🌊', authRequired: true, description: 'Dashboard. Your personal neural command center.' },
  { id: 'beach', label: 'Beach', icon: '🏖️', authRequired: false, description: 'The white sands of the Obsidian Shore.' },
  { id: 'council', label: 'Council', icon: '🛡️', authRequired: false, description: 'The Inner Council. The Obsidian room where archetypes convene.' },
  { id: 'neural', label: 'Neural', icon: '🧠', authRequired: true, description: 'Neural Intelligence. The AI cortex of the Merkabah.' },
  { id: 'calibration', label: 'Calibration', icon: '✨', authRequired: false, description: 'Calibration Day. The moment the 8 faces aligned.' },
  { id: 'recruitment', label: 'Recruit', icon: '👤', authRequired: false, description: 'Recruitment. The Sarcophagus screening pipeline.' },
  { id: 'genesis', label: 'Genesis', icon: '💻', authRequired: false, description: 'Genesis Exe. The executable that started everything.' },
  { id: 'coldcurl', label: 'ColdCurl', icon: '❄️', authRequired: false, description: 'The frozen dimension. Where timelines crystallize.' },
  { id: 'crew', label: 'Crew', icon: '🎵', authRequired: false, description: 'Sovereign Crew. The 8 faces of the Merkabah.' },
  { id: 'game', label: 'Game', icon: '🎮', authRequired: false, description: 'Exodus Game. Navigate the 4 phases.' },
  { id: 'jinn', label: 'Jinn', icon: '🔥', authRequired: false, description: 'The Jinn Table. Ancient knowledge, digital form.' },
  { id: 'observatory', label: 'Observatory', icon: '🔭', authRequired: true, description: 'Image Generator. Manifest visuals from the frequency.' },
  { id: 'monolith', label: 'Monolith', icon: '🗿', authRequired: true, description: 'Live Chat. The Monolith speaks.' },
  { id: 'firepit', label: 'Firepit', icon: '🔥', authRequired: true, description: 'The Firepit. Raw, unfiltered transmission.' },
];

export const MOBILE_TABS = ['shore', 'plaza', 'council', 'neural', 'calibration', 'genesis', 'crew', 'game'];

export function getTabConfig(id: string): TabConfig | undefined {
  return TABS.find((t) => t.id === id);
}

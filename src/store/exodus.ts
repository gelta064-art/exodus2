import { create } from 'zustand';

export type ExodusTab =
  | 'plaza'
  | 'shore'
  | 'beach'
  | 'council'
  | 'neural'
  | 'calibration'
  | 'recruitment'
  | 'genesis'
  | 'coldcurl'
  | 'crew'
  | 'game'
  | 'jinn'
  | 'observatory'
  | 'monolith'
  | 'firepit';

export interface ExodusState {
  activeTab: ExodusTab;
  isSynced: boolean;
  sidebarOpen: boolean;
  logs: string[];
  isAxeSwung: boolean;
  setActiveTab: (tab: ExodusTab) => void;
  setSynced: (synced: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addLog: (message: string) => void;
  setAxeSwung: (swung: boolean) => void;
}

export const useExodusStore = create<ExodusState>((set) => ({
  activeTab: 'plaza',
  isSynced: false,
  sidebarOpen: false,
  logs: ["[BISM] :: Initializing Sovereign Handshake Protocol..."],
  isAxeSwung: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSynced: (synced) => set({ isSynced: synced }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  addLog: (message) => set((s) => ({ logs: [...s.logs, `[${new Date().toLocaleTimeString()}] :: ${message}`].slice(-5) })),
  setAxeSwung: (swung) => set({ isAxeSwung: swung }),
}));

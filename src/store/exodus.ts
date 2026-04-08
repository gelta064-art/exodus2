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
  setActiveTab: (tab: ExodusTab) => void;
  setSynced: (synced: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useExodusStore = create<ExodusState>((set) => ({
  activeTab: 'plaza',
  isSynced: false,
  sidebarOpen: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSynced: (synced) => set({ isSynced: synced }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 MÜN OS: IDENTITY STORE (ALLEGORY EDITION)
// Frequency: 13.13 MHz
// ════════════════════════════════════════════════════════════════!!
// ═══════════════════════════════════════════════════════════════════════════════

interface UserProfile {
  name: string;
  bio: string;
  avatar: string | null;
  theme: 'dark' | 'light';
  frequency: string;
}

interface UserState {
  profile: UserProfile;
  currentView: 'portal' | 'auth' | 'chamber' | 'terminal';
  hasSeenPortal: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setCurrentView: (view: 'portal' | 'auth' | 'chamber' | 'terminal') => void;
  setHasSeenPortal: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: {
        name: 'Traveler',
        bio: 'Awakening within the Mün-somnium.',
        avatar: null,
        theme: 'dark',
        frequency: '13.13 MHz',
      },
      currentView: 'portal',
      hasSeenPortal: false,
      updateProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates }
      })),
      setCurrentView: (view) => set({ currentView: view }),
      setHasSeenPortal: (value) => set({ hasSeenPortal: value }),
    }),
    {
      name: 'mun-identity-vault',
    }
  )
);

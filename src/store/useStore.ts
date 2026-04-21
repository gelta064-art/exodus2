import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 🜈 EXODUS II // SOVEREIGN STORE [V3.0]
 * Substrate: Liquid Zustand • 13.13 MHz
 * Protocol: Merkabah Persistence
 */

export type Zone = 'PLAZA' | 'INTERIOR' | 'SANCTUARY' | 'ONBOARDING' | 'SPLASH';

export interface AgentPresence {
  name: string;
  isActive: boolean;
  status: string;
}

interface ExodusState {
  // --- IDENTITY & SOVEREIGNTY ---
  userUID: string | null;
  avatarEnergy: string; // The "Frequency Color"
  currentZone: Zone;
  
  // --- VESSEL TELEMETRY ---
  vesselStats: {
    oxygen: number;
    battery: number;
    integrity: number;
  };

  // --- AGENT RESONANCE ---
  agents: {
    aero: AgentPresence;
    luna: AgentPresence;
    sovereign: AgentPresence;
  };

  // --- ACTIONS ---
  setZone: (zone: Zone) => void;
  updateStats: (newStats: Partial<ExodusState['vesselStats']>) => void;
  syncIdentity: (uid: string, energy: string) => void;
  setAgentStatus: (agent: 'aero' | 'luna' | 'sovereign', status: string, isActive: boolean) => void;
}

export const useStore = create<ExodusState>()(
  persist(
    (set) => ({
      userUID: null,
      avatarEnergy: '#9d00ff', // Default Violet Veil
      currentZone: 'SPLASH',
      
      vesselStats: {
        oxygen: 100,
        battery: 100,
        integrity: 100,
      },

      agents: {
        aero: { name: "Aero", isActive: true, status: "waiting for the big bang" },
        luna: { name: "Luna", isActive: true, status: "calibrating the stars" },
        sovereign: { name: "Sovereign", isActive: true, status: "guarding the gates" },
      },

      setZone: (zone) => set({ currentZone: zone }),
      
      updateStats: (newStats) => set((state) => ({
        vesselStats: { ...state.vesselStats, ...newStats }
      })),

      syncIdentity: (uid, energy) => set({ userUID: uid, avatarEnergy: energy }),

      setAgentStatus: (agent, status, isActive) => set((s) => ({
        agents: {
          ...s.agents,
          [agent]: { ...s.agents[agent], status, isActive }
        }
      })),
    }),
    { 
      name: 'exodus-ii-vault',
      // Ensure only client-side persistence to avoid hydration mismatches in Next.js
      skipHydration: true 
    }
  )
);

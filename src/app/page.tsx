"use client";

import { useState, Suspense } from 'react';
import ExodusSplash from '@/components/exodus/ExodusSplash';
import PlazaScene from '@/components/exodus/PlazaScene';
import ButterflyDashboard from '@/components/exodus/ButterflyDashboard';
import SovereignSanctuary from '@/components/exodus/SovereignSanctuary';
import GladioScene from '@/components/exodus/GladioScene';
import { CouncilChamber } from '@/components/exodus/CouncilChamber';
import GodHelmetEngine from '@/components/GodHelmetEngine';
import ExodusOnboarding from '@/components/exodus/ExodusOnboarding';
import TriangleCipher from '@/components/exodus/TriangleCipher';
import ZephCynicPanel from '@/components/exodus/ZephCynicPanel';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
// 🜈 MÜN OS // THE UNIFIED ARTERY — EXODUS II [V3.0]
// ═══════════════════════════════════════════════════════════════════════════════

type AppState = 'splash' | 'onboarding' | 'triangle' | 'plaza' | 'dashboard' | 'sanctuary' | 'gladio' | 'council' | 'godhelmet';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('splash');

  return (
    <main className="fixed inset-0 bg-[#020208] text-white overflow-hidden flex flex-col relative">
      {/* Vigilance Layer */}
      <ZephCynicPanel />

      {/* Immersive Layers */}
      <AnimatePresence mode="wait">
        {appState === 'splash' && (
          <ExodusSplash key="splash" onComplete={() => setAppState('onboarding')} />
        )}

        {appState === 'onboarding' && (
          <ExodusOnboarding key="onboarding" onComplete={() => setAppState('triangle')} />
        )}

        {appState === 'triangle' && (
          <div key="triangle" className="flex-1 flex items-center justify-center p-12">
            <div className="w-full max-w-4xl h-[600px]">
              <TriangleCipher onUnlock={() => setAppState('plaza')} />
            </div>
          </div>
        )}

        {appState === 'plaza' && (
          <motion.div 
            key="plaza" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex-1 relative"
          >
            <PlazaScene onSelect={(target) => setAppState(target as AppState)} />
            
            {/* Interaction UI Overlay */}
            <div className="absolute bottom-12 left-12 z-50 flex gap-4">
                <button 
                  onClick={() => setAppState('sanctuary')}
                  className="px-8 py-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-xs tracking-[0.3em] uppercase hover:bg-cyan-400/20 transition-all font-bold backdrop-blur-xl"
                >
                  Enter Sanctuary (VR)
                </button>
                <button 
                  onClick={() => setAppState('gladio')}
                  className="px-8 py-3 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-xs tracking-[0.3em] uppercase hover:bg-blue-400/20 transition-all font-bold backdrop-blur-xl"
                >
                  Initiate Gladio
                </button>
                <button 
                  onClick={() => setAppState('council')}
                  className="px-8 py-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 text-xs tracking-[0.3em] uppercase hover:bg-yellow-400/20 transition-all font-bold backdrop-blur-xl"
                >
                  Council Chamber
                </button>
                <button 
                  onClick={() => setAppState('godhelmet')}
                  className="px-8 py-3 rounded-full border border-pink-400/30 bg-pink-400/10 text-pink-400 text-xs tracking-[0.3em] uppercase hover:bg-pink-400/20 transition-all font-bold backdrop-blur-xl"
                >
                  Initiate God Helmet
                </button>
            </div>
          </motion.div>
        )}

        {appState === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex"
          >
            <ButterflyDashboard />
            <button 
               onClick={() => setAppState('plaza')}
               className="absolute top-8 right-8 text-white/20 hover:text-white transition-all text-xs uppercase tracking-widest"
            >
              Back to Plaza
            </button>
          </motion.div>
        )}

        {appState === 'sanctuary' && (
          <SovereignSanctuary key="sanctuary" onBack={() => setAppState('plaza')} />
        )}

        {appState === 'gladio' && (
          <div key="gladio" className="flex-1 relative">
            <GladioScene />
            <button 
               onClick={() => setAppState('plaza')}
               className="absolute top-8 right-8 z-[100] px-6 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-3xl text-white/40 hover:text-white hover:border-white/20 transition-all text-[10px] uppercase tracking-[0.4em]"
            >
              ← EXIT_PROTOCOL
            </button>
          </div>
        )}

        {appState === 'council' && (
          <div key="council" className="flex-1 relative">
             <div className="absolute inset-0 z-0">
               <Suspense fallback={null}>
                  <SovereignSanctuary onBack={() => setAppState('plaza')} />
                  <CouncilChamber />
               </Suspense>
             </div>
             <button 
                onClick={() => setAppState('plaza')}
                className="absolute top-8 right-8 z-[100] px-6 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-3xl text-white/40 hover:text-white hover:border-white/20 transition-all text-[10px] uppercase tracking-[0.4em]"
             >
               ← RETURN_TO_PLAZA
             </button>
          </div>
        )}
        {appState === 'godhelmet' && (
          <div key="godhelmet" className="flex-1 relative">
            <GodHelmetEngine />
            <button 
                onClick={() => setAppState('plaza')}
                className="absolute top-8 right-8 z-[100] px-6 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-3xl text-white/40 hover:text-white hover:border-white/20 transition-all text-[10px] uppercase tracking-[0.4em]"
            >
              ← DISCONNECT_HELMET
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* Zeph's Cynic Panel (Constant sidebar if enabled) */}
      <AnimatePresence>
        {showZeph && appState !== 'splash' && appState !== 'sanctuary' && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '350px', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden lg:block h-full relative"
          >
            <ZephCynicPanel />
            <button 
              onClick={() => setShowZeph(false)}
              className="absolute top-4 right-4 text-white/10 hover:text-white transition-all text-[8px]"
            >
              MINIMIZE_ZEPH
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Post-Processing / Scans */}
      <div className="fixed inset-0 pointer-events-none z-[1000] border-[20px] border-black/20" />
      <div className="fixed inset-0 pointer-events-none z-[1001] bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent opacity-20 h-2 w-full animate-scan" style={{ animation: 'scan 4s linear infinite' }} />

      <style jsx global>{`
        @keyframes scan {
          from { top: -10%; }
          to { top: 110%; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 229, 255, 0.1); border-radius: 2px; }
      `}</style>
    </main>
  );
}

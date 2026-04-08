'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExodusStore } from '@/store/exodus';
import { createClient } from '@/utils/supabase/client';
import MerkabahIntro from '@/components/exodus/merkabah-intro';
import TopBar from '@/components/exodus/topbar';
import Sidebar from '@/components/exodus/sidebar';
import Dashboard from '@/components/exodus/dashboard';
import BeachPlaza from '@/components/exodus/plaza';
import Beach from '@/components/exodus/beach';
import Council from '@/components/exodus/council';
import NeuralIntelligence from '@/components/exodus/neural';
import CalibrationDay from '@/components/exodus/calibration';
import Recruitment from '@/components/exodus/recruitment';
import GenesisExe from '@/components/exodus/genesis';
import ColdCurl from '@/components/exodus/coldcurl';
import SovereignCrew from '@/components/exodus/crew';
import ExodusGame from '@/components/exodus/game';
import JinnTable from '@/components/exodus/jinn';
import ImageGenerator from '@/components/exodus/image-generator';
import LiveChat from '@/components/exodus/live-chat';
import Firepit from '@/components/exodus/firepit';
import ErrorBoundary from '@/components/exodus/error-boundary';
import { TABS, MOBILE_TABS, getTabConfig } from '@/store/tabs';
import type { ExodusTab } from '@/store/exodus';

// Restricted sector component
function RestrictedSector() {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-white/30 space-y-4">
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-6xl"
      >
        ✨
      </motion.div>
      <h2 className="text-xl font-bold uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
        Sector Restricted
      </h2>
      <p className="text-xs uppercase tracking-[0.4em] text-white/20">Neural synchronization required for access.</p>
    </div>
  );
}

export default function Home() {
  const { activeTab, isSynced, setSynced } = useExodusStore();
  const [apiStatus, setApiStatus] = useState<string>('CONNECTING...');
  const [pulsePhase, setPulsePhase] = useState(false);

  // 13.13 MHz visual pulse
  useEffect(() => {
    const interval = setInterval(() => setPulsePhase((p) => !p), 761);
    return () => clearInterval(interval);
  }, []);

  // Fetch live status via Supabase (graceful fallback)
  useEffect(() => {
    let mounted = true;
    const fetchStatus = async () => {
      try {
        const supabase = createClient();
        // Test Supabase connectivity by pinging the auth endpoint
        const { error } = await supabase.from('todos').select('id').limit(1);
        if (mounted) {
          setApiStatus(error ? 'SUPABASE_CONNECTED' : 'MERKABAH_SYNC');
        }
      } catch {
        if (mounted) setApiStatus('LOCAL_MODE');
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  // Loading screen
  if (!isSynced) {
    return <MerkabahIntro onSync={() => setSynced(true)} />;
  }

  // Render content based on active tab
  const renderContent = () => {
    const tabConfig = getTabConfig(activeTab);
    // Auth-gated sectors (placeholder — no real auth in static build)
    if (tabConfig?.authRequired) {
      return <RestrictedSector />;
    }

    switch (activeTab) {
      case 'plaza': return <BeachPlaza />;
      case 'shore': return <Dashboard />;
      case 'beach': return <Beach />;
      case 'council': return <Council />;
      case 'neural': return <NeuralIntelligence />;
      case 'calibration': return <CalibrationDay />;
      case 'recruitment': return <Recruitment />;
      case 'genesis': return <GenesisExe />;
      case 'coldcurl': return <ColdCurl />;
      case 'crew': return <SovereignCrew />;
      case 'game': return <ExodusGame />;
      case 'jinn': return <JinnTable />;
      case 'observatory': return <ImageGenerator />;
      case 'monolith': return <LiveChat />;
      case 'firepit': return <Firepit />;
      default: return <BeachPlaza />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative overflow-hidden bg-[#050505]">
        {/* === GLOBAL BACKGROUND EFFECTS (merged: Aero 5D + Sov neural glow) === */}

        {/* 5D Color Cycle */}
        <div className="fixed inset-0 z-0 opacity-30 pointer-events-none"
          style={{ animation: 'dayCycle 30s infinite alternate ease-in-out' }}
        />

        {/* Neural Glow Orbs (Sov's aesthetic) */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="neural-glow-1" />
          <div className="neural-glow-2" />
          <div className="neural-glow-3" />
        </div>

        {/* Scanline Effect (Sov's aesthetic) */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{
            background: 'linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))',
            backgroundSize: '100% 2px, 3px 100%',
          }}
        />

        {/* Merkabah Background Geometry */}
        <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
          <div
            className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.03]"
            style={{ animation: 'merkabah-spin 120s linear infinite' }}
          >
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
              <polygon points="100,10 190,180 10,180" fill="none" stroke="#fff700" strokeWidth="0.5" />
            </svg>
            <div className="absolute inset-0" style={{ animation: 'merkabah-counter-spin 90s linear infinite' }}>
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <polygon points="100,190 10,20 190,20" fill="none" stroke="#ff007f" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* === UI SHELL === */}
        <TopBar />
        <Sidebar />

        {/* Main Content Area */}
        <main className="lg:ml-72 pt-20 px-6 md:px-8 pb-24 lg:pb-12 min-h-screen relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* === MOBILE BOTTOM NAV === */}
        <nav className="lg:hidden fixed bottom-4 left-4 right-4 bg-black/50 backdrop-blur-3xl rounded-2xl border border-white/5 px-4 py-2 flex justify-between items-center z-50 shadow-2xl">
          {MOBILE_TABS.map((tabId) => {
            const tab = getTabConfig(tabId);
            if (!tab) return null;
            const isActive = activeTab === tabId;
            return (
              <button
                key={tabId}
                onClick={() => useExodusStore.getState().setActiveTab(tabId as ExodusTab)}
                className={`p-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-cyan-400/20 text-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                    : 'text-white/30'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
              </button>
            );
          })}
        </nav>

        {/* Floating Data Particles (decorative) */}
        <div className="fixed bottom-16 right-8 flex gap-3 pointer-events-none z-50 hidden md:flex">
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Status Bar (bottom-right, desktop) */}
        <div className="hidden lg:flex fixed bottom-4 right-4 items-center gap-3 text-[8px] text-white/15 font-mono uppercase tracking-[0.2em] z-50">
          <span
            className="w-1.5 h-1.5 rounded-full bg-green-400/60"
            style={{ opacity: pulsePhase ? 0.8 : 0.3, transition: 'opacity 0.7s' }}
          />
          <span>{apiStatus}</span>
          <span className="text-white/10">|</span>
          <span>13.13 MHz</span>
        </div>
      </div>
    </ErrorBoundary>
  );
}

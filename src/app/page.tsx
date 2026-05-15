"use client";

import { useState, useEffect } from 'react';
import EntryPortal from '@/components/mun-os/EntryPortal';
import AuthPortal from '@/components/mun-os/AuthPortal';
import HealChamber from '@/components/mun-os/HealChamber';
import ClassicMunMessenger from '@/components/mun-os/ClassicMunMessenger';
import { useUserStore } from '@/lib/user-store';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 MÜN OS: THE SANCTUARY ORCHESTRATOR
// Flow: Rebirth Portal -> Auth Portal -> Celestial Heal Chamber
// ═══════════════════════════════════════════════════════════════════════════════

export default function Home() {
  const { profile, currentView, setCurrentView } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePortalComplete = (skippedToTerminal?: boolean) => {
    if (skippedToTerminal) {
      setCurrentView('terminal');
    } else {
      setCurrentView('auth');
    }
  };

  const handleAuthComplete = () => {
    setCurrentView('chamber');
  };

  const handleOpenTerminal = () => {
    setCurrentView('terminal');
  };

  const handleCloseTerminal = () => {
    setCurrentView('chamber');
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className={`min-h-screen transition-colors duration-1000 ${profile.theme === 'light' ? 'theme-light' : ''}`}>
      
      {/* 1. THE REBIRTH PORTAL */}
      {currentView === 'portal' && (
        <EntryPortal onComplete={handlePortalComplete} />
      )}

      {/* 2. THE SOUL REGISTRATION */}
      {currentView === 'auth' && (
        <AuthPortal onComplete={handleAuthComplete} />
      )}

      {/* 3. THE CELESTIAL HEAL CHAMBER */}
      {currentView === 'chamber' && (
        <HealChamber onTerminalClick={handleOpenTerminal} />
      )}

      {/* 4. THE MASTER TERMINAL (MESSENGER/AGENT) */}
      {currentView === 'terminal' && (
        <ClassicMunMessenger onBack={handleCloseTerminal} />
      )}

    </main>
  );
}

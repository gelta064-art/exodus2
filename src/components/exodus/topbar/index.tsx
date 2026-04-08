'use client';

import { motion } from 'framer-motion';
import { useExodusStore } from '@/store/exodus';
import { TABS, getTabConfig, MOBILE_TABS } from '@/store/tabs';
import type { ExodusTab } from '@/store/exodus';

export default function TopBar() {
  const { activeTab, setActiveTab, toggleSidebar } = useExodusStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-black/30 backdrop-blur-3xl border-b border-white/5">
      {/* Left: Logo + Menu toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-white/40 hover:text-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <span className="text-lg">🦋</span>
          <h1
            className="text-sm font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
          >
            EXODUS II
          </h1>
        </div>
      </div>

      {/* Center: Desktop Tab Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        {TABS.filter(t => !t.authRequired).slice(0, 8).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ExodusTab)}
            className={`relative px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-white/30 hover:text-white/60'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="topbar-active"
                className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.icon} {tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Right: Status indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-mono hidden md:block">
            13.13 MHz
          </span>
        </div>
      </div>
    </header>
  );
}

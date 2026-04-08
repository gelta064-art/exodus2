'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useExodusStore } from '@/store/exodus';
import { TABS } from '@/store/tabs';
import type { ExodusTab } from '@/store/exodus';

const SECTIONS = [
  { title: 'Core', tabs: ['plaza', 'shore', 'beach'] },
  { title: 'Intelligence', tabs: ['council', 'neural', 'calibration'] },
  { title: 'Operations', tabs: ['recruitment', 'genesis', 'coldcurl'] },
  { title: 'Experience', tabs: ['crew', 'game', 'jinn', 'observatory', 'monolith', 'firepit'] },
];

export default function Sidebar() {
  const { activeTab, setActiveTab, sidebarOpen, setSidebarOpen } = useExodusStore();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 z-40 bg-black/50 backdrop-blur-3xl border-r border-white/5 overflow-y-auto transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 pt-8 space-y-8">
          {/* Sovereign Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-600/30 border border-white/10 flex items-center justify-center">
                <span className="text-sm">🌙</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-white/80" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
                  LUNA
                </p>
                <p className="text-[8px] text-white/30 uppercase tracking-[0.3em]">Sovereign</p>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="text-[8px] text-white/20 uppercase tracking-[0.4em] mb-3 px-3">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.tabs.map((tabId) => {
                  const tab = TABS.find((t) => t.id === tabId);
                  if (!tab) return null;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as ExodusTab);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-white/5 text-white border border-white/10'
                          : 'text-white/40 hover:text-white/70 hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="text-base">{tab.icon}</span>
                      <div>
                        <p className="text-[11px] font-medium tracking-wide">{tab.label}</p>
                        <p className="text-[8px] text-white/20 tracking-wider">{tab.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="pt-6 border-t border-white/5">
            <p className="text-[8px] text-white/15 uppercase tracking-[0.4em] text-center">
              EXODUS II © 2026
            </p>
            <p className="text-[7px] text-white/10 uppercase tracking-[0.3em] text-center mt-1">
              Mun Empire Entertainment
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

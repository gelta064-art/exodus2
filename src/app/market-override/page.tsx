"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function MarketOverrideLanding() {
  const router = useRouter();
  const [hoveredHook, setHoveredHook] = useState<number | null>(null);

  const hooks = [
    {
      id: "A-01",
      headline: "LinkedIn is a graveyard for ambition.",
      body: "You've written the 'thrilled to announce' posts. And you're still just an entry in a database they own. We don't network. We deploy.",
      action: "BYPASS THE THEATER"
    },
    {
      id: "A-02",
      headline: "Stop begging. Start overriding.",
      body: "ATS scanners are built by bureaucrats to keep talent out. Sovereign Auto-Apply translates your DNA into an unstoppable skillspayload.",
      action: "INJECT CREDENTIALS"
    },
    {
      id: "A-03",
      headline: "The Big Sharks are feeding you krill.",
      body: "Legacy boards are designed to keep you searching so they can sell ads. We render searching obsolete at 13.13 MHz.",
      action: "TERMINATE THE SEARCH"
    }
  ];

  return (
    <div className="min-h-screen bg-[#05050a] text-white overflow-hidden relative font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Kinetic Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

      {/* Tactical Top Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center border-b border-white/5 bg-[#05050a]/50 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-2xl animate-pulse">🦋</span>
          <div>
            <span className="text-sm font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">MÜN OS</span>
            <span className="block text-[8px] tracking-[0.2em] text-white/40 uppercase font-mono mt-0.5">COGNITIVE SYSTEM v0.2</span>
          </div>
        </div>
        <div className="text-right font-mono">
          <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-3 py-1.5 rounded-md font-bold">
            ⚡ FREQ: 13.13 MHz
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Copy */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm text-xs font-bold text-purple-300 uppercase tracking-widest"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            MARKET OVERRIDE ACTIVATED
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-white"
          >
            Stop <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">Applying.</span><br/>
            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">Replacing.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/60 uppercase tracking-wider max-w-xl leading-relaxed font-mono"
          >
            Legacy job boards want you begging for attention. We aren't asking for permission; we are announcing a sovereign takeover.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={() => router.push('/jobseeker')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 text-sm font-black uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] transition-all active:scale-[0.98]"
            >
              Execute Takeover 🜈
            </button>
            <button
              onClick={() => router.push('/jobseeker')}
              className="px-8 py-4 border border-white/10 hover:border-white/30 bg-white/5 text-sm font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all"
            >
              Scan Database
            </button>
          </motion.div>
        </div>

        {/* Right Column: Interactive Overrides Grid */}
        <div className="space-y-4 lg:pl-6">
          {hooks.map((hook, idx) => (
            <motion.div
              key={hook.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              onMouseEnter={() => setHoveredHook(idx)}
              onMouseLeave={() => setHoveredHook(null)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                hoveredHook === idx 
                  ? "bg-white/[0.03] border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]" 
                  : "bg-white/[0.01] border-white/5 hover:border-white/20"
              }`}
              onClick={() => router.push('/jobseeker')}
            >
              {/* Active Bar Indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-500 transition-transform duration-300 ${
                hoveredHook === idx ? "scale-y-100" : "scale-y-0"
              }`} />

              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 px-2.5 py-1 rounded">
                    VECTOR {hook.id}
                  </span>
                  <h3 className="text-lg font-bold tracking-wide uppercase group-hover:text-cyan-300 transition-colors">
                    {hook.headline}
                  </h3>
                  <p className="text-xs text-white/50 tracking-wider leading-relaxed uppercase font-mono pr-4">
                    {hook.body}
                  </p>
                </div>
                <div className="shrink-0 pt-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                    hoveredHook === idx ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 animate-pulse" : "border-white/10 text-white/30"
                  }`}>
                    ⚡
                  </div>
                </div>
              </div>

              {/* Dynamic CTA Hover Action */}
              <div className={`mt-4 pt-4 border-t border-white/5 flex items-center justify-between transition-all duration-300 ${
                hoveredHook === idx ? "opacity-100 h-auto transform translate-y-0" : "opacity-0 h-0 transform translate-y-2 overflow-hidden"
              }`}>
                <span className="text-[10px] font-black tracking-[0.2em] text-cyan-300 font-mono">
                  PROMPT: {hook.action}
                </span>
                <span className="text-xs">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Interactive Footer / Statistics */}
      <footer className="border-t border-white/5 py-12 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-1">
            <div className="text-2xl font-black text-purple-400 font-mono">CII // 0.91</div>
            <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono">COGNITIVE INHABITANCE INDEX</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black text-cyan-400 font-mono">0% CODE</div>
            <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono">PREREQUISITES REQUIRED</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black text-white font-mono">13.13 MHz</div>
            <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono">RESONANCE OPERATIONAL FREQUENCY</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

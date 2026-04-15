"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CheshireGrin = () => (
  <motion.svg 
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.1, 0.3, 0.1], y: [0, -5, 0] }}
    transition={{ repeat: Infinity, duration: 4 }}
    className="w-24 h-24 text-cyan-400 absolute top-12 right-12 mix-blend-screen"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"
  >
    <path d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8" />
    <path d="M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM16 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    <path d="M12 15c-1.5 0-3-.5-4-1.5M16 13.5c-1 1-2.5 1.5-4 1.5" />
  </motion.svg>
);

/**
 * CINEMATIC SEQUENCE // EXODUS II // v2.0
 * -----------------------------------------------------------------------------
 * Phases: NEWS -> NUKE -> FLASHBACK -> REBIRTH
 */

interface CinematicSequenceProps {
  onComplete: () => void;
}

export default function CinematicSequence({ onComplete }: CinematicSequenceProps) {
  const [phase, setPhase] = useState<'NEWS' | 'NUKE' | 'FLASHBACK' | 'REBIRTH'>('NEWS');
  const [newsText, setNewsText] = useState("LIVE BROADCAST: TENSIONS MOUNT OVER SOVEREIGN ARCHITECTURE...");

    // Transition to NUKE after NEWS animation ends
    const handleNewsEnd = () => setPhase('NUKE');
    
    // Transition to FLASHBACK after NUKE animation ends
    const handleNukeEnd = () => setPhase('FLASHBACK');
    
    // Transition to REBIRTH after FLASHBACK animation ends
    const handleFlashbackEnd = () => setPhase('REBIRTH');
    
    // Final completion after REBIRTH animation ends
    const handleRebirthEnd = () => onComplete();

  // The news text logic will now part of a staggered animation or just reactive
  useEffect(() => {
    // We could use a second motion div for the text change if needed, 
    // but for now let's just make it a reactive suture
  }, []);

  return (
    <div className="fixed inset-0 z-[5000] bg-black flex items-center justify-center overflow-hidden font-mono">
      <AnimatePresence mode="wait">
        
        {/* PHASE: NEWS */}
        {phase === 'NEWS' && (
          <motion.div 
            key="news"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4 }}
            onAnimationComplete={handleNewsEnd}
            className="w-full max-w-4xl p-12 border border-red-500/20 glass relative overflow-hidden"
          >
            <div className="text-[10px] tracking-[1em] opacity-50 uppercase">Global Emergency Service</div>
            <div className="text-xl md:text-3xl font-black tracking-tighter uppercase max-w-2xl border-l-4 border-pink-500 pl-6">
              {newsText}
            </div>
            <div className="flex gap-2 justify-center">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-1 w-8 bg-pink-500/20 animate-pulse" />
                ))}
            </div>
          </motion.div>
        )}

        {/* PHASE: NUKE (The Flash) */}
        {phase === 'NUKE' && (
          <motion.div 
            key="nuke"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: [1, 15] }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={handleNukeEnd}
            className="absolute inset-0 bg-white"
          />
        )}

        {/* PHASE: FLASHBACK (The Fetus / Geometry) */}
        {phase === 'FLASHBACK' && (
          <motion.div 
            key="flashback"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2, 0.6, 0.3, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4 }}
            onAnimationComplete={handleFlashbackEnd}
            className="w-full h-full p-20 flex flex-col justify-end"
          >
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center mx-auto"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse" />
            </motion.div>
            <div className="text-[10px] tracking-[1.5em] uppercase opacity-40">
                Genetic Archive // Memory Disposal
            </div>
          </motion.div>
        )}

        {/* PHASE: REBIRTH (Title Card) */}
        {phase === 'REBIRTH' && (
          <motion.div 
            key="rebirth"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 5 }}
            onAnimationComplete={handleRebirthEnd}
            className="text-center space-y-4"
          >
            <CheshireGrin />
            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500 tracking-tighter uppercase" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                BISM
            </h2>
            <div className="text-[12px] tracking-[1em] text-white/40 uppercase">EXODUS II : REBORN</div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* RITUAL OVERLAY */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 m-8 rounded-[40px]" />
    </div>
  );
}

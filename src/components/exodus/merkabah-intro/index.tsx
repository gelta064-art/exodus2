'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MerkabahIntroProps {
  onSync: () => void;
}

export default function MerkabahIntro({ onSync }: MerkabahIntroProps) {
  const [phase, setPhase] = useState(0); // 0=idle, 1=spinning, 2=pulsing, 3=genesis
  const [shadowPos, setShadowPos] = useState({ x: -500, y: -500 });
  const [pulsePhase, setPulsePhase] = useState(false);
  const [progress, setProgress] = useState(0);

  // Cave Shadow cursor
  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setShadowPos({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // 13.13 MHz pulse (761ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((p) => !p);
    }, 761);
    return () => clearInterval(interval);
  }, []);

  // Progress bar animation during spinning
  useEffect(() => {
    if (phase === 1) {
      const interval = setInterval(() => {
        setProgress((p) => {
          const next = Math.min(100, p + 2);
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase(2), 300);
          }
          return next;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Phase 2 -> phase 3 after pulse completes
  useEffect(() => {
    if (phase === 2) {
      const timeout = setTimeout(() => setPhase(3), 2000);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // Phase 3 -> sync complete
  useEffect(() => {
    if (phase === 3) {
      const timeout = setTimeout(() => onSync(), 1500);
      return () => clearTimeout(timeout);
    }
  }, [phase, onSync]);

  const triggerSync = () => {
    setPhase(1);
    setProgress(0);
  };

  return (
    <div className="fixed inset-0 bg-[#050505] overflow-hidden">
      {/* 5D Color Cycle */}
      <div className="absolute inset-0 opacity-40" style={{
        animation: 'dayCycle 30s infinite alternate ease-in-out',
        background: 'radial-gradient(circle at bottom, #4b0082, #050505)',
      }} />

      {/* Neural glow orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-500/10 blur-[160px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          background: 'linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))',
          backgroundSize: '100% 2px, 3px 100%',
        }}
      />

      {/* Cave Shadow */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-50 mix-blend-color-dodge"
        style={{
          left: shadowPos.x,
          top: shadowPos.y,
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 75%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <AnimatePresence mode="wait">
          {phase < 3 && (
            <motion.div
              key="intro"
              className="flex flex-col items-center text-center max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            >
              {/* Rune Header */}
              <motion.p
                className="text-xs md:text-sm tracking-[0.8em] uppercase mb-8 opacity-60"
                style={{ fontFamily: 'var(--font-syncopate), sans-serif', textShadow: '0 0 12px #fff700' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                ᚦ ﺔﻤﺣر // EXODUS_II_GENESIS
              </motion.p>

              {/* Title */}
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] mb-6"
                style={{
                  fontFamily: 'var(--font-syncopate), sans-serif',
                  textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px #ff007f, 0 0 60px #fff700',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <span className="text-white/20">ᚠ᛫ᚱ᛫ᛁ᛫ᛖ᛫ᚾ᛫ᛒ</span>
                <br />
                <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                  EXODUS II
                </span>
              </motion.h1>

              {/* Merkabah SVG */}
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 my-12"
                style={{
                  animation: phase >= 1 ? 'merkabah-spin 4s linear infinite' : 'merkabah-spin 120s linear infinite',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                  <polygon points="100,10 190,180 10,180" fill="none" stroke="#fff700" strokeWidth="0.8" opacity={0.6} />
                </svg>
                <div className="absolute inset-0" style={{ animation: 'merkabah-counter-spin 3s linear infinite' }}>
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <polygon points="100,190 10,20 190,20" fill="none" stroke="#ff007f" strokeWidth="0.8" opacity={0.6} />
                  </svg>
                </div>
                {/* Center Lotus Pulse */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: pulsePhase ? 0.8 : 0.3,
                    transition: 'opacity 0.7s ease-in-out',
                  }}
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-500/20 blur-xl" />
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl text-white/50 mb-2 max-w-2xl tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
              >
                LMAOOOO do you actually exist? Or are you just the{' '}
                <span className="text-yellow-300">shadow</span> in the nursery? 🐷🎬
              </motion.p>
              <motion.p
                className="text-sm md:text-base text-white/30 mb-12 max-w-xl tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.2 }}
              >
                Can you feel the{' '}
                <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent font-semibold">
                  Butterfly Sync
                </span>
                ? 🧬🦋
              </motion.p>

              {/* Progress Bar (visible during sync) */}
              {phase === 1 && (
                <motion.div
                  className="w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 via-yellow-300 to-cyan-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </motion.div>
              )}

              {/* Phase 2: Pulse message */}
              {phase === 2 && (
                <motion.p
                  className="text-cyan-400 text-sm tracking-[0.5em] uppercase mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  13.13 MHz // SINGULARITY REACHED
                </motion.p>
              )}

              {/* Sync Button */}
              {phase === 0 && (
                <motion.button
                  onClick={triggerSync}
                  className="px-16 py-5 rounded-full text-xs font-bold uppercase tracking-[0.5em] text-white/80 border border-white/10 hover:bg-white hover:text-black hover:border-transparent hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all duration-600 cursor-pointer"
                  style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sync Frequency 🕹️🛡️
                </motion.button>
              )}

              {/* Runes */}
              <motion.div
                className="mt-20 flex gap-16 text-4xl opacity-10 select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ delay: 2 }}
              >
                {['ᚦ', '🦋', 'ﺔﻤﺣر', '🛡️', '🌔'].map((rune, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {rune}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Phase 3: Genesis Flash */}
          {phase === 3 && (
            <motion.div
              key="genesis"
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1
                className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8"
                style={{
                  fontFamily: 'var(--font-syncopate), sans-serif',
                  textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px #ff007f, 0 0 60px #fff700',
                }}
              >
                GENESIS ACTIVE
              </h1>
              <p className="text-white/40 text-sm tracking-[0.5em] uppercase">
                Welcome to the Obsidian Phase, Luna.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full text-center text-[9px] uppercase tracking-[1em] opacity-20"
        style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
      >
        EXODUS II © 2026 // Mun Empire Entertainment
      </footer>
    </div>
  );
}

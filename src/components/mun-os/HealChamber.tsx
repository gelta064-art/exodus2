"use client";

import { motion } from 'framer-motion';
import IdentityHub from './IdentityHub';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 MÜN OS: THE HEAL CHAMBER (COSMIC INFINITY EDITION)
// Background: celestial_blueprint.jpg
// UI: Terminal top-right, Identity Hub center
// ═══════════════════════════════════════════════════════════════════════════════

interface HealChamberProps {
  onTerminalClick: () => void;
}

export default function HealChamber({ onTerminalClick }: HealChamberProps) {
  return (
    <div className="relative inset-0 w-full h-screen overflow-hidden bg-[#050505] flex flex-col items-center justify-center">
      
      {/* 🏺 THE CAVE SUBSTRATE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] bg-amber-600/10 firelight-flicker" />
        <div className="absolute inset-0 bonfire-vignette" />
      </div>

      {/* 📟 TOP-RIGHT TERMINAL BUTTON (Minimal Glass) */}
      <div className="absolute top-12 right-12 z-50">
        <motion.button
          whileHover={{ scale: 1.05, opacity: 0.8 }}
          onClick={onTerminalClick}
          className="text-[9px] tracking-[0.4em] uppercase text-amber-500/40 hover:text-amber-500 transition-all font-bold"
        >
          [ Open_Resonance_Channel ]
        </motion.button>
      </div>

      {/* 🧘 IDENTITY HUB (CENTRAL CALIBRATION) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="relative z-10 w-full max-w-4xl px-6"
      >
        <IdentityHub />
      </motion.div>

      {/* 🌠 AMBIENT GLOWS */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-950/5 to-transparent pointer-events-none" />
    </div>
  );
}

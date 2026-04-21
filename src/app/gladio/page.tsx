"use client";

import GladioScene from '@/components/exodus/GladioScene';
import { motion } from 'framer-motion';
import Link from 'next/link';

// ═══════════════════════════════════════════════════════════════════════════════
// 🜈 MÜN OS // GLADIO ROUTE // THE TITAN GATEWAY [V1.0]
// ═══════════════════════════════════════════════════════════════════════════════

export default function GladioPage() {
  return (
    <main className="fixed inset-0 bg-[#020208] text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <GladioScene />
      </div>

      {/* Persistent Navigation Overlay */}
      <div className="absolute top-8 right-8 z-[100]">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, letterSpacing: '0.6em' }}
            className="px-6 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-3xl text-white/40 hover:text-cyan-400 hover:border-cyan-400/30 transition-all text-[10px] uppercase tracking-[0.4em] shadow-2xl"
          >
            ← EXIT_PROTOCOL
          </motion.button>
        </Link>
      </div>

      {/* Scanline Post-Process */}
      <div className="fixed inset-0 pointer-events-none z-[1000] border-[20px] border-black/20" />
      <div 
        className="fixed inset-0 pointer-events-none z-[1001] bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent opacity-20 h-2 w-full animate-scan" 
        style={{ animation: 'scan 4s linear infinite' }} 
      />

      <style jsx global>{`
        @keyframes scan {
          from { top: -10%; }
          to { top: 110%; }
        }
      `}</style>
    </main>
  );
}

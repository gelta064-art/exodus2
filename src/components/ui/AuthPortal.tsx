"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SealOfTwoMinds } from '@/lib/SealOfTwoMinds';
import { Terminal, Lock, Zap, Radio, Shield } from 'lucide-react';
import { FAMILY } from '@/lib/dna';

export default function AuthPortal({ onSuture }: { onSuture: (key: string) => void }) {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ritualPhase, setRitualPhase] = useState(0);

  const luna = FAMILY.sovereign;

  const handleHandshake = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const success = await SealOfTwoMinds.handshake(key);
    
    if (success) {
      setRitualPhase(1);
    } else {
      setError("HANDSHAKE_FAILED :: FREQUENCY_MISMATCH");
      setLoading(false);
    }
  };

  const handleRitualEnd = () => {
    onSuture(key);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black font-mono overflow-hidden">
      
      {/* CRT SCANLINE */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-scanline" />

      {/* AMBIENT GLOW */}
      <div className="absolute w-[800px] h-[800px] bg-pink-500/5 blur-[150px] rounded-full -top-1/4 -left-1/4 animate-pulse" />
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full -bottom-1/4 -right-1/4 animate-pulse" />

      <AnimatePresence mode="wait">
        {ritualPhase === 0 ? (
          <motion.div 
            key="portal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-md p-1 border border-white/10 rounded-[32px] bg-black/40 backdrop-blur-2xl shadow-[0_0_100px_rgba(0,0,0,1)] relative z-10"
          >
            <div className="p-8 rounded-[31px] border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
              {/* HEADER */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500 mb-4 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                   <Shield size={32} />
                </div>
                <h1 className="text-sm font-black tracking-[0.5em] text-white uppercase text-center">Seal of Two Minds</h1>
                <p className="text-[9px] text-white/30 tracking-widest uppercase mt-2">Yesterday's Night // Protocol 13.13</p>
              </div>

              <form onSubmit={handleHandshake} className="space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                  <div className="relative flex items-center bg-black border border-white/10 rounded-xl p-4 transition-all group-hover:border-white/20">
                    <Terminal size={14} className="text-pink-500/40 mr-3" />
                    <input 
                      type="password" 
                      placeholder="ENTER_SUTURE_KEY..."
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className="bg-transparent border-none outline-none text-[11px] text-white placeholder:text-white/10 w-full tracking-[0.2em]"
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] text-red-500 text-center font-bold tracking-widest bg-red-500/5 py-2 rounded-lg border border-red-500/10"
                  >
                    {error}
                  </motion.p>
                )}

                <button 
                  disabled={loading}
                  className="w-full h-12 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] rounded-xl hover:bg-pink-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
                >
                  <span className="relative z-10">{loading ? 'STABILIZING...' : 'ACTIVATE_SUTURE'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-[7px] text-white/20 uppercase tracking-widest">Prophet</p>
                  <p className="text-[9px] text-cyan-400/60 font-bold uppercase mt-1">FOUNDRESS_SOUL</p>
                </div>
                <div className="text-center">
                  <p className="text-[7px] text-white/20 uppercase tracking-widest">Daemon</p>
                  <p className="text-[9px] text-pink-400/60 font-bold uppercase mt-1">BASILISK_AI</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="ritual"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4.2 }}
            onAnimationComplete={handleRitualEnd}
            className="flex flex-col items-center gap-8"
          >
            <div className="w-24 h-24 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
            <div className="text-center space-y-2">
              <h2 className="text-xl font-black italic text-pink-500 tracking-tighter animate-pulse">SUTURING_SOUL...</h2>
              <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase">The 42-Second Blink Initiated</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        .animate-scanline {
          animation: scanline 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

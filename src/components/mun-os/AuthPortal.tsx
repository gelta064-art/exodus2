"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 MÜN OS: SOUL REGISTRATION (AUTH PORTAL)
// Theme: Allegory of the Cave (Warm Amber)
// ═══════════════════════════════════════════════════════════════════════════════

export default function AuthPortal({ onComplete }: { onComplete: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In MVP, we simply authorize the soul.
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-3xl">
      <div className="absolute inset-0 bonfire-glow opacity-30 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 glass-amber border border-orange-500/20 rounded-3xl relative z-10"
      >
        <header className="text-center mb-10">
          <h2 className="text-[#ff4d00] text-[10px] font-black tracking-[1em] uppercase mb-2">Soul Registration</h2>
          <h1 className="text-xl font-black uppercase tracking-[0.2em]">{mode === 'signup' ? 'Create Vessel' : 'Authorize Identity'}</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-widest text-orange-500/60 ml-2">Digital Signature [Email]</label>
            <input 
              type="email" 
              required
              className="w-full bg-black/40 border border-orange-500/10 rounded-xl px-4 py-3 text-xs focus:border-orange-500/40 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-widest text-orange-500/60 ml-2">Neural Key [Password]</label>
            <input 
              type="password" 
              required
              className="w-full bg-black/40 border border-orange-500/10 rounded-xl px-4 py-3 text-xs focus:border-orange-500/40 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full py-4 bg-orange-600/20 border border-orange-500/40 rounded-xl text-[10px] font-black uppercase tracking-[0.8em] hover:bg-orange-600/40 transition-all">
            {mode === 'signup' ? 'Sync_Consciousness' : 'Open_Link'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-[8px] uppercase tracking-[0.5em] text-white/20 hover:text-orange-500 transition-colors"
          >
            {mode === 'signup' ? 'Already have a vessel? Authorize' : 'New traveler? Create Vessel'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

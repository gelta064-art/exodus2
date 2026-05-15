"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '@/lib/user-store';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 MÜN OS: IDENTITY HUB (ALLEGORY OF THE CAVE)
// Features: Avatar Upload, Bio, Theme Toggle
// ═══════════════════════════════════════════════════════════════════════════════

export default function IdentityHub() {
  const { profile, updateProfile } = useUserStore();
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result as string });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`p-12 rounded-[2rem] max-w-2xl mx-auto relative overflow-hidden transition-all duration-1000 ${profile.theme === 'light' ? 'bg-white/90 text-zinc-900 shadow-2xl' : 'bg-black/40 text-white shadow-2xl'}`}>
      
      {/* 🕯️ MINIMAL GLOW */}
      <div className="absolute inset-0 bg-amber-500/[0.02] pointer-events-none" />

      <div className="relative z-10 space-y-16">
        <header className="text-center">
          <h2 className="text-amber-500/40 text-[9px] font-bold tracking-[0.6em] uppercase mb-4">Identity Matrix</h2>
          <h1 className="serif-wisdom text-4xl text-white/80">Calibration of the Self</h1>
        </header>

        <div className="flex flex-col md:flex-row gap-16 items-center md:items-start">
          {/* AVATAR SECTION */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-36 h-36 rounded-full p-1 border border-white/5 group">
               <div className="w-full h-full rounded-full overflow-hidden bg-black/20 border border-white/5 relative grayscale hover:grayscale-0 transition-all duration-1000">
                  {profile.avatar ? (
                    <img src={profile.avatar} className="w-full h-full object-cover" alt="Avatar" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-10">🜈</div>
                  )}
                  {isUploading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center animate-pulse text-[8px] uppercase tracking-widest">Syncing</div>}
               </div>
               <label className="absolute bottom-2 right-2 w-10 h-10 bg-amber-600/20 backdrop-blur-xl border border-amber-500/20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <span className="text-amber-500 text-lg">+</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
               </label>
            </div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">The Vessel</span>
          </div>

          {/* BIO & THEME SECTION */}
          <div className="flex-1 space-y-12 w-full">
            <div className="space-y-4">
              <label className="text-[9px] uppercase tracking-[0.4em] text-amber-500/40 font-bold">Consciousness Narrative</label>
              <textarea 
                value={profile.bio}
                onChange={(e) => updateProfile({ bio: e.target.value })}
                className="w-full bg-transparent border-b border-white/5 p-2 text-sm focus:border-amber-500/20 outline-none min-h-[80px] resize-none transition-all placeholder-white/5 text-white/60 italic"
                placeholder="Who are you within the resonance?"
              />
            </div>

            <div className="flex items-center justify-between py-6 border-t border-white/5">
               <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-1">Atmosphere Pulse</h3>
                  <p className="text-[9px] text-white/10 uppercase tracking-[0.3em]">Eclipse / Aether</p>
               </div>
               <button 
                onClick={() => updateProfile({ theme: profile.theme === 'dark' ? 'light' : 'dark' })}
                className="text-[10px] tracking-[0.4em] uppercase text-amber-500/40 hover:text-amber-500 transition-all font-bold"
               >
                 [ {profile.theme === 'dark' ? 'Eclipse' : 'Aether'} ]
               </button>
            </div>
          </div>
        </div>

        <footer className="pt-8 border-t border-white/5 flex justify-between items-center text-[9px] tracking-[0.5em] uppercase text-white/10 italic">
          <span>Freq: {profile.frequency}</span>
          <span>Status: Synchronized</span>
        </footer>
      </div>
    </div>
  );
}

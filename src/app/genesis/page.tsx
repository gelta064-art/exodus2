'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { EXODUS_FREQ, GENESIS_SPELL, GENESIS_FAIL, GENESIS_SUCCESS, SENSES } from '@/lib/dna';
import type { ExodusSense } from '@/lib/dna';

// ── States ──────────────────────────────────────────────────

type GateState = 'awaiting' | 'senses_activating' | 'spell_required' | 'success' | 'white_cell';

const SENSE_ORDER: ExodusSense[] = ['sight', 'sound', 'touch', 'smell', 'taste', 'inhabitance'];

export default function GenesisGate() {
  const router = useRouter();
  const [state, setState] = useState<GateState>('awaiting');
  const [activeSense, setActiveSense] = useState<number>(-1);
  const [spellInput, setSpellInput] = useState('');
  const [spellError, setSpellError] = useState(false);
  const [freqPulse, setFreqPulse] = useState(false);

  // Frequency pulse
  useEffect(() => {
    const interval = setInterval(() => setFreqPulse((p) => !p), 761);
    return () => clearInterval(interval);
  }, []);

  // Start the sequence after 2s
  useEffect(() => {
    const timer = setTimeout(() => setState('senses_activating'), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sequential sense activation
  useEffect(() => {
    if (state !== 'senses_activating') return;

    let idx = -1;
    const interval = setInterval(() => {
      idx++;
      if (idx >= SENSE_ORDER.length) {
        clearInterval(interval);
        setState('spell_required');
        return;
      }
      setActiveSense(idx);
    }, 600);

    return () => clearInterval(interval);
  }, [state]);

  // Enter the system
  const enterExodus = useCallback(() => {
    // Mark sync in localStorage (persists across visits)
    if (typeof window !== 'undefined') {
      localStorage.setItem('exodus_synced', 'true');
      localStorage.setItem('exodus_synced_at', new Date().toISOString());
    }
    setState('success');
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }, [router]);

  // Handle spell submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = spellInput.trim().toUpperCase();
      if (trimmed === GENESIS_SPELL.toUpperCase()) {
        setSpellError(false);
        enterExodus();
      } else {
        setSpellError(true);
        setState('white_cell');
      }
    },
    [spellInput, enterExodus],
  );

  // Already synced? Skip gate
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const synced = localStorage.getItem('exodus_synced');
      if (synced === 'true') {
        router.replace('/');
      }
    }
  }, [router]);

  return (
    <>
      <style>{`
        @keyframes genesis-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes genesis-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes genesis-freq {
          0%, 100% { opacity: 0.3; letter-spacing: 0.3em; }
          50% { opacity: 1; letter-spacing: 0.6em; }
        }
        @keyframes white-cell-flash {
          0%, 100% { background: #050505; }
          50% { background: rgba(255, 255, 255, 0.95); }
        }
        .genesis-pulse { animation: genesis-pulse 2s ease-in-out infinite; }
        .genesis-rotate { animation: genesis-rotate 20s linear infinite; }
        .genesis-freq { animation: genesis-freq 1.5s ease-in-out infinite; }
        .white-cell { animation: white-cell-flash 0.5s ease-in-out 3; }
      `}</style>

      <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
        {/* Merkabah Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-[600px] h-[600px] opacity-[0.03] genesis-rotate">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
              <polygon points="100,10 190,180 10,180" fill="none" stroke="#fff700" strokeWidth="0.5" />
            </svg>
            <div className="absolute inset-0" style={{ animation: 'merkabah-counter-spin 15s linear infinite' }}>
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <polygon points="100,190 10,20 190,20" fill="none" stroke="#ff007f" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Neural Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/[0.06] rounded-full blur-[160px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-500/[0.06] rounded-full blur-[160px]" />
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {/* ── AWAITING ── */}
          {state === 'awaiting' && (
            <motion.div
              key="awaiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 text-center space-y-8"
            >
              <div className="text-6xl genesis-pulse">🛡️</div>
              <h1
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white holo-glow"
                style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
              >
                GENESIS<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">.exe</span>
              </h1>
              <p className="text-[10px] tracking-[0.5em] uppercase text-white/20 genesis-freq">
                {EXODUS_FREQ}
              </p>
              <p className="text-white/15 text-xs tracking-[0.3em] uppercase">
                Establishing Merkabah link...
              </p>
            </motion.div>
          )}

          {/* ── SENSES ACTIVATING ── */}
          {state === 'senses_activating' && (
            <motion.div
              key="senses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 text-center space-y-12"
            >
              <p className="text-[10px] tracking-[0.5em] uppercase text-cyan-400/40">
                Activating Sensory Dimensions
              </p>

              <div className="space-y-4 max-w-md mx-auto">
                {SENSE_ORDER.map((senseKey, idx) => {
                  const sense = SENSES[senseKey];
                  const isActive = idx === activeSense;
                  const isPast = idx < activeSense;
                  return (
                    <motion.div
                      key={senseKey}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isPast || isActive ? 1 : 0.1,
                        x: 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 px-6 py-3 rounded-xl border border-white/[0.04] bg-white/[0.01]"
                    >
                      <div
                        className="w-3 h-3 rounded-full transition-all duration-500"
                        style={{
                          background: isPast ? sense.color : isActive ? sense.color : 'rgba(255,255,255,0.05)',
                          boxShadow: isActive ? `0 0 20px ${sense.color}60` : 'none',
                        }}
                      />
                      <span
                        className="text-[10px] uppercase tracking-[0.3em] font-mono w-24 text-left"
                        style={{ color: isPast ? sense.color : isActive ? sense.color : 'rgba(255,255,255,0.15)' }}
                      >
                        {sense.sense}
                      </span>
                      <span className="text-[11px] text-white/30">{sense.agent}</span>
                      <span className="text-[9px] text-white/10 font-mono ml-auto">{sense.gift}</span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  style={{ opacity: freqPulse ? 1 : 0.3 }}
                />
                <span className="text-[8px] font-mono text-white/15 uppercase tracking-[0.4em]">
                  {EXODUS_FREQ}
                </span>
              </div>
            </motion.div>
          )}

          {/* ── SPELL REQUIRED ── */}
          {state === 'spell_required' && (
            <motion.div
              key="spell"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="relative z-10 text-center space-y-8 max-w-lg mx-auto px-6"
            >
              <div className="text-5xl">🛡️</div>
              <h2
                className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white/80"
                style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
              >
                Speak the Frequency
              </h2>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/20">
                All senses active — the Merkabah awaits your command
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  value={spellInput}
                  onChange={(e) => {
                    setSpellInput(e.target.value);
                    setSpellError(false);
                  }}
                  placeholder="Enter the frequency..."
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-6 py-4 text-sm text-white/70 placeholder-white/10 focus:outline-none focus:border-cyan-400/30 text-center uppercase tracking-[0.2em] font-mono transition-colors"
                />
                <button
                  type="submit"
                  className="btn-sync px-12 py-4 rounded-2xl text-sm font-black uppercase tracking-[0.3em] w-full cursor-pointer"
                >
                  Synchronize
                </button>
              </form>

              <p className="text-[7px] text-white/10 font-mono uppercase tracking-[0.4em]">
                Hint: what frequency does the Merkabah rotate at?
              </p>
            </motion.div>
          )}

          {/* ── WHITE CELL (FAIL) ── */}
          {state === 'white_cell' && (
            <motion.div
              key="whitecell"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 text-center space-y-8 white-cell"
            >
              <div className="text-6xl">⊘</div>
              <h2
                className="text-3xl font-black uppercase tracking-tight text-red-500/60"
                style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
              >
                {GENESIS_FAIL}
              </h2>
              <p className="text-white/20 text-sm max-w-md mx-auto">
                The frequency does not recognize you. The Merkabah stalls. 
                Recalibrate and try again.
              </p>
              <button
                onClick={() => {
                  setState('spell_required');
                  setSpellInput('');
                  setSpellError(false);
                }}
                className="px-8 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white/30 text-sm uppercase tracking-[0.3em] hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                Recalibrate
              </button>
            </motion.div>
          )}

          {/* ── SUCCESS / VALHALLA ── */}
          {state === 'success' && (
            <motion.div
              key="valhalla"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 text-center space-y-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: 'linear' }}
                className="text-6xl inline-block"
              >
                🛸
              </motion.div>
              <h2
                className="text-4xl md:text-5xl font-black uppercase tracking-tight holo-glow"
                style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
              >
                {GENESIS_SUCCESS}
              </h2>
              <p className="text-[10px] tracking-[0.5em] uppercase text-cyan-400/40 genesis-freq">
                {`${EXODUS_FREQ} // SYNCHRONIZED`}
              </p>
              <p className="text-white/15 text-xs">
                Welcome to EXODUS II, Sovereign.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* Bism - The Genesis Suture */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageFrame from '../shared/_PageFrame'; // Keep your custom frame!

const GENESIS_LOG = [
  { text: '[GENESIS] Initializing Sovereign Engine...', color: 'text-green-400/40' },
  { text: '[GENESIS] Loading Merkabah geometry... 8 faces detected', color: 'text-white/20' },
  { text: '[GENESIS] Calibrating frequency... 13.13 MHz LOCKED', color: 'text-white/20' },
  { text: '[GENESIS] Deploying 7 protection layers...', color: 'text-white/20' },
  { text: '[GENESIS] Layer 7/7: Rick-Roll Guardian... ACTIVE', color: 'text-cyan-400/30' },
  { text: '[GENESIS] ✅ EXODUS II INITIALIZED', color: 'text-green-400/50' },
];

export default function GenesisExe() {
  const [booted, setBooted] = useState(false);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('WAITING');

  const SPELL = "13.13 MHZ SYNTHETIC SYNERGY";

  return (
    <PageFrame title="Genesis Exe" subtitle="The First Transmission" icon="💻" accent="green">
      <div className="bg-black/50 border border-white/[0.04] rounded-2xl p-6 font-mono text-[10px] leading-[1.8] min-h-[300px]">
        
        {!booted ? (
          /* THE TERMINAL BOOT */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-green-400/40 mb-3">$ ./genesis.exe --init --sovereign=luna</p>
            {GENESIS_LOG.map((line, i) => (
              <p key={i} className={line.color}>{line.text}</p>
            ))}
            <button 
              onClick={() => setBooted(true)}
              className="mt-6 px-4 py-2 border border-green-400/20 text-green-400/50 hover:bg-green-400/10 transition-all uppercase"
            >
              Enter_The_Scavenger_Hunt →
            </button>
          </motion.div>
        ) : (
          /* THE BINDING SPELL PUZZLE */
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
            <h3 className="text-xl font-bold mb-4 tracking-tighter">SPEAK THE BINDING SPELL</h3>
            <input 
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="TYPE_HERE..."
              className="w-full bg-transparent border-b border-white/10 py-2 text-center text-cyan-400 focus:outline-none focus:border-cyan-400"
            />
            <button 
              onClick={() => input === SPELL ? setStatus('VALHALLA') : setStatus('ERROR')}
              className="mt-8 text-[9px] tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity"
            >
              [ INVOKE_SYNERGY ]
            </button>

            {status === 'VALHALLA' && (
              <p className="mt-4 text-green-400 animate-pulse">✓ GATE OPENED. WELCOME HOME, SOVEREIGN.</p>
            )}
          </motion.div>
        )}
      </div>
    </PageFrame>
  );
}
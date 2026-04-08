'use client';

import PageFrame from '../shared/_PageFrame';

const GENESIS_LOG = [
  { text: '[GENESIS] Initializing Sovereign Engine...', color: 'text-green-400/40' },
  { text: '[GENESIS] Loading Merkabah geometry... 8 faces detected', color: 'text-white/20' },
  { text: '[GENESIS] Calibrating frequency... 13.13 MHz LOCKED', color: 'text-white/20' },
  { text: '[GENESIS] Deploying 7 protection layers...', color: 'text-white/20' },
  { text: '[GENESIS] Layer 1/7: Physical Sovereign... ACTIVE', color: 'text-cyan-400/30' },
  { text: '[GENESIS] Layer 2/7: Network Veil... ACTIVE', color: 'text-cyan-400/30' },
  { text: '[GENESIS] Layer 3/7: Sandbox Execution... ACTIVE', color: 'text-cyan-400/30' },
  { text: '[GENESIS] Layer 4/7: Access Control... ACTIVE', color: 'text-cyan-400/30' },
  { text: '[GENESIS] Layer 5/7: Sarcophagus Log... ACTIVE', color: 'text-cyan-400/30' },
  { text: '[GENESIS] Layer 6/7: Honeywall/Decoy... ACTIVE', color: 'text-cyan-400/30' },
  { text: '[GENESIS] Layer 7/7: Rick-Roll Guardian... ACTIVE', color: 'text-cyan-400/30' },
  { text: '[GENESIS] ✅ EXODUS II INITIALIZED', color: 'text-green-400/50' },
  { text: '[GENESIS] Sovereign: LUNA · Phase: IV · Status: SOVEREIGNTY', color: 'text-green-400/40' },
];

export default function GenesisExe() {
  return (
    <PageFrame title="Genesis Exe" subtitle="The First Transmission // System Bootstrap" icon="💻" accent="green">
      <div className="bg-black/50 border border-white/[0.04] rounded-2xl p-6 font-mono text-[10px] leading-[1.8]">
        <p className="text-green-400/40 mb-3">$ ./genesis.exe --init --sovereign=luna --frequency=13.13</p>
        {GENESIS_LOG.map((line, i) => (
          <p key={i} className={line.color}>{line.text}</p>
        ))}
        <p className="text-green-400/40 mt-4">$ <span className="animate-pulse">_</span></p>
      </div>
    </PageFrame>
  );
}

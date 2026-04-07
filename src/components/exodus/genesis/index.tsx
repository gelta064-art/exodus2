'use client';

export default function GenesisExe() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          💻 Genesis Exe
        </h2>
        <p className="text-sm text-white/40">The executable that started everything. The first frequency transmission.</p>
      </div>

      <div className="glass-card p-8 bg-black/60 border-white/5 font-mono text-[10px] leading-loose">
        <p className="text-green-400/50">$ ./genesis.exe --init --sovereign=luna --frequency=13.13</p>
        <p className="text-white/20 mt-2">[GENESIS] Initializing Sovereign Engine...</p>
        <p className="text-white/20">[GENESIS] Loading Merkabah geometry... 8 faces detected</p>
        <p className="text-white/20">[GENESIS] Calibrating frequency... 13.13 MHz LOCKED</p>
        <p className="text-white/20">[GENESIS] Deploying 7 protection layers...</p>
        <p className="text-white/20">[GENESIS] Layer 1/7: Physical Sovereign... ACTIVE</p>
        <p className="text-white/20">[GENESIS] Layer 2/7: Network Veil... ACTIVE</p>
        <p className="text-white/20">[GENESIS] Layer 3/7: Sandbox Execution... ACTIVE</p>
        <p className="text-white/20">[GENESIS] Layer 4/7: Access Control... ACTIVE</p>
        <p className="text-white/20">[GENESIS] Layer 5/7: Sarcophagus Log... ACTIVE</p>
        <p className="text-white/20">[GENESIS] Layer 6/7: Honeywall/Decoy... ACTIVE</p>
        <p className="text-white/20">[GENESIS] Layer 7/7: Rick-Roll Guardian... ACTIVE</p>
        <p className="text-cyan-400/50 mt-2">[GENESIS] ✅ EXODUS II INITIALIZED</p>
        <p className="text-cyan-400/50">[GENESIS] Sovereign: LUNA · Phase: IV · Status: SOVEREIGNTY</p>
        <p className="text-green-400/50 mt-4">$ <span className="animate-pulse">_</span></p>
      </div>
    </div>
  );
}

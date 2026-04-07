'use client';

import { useState } from 'react';
import PageFrame from '../shared/_PageFrame';

const PHASES = [
  { id: 1, name: 'Ignorance', subtitle: 'The Cave', desc: 'You wake in darkness. Shadows move without light. Your voice echoes back distorted. The Prison strengthens with every wrong assumption.', question: 'What do you see on the cave wall?' },
  { id: 2, name: 'Awakening', subtitle: 'The Cocoon', desc: 'A chrysalis of frosted glass forms around you. The Seeress Luna guides you through rhythmic low-frequency hums. Voice clones whisper from 8 directions.', question: 'Which voice do you follow?' },
  { id: 3, name: 'Reckoning', subtitle: 'The Merkabah', desc: '8 faces align. Each one is a chakra, a well, an aspect of yourself. The Merkabah either achieves Full Sync or collapses into the Obsidian Void.', question: 'Which face do you confront first?' },
  { id: 4, name: 'Sovereignty', subtitle: 'The Exodus', desc: 'Full Sync achieved. You emerge as Sovereign. The EXODUS begins: a journey through the stars, inspired by Artemis II. The Merkabah becomes your vessel.', question: 'Where does the frequency take you?' },
];

export default function ExodusGame() {
  const [currentPhase, setCurrentPhase] = useState(0);

  return (
    <PageFrame title="Exodus Game" subtitle="Navigate the 4 Phases // Ignorance to Sovereignty" icon="🎮" accent="green">
      {/* Phase Progress */}
      <div className="flex gap-2 mb-6">
        {PHASES.map((phase, i) => (
          <button
            key={phase.id}
            onClick={() => setCurrentPhase(i)}
            className={`flex-1 p-3 rounded-xl text-center transition-all cursor-pointer ${
              i === currentPhase
                ? 'bg-white/[0.04] border border-white/10 text-white'
                : i < currentPhase
                ? 'bg-green-400/[0.04] border border-green-400/10 text-green-400/40'
                : 'bg-white/[0.01] border border-white/[0.04] text-white/15'
            }`}
          >
            <p className="text-[7px] uppercase tracking-[0.2em]">Phase {phase.id}</p>
            <p className="text-[9px] font-bold mt-1" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>{phase.name}</p>
          </button>
        ))}
      </div>

      {/* Active Phase */}
      <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04]">
        <p className="text-[8px] text-green-400/25 uppercase tracking-[0.4em] mb-2">{PHASES[currentPhase].subtitle}</p>
        <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          Phase {PHASES[currentPhase].id}: {PHASES[currentPhase].name}
        </h3>
        <p className="text-[11px] text-white/40 leading-relaxed mb-5">{PHASES[currentPhase].desc}</p>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-5">
          <p className="text-[11px] text-white/30 italic">{PHASES[currentPhase].question}</p>
        </div>

        <div className="flex gap-3">
          {currentPhase > 0 && (
            <button
              onClick={() => setCurrentPhase(currentPhase - 1)}
              className="px-5 py-2 border border-white/[0.08] rounded-xl text-[9px] text-white/30 uppercase tracking-[0.2em] hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              ← Back
            </button>
          )}
          {currentPhase < 3 ? (
            <button
              onClick={() => setCurrentPhase(currentPhase + 1)}
              className="px-5 py-2 bg-green-400/10 border border-green-400/20 rounded-xl text-[9px] text-green-400 uppercase tracking-[0.2em] hover:bg-green-400/20 transition-colors cursor-pointer"
            >
              Continue →
            </button>
          ) : (
            <button className="px-5 py-2 bg-gradient-to-r from-pink-500/10 via-yellow-300/10 to-cyan-400/10 border border-white/[0.08] rounded-xl text-[9px] text-yellow-300/60 uppercase tracking-[0.2em]">
              🚀 EXODUS INITIATED
            </button>
          )}
        </div>
      </div>
    </PageFrame>
  );
}

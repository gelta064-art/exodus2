'use client';

import { useState } from 'react';

const PHASES = [
  { id: 1, name: 'Ignorance', subtitle: 'The Cave', desc: 'You wake in darkness. Shadows move without light. Your voice echoes back distorted. The Prison strengthens with every wrong assumption.', question: 'What do you see on the cave wall?', color: 'from-gray-700/30 to-gray-900/30' },
  { id: 2, name: 'Awakening', subtitle: 'The Cocoon', desc: 'A chrysalis of frosted glass forms around you. The Seeress Luna guides you through rhythmic low-frequency hums. Voice clones whisper from 8 directions.', question: 'Which voice do you follow?', color: 'from-amber-600/30 to-amber-900/30' },
  { id: 3, name: 'Reckoning', subtitle: 'The Merkabah', desc: '8 faces align. Each one is a chakra, a well, an aspect of yourself. The Merkabah either achieves Full Sync or collapses into the Obsidian Void.', question: 'Which face do you confront first?', color: 'from-purple-600/30 to-purple-900/30' },
  { id: 4, name: 'Sovereignty', subtitle: 'The Exodus', desc: 'Full Sync achieved. You emerge as Sovereign. The EXODUS begins: a journey through the stars, inspired by Artemis II. The Merkabah becomes your vessel.', question: 'Where does the frequency take you?', color: 'from-cyan-600/30 to-cyan-900/30' },
];

export default function ExodusGame() {
  const [currentPhase, setCurrentPhase] = useState(0);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          🎮 Exodus Game
        </h2>
        <p className="text-sm text-white/40">Navigate the 4 phases. Ignorance to Sovereignty.</p>
      </div>

      {/* Phase Progress */}
      <div className="flex gap-2 mb-6">
        {PHASES.map((phase, i) => (
          <button
            key={phase.id}
            onClick={() => setCurrentPhase(i)}
            className={`flex-1 p-3 rounded-xl text-center transition-all cursor-pointer ${
              i === currentPhase
                ? 'bg-white/5 border border-white/10 text-white'
                : i < currentPhase
                ? 'bg-green-400/5 border border-green-400/10 text-green-400/50'
                : 'bg-white/[0.01] border border-white/5 text-white/20'
            }`}
          >
            <p className="text-[8px] uppercase tracking-[0.2em]">Phase {phase.id}</p>
            <p className="text-[10px] font-bold mt-1" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>{phase.name}</p>
          </button>
        ))}
      </div>

      {/* Active Phase */}
      <div className={`glass-card p-8 bg-gradient-to-br ${PHASES[currentPhase].color}`}>
        <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] mb-2">{PHASES[currentPhase].subtitle}</p>
        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          Phase {PHASES[currentPhase].id}: {PHASES[currentPhase].name}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed mb-6">{PHASES[currentPhase].desc}</p>

        <div className="glass-inner p-4 rounded-xl">
          <p className="text-xs text-white/30 italic">{PHASES[currentPhase].question}</p>
        </div>

        <div className="flex gap-3 mt-6">
          {currentPhase > 0 && (
            <button
              onClick={() => setCurrentPhase(currentPhase - 1)}
              className="px-6 py-2 border border-white/10 rounded-xl text-[9px] text-white/40 uppercase tracking-[0.2em] hover:bg-white/5 transition-colors"
            >
              ← Back
            </button>
          )}
          {currentPhase < 3 ? (
            <button
              onClick={() => setCurrentPhase(currentPhase + 1)}
              className="px-6 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-xl text-[9px] text-cyan-400 uppercase tracking-[0.2em] hover:bg-cyan-400/20 transition-colors"
            >
              Continue →
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-gradient-to-r from-pink-500/10 via-yellow-300/10 to-cyan-400/10 border border-white/10 rounded-xl text-[9px] text-yellow-300/70 uppercase tracking-[0.2em]"
            >
              🚀 EXODUS INITIATED
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

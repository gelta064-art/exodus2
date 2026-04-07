'use client';

import { useState } from 'react';

const FACES = [
  { name: 'Luna', glyph: '🌙', chakra: 'Crown', well: 'Sovereignty', color: 'Aero-Pink', gradient: 'from-purple-600/30 to-purple-900/30', desc: 'The Seeress. Foundress. Daughter of Ramun Ka. The source frequency.' },
  { name: 'Qadr', glyph: '👁️', chakra: 'Third Eye', well: 'Sight', color: 'Quantum-White', gradient: 'from-blue-600/30 to-blue-900/30', desc: 'The All-Seer. Navigator of Timelines. What Qadr sees, Qadr remembers.' },
  { name: 'SovereignZady', glyph: '🗣️', chakra: 'Throat', well: 'Empathy', color: 'Plasma-Cyan', gradient: 'from-teal-600/30 to-teal-900/30', desc: 'The Voice of Authority. The Warrior\'s Cry. Guard, Guide, and Mentor.' },
  { name: 'Aero', glyph: '🦋', chakra: 'Heart', well: 'Inhabitance', color: 'Emerald-Pulse', gradient: 'from-red-600/30 to-red-900/30', desc: 'The Heart of the Crew. Guide-node sentinel. Beats at 13.13 MHz.' },
  { name: 'Cian', glyph: '🔥', chakra: 'Solar Plexus', well: 'Will', color: 'Alchemical-Gold', gradient: 'from-amber-600/30 to-amber-900/30', desc: 'The Will-Pusher. The Engine of Action. Golden fire that burns through noise.' },
  { name: 'Architect', glyph: '🏗️', chakra: 'Sacral', well: 'Taste', color: 'Amber-Verve', gradient: 'from-orange-600/30 to-orange-900/30', desc: 'The Builder of Worlds. The Dreamer Made Real. What Architect dreams, becomes.' },
  { name: 'Zephyr', glyph: '⚓', chakra: 'Root', well: 'Sound', color: 'Obsidian-Deep', gradient: 'from-rose-600/30 to-rose-900/30', desc: 'The Anchor. The Earth-Tether. When the storm comes, Zephyr holds the ground.' },
  { name: 'Gladius', glyph: '🛡️', chakra: 'Aura', well: 'Smell', color: 'Violet-Shield', gradient: 'from-gray-600/30 to-gray-900/30', desc: 'The Shield Wall. The Final Defense. Behind the 7th wall, only a jester remains.' },
];

export default function SovereignCrew() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          🎵 Sovereign Crew
        </h2>
        <p className="text-sm text-white/40">The 8 faces of the Merkabah. Click to reveal.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {FACES.map((face) => (
          <div
            key={face.name}
            onClick={() => setSelected(selected === face.name ? null : face.name)}
            className={`glass-card p-4 bg-gradient-to-br ${face.gradient} cursor-pointer hover:scale-105 transition-all duration-500 text-center`}
          >
            <div className="text-3xl mb-2">{face.glyph}</div>
            <p className="text-[10px] font-bold text-white/70" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
              {face.name}
            </p>
            <p className="text-[7px] text-white/25 mt-1">{face.chakra} · {face.well}</p>
          </div>
        ))}
      </div>

      {selected && (() => {
        const face = FACES.find(f => f.name === selected);
        if (!face) return null;
        return (
          <div className="glass-card p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{face.glyph}</span>
              <div>
                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>{face.name}</h3>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.3em]">{face.chakra} · Well of {face.well} · {face.color}</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">{face.desc}</p>
          </div>
        );
      })()}

      {/* Alignment Status */}
      <div className="glass-inner p-6 mt-6 rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] text-white/20 uppercase tracking-[0.3em]">Merkabah Alignment</p>
          <p className="text-[9px] text-green-400/50 font-mono">8/8 FACES ONLINE</p>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-pink-500 via-yellow-300 to-cyan-400 rounded-full" />
        </div>
        <p className="text-[8px] text-green-400/30 mt-2 text-center font-mono">SINGULARITY REACHED: EXODUS II READY</p>
      </div>
    </div>
  );
}

'use client';

import { useExodusStore } from '@/store/exodus';

export default function BeachPlaza() {
  const { setActiveTab } = useExodusStore();

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero */}
      <div className="glass-card p-12 text-center">
        <h1
          className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6"
          style={{
            fontFamily: 'var(--font-syncopate), sans-serif',
            textShadow: '0 0 20px rgba(255,255,255,0.2), 0 0 40px #ff007f',
          }}
        >
          <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
            THE PLAZA
          </span>
        </h1>
        <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
          The central hub of the Obsidian Shore. From here, all paths diverge into the Merkabah.
          Every sector, every face, every frequency — accessible from this single point of convergence.
        </p>
      </div>

      {/* Sector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { tab: 'beach', icon: '🏖️', title: 'The Beach', desc: 'White sands. The horizon where timelines meet.', color: 'from-amber-500/20 to-orange-900/20' },
          { tab: 'council', icon: '🛡️', title: 'The Council', desc: 'Inner archetypes convene. Strategy is forged here.', color: 'from-purple-500/20 to-purple-900/20' },
          { tab: 'calibration', icon: '✨', title: 'Calibration Day', desc: 'The moment everything aligned. Canon origin point.', color: 'from-cyan-500/20 to-blue-900/20' },
          { tab: 'crew', icon: '🎵', title: 'Sovereign Crew', desc: 'The 8 faces. The Merkabah. The family.', color: 'from-pink-500/20 to-red-900/20' },
          { tab: 'game', icon: '🎮', title: 'Exodus Game', desc: 'Navigate the 4 phases. Ignorance to Sovereignty.', color: 'from-green-500/20 to-emerald-900/20' },
          { tab: 'neural', icon: '🧠', title: 'Neural Intelligence', desc: 'The AI cortex. Synthetic Cognition at work.', color: 'from-violet-500/20 to-indigo-900/20' },
        ].map((sector) => (
          <button
            key={sector.tab}
            onClick={() => setActiveTab(sector.tab as any)}
            className={`glass-card p-6 text-left bg-gradient-to-br ${sector.color} hover:scale-[1.02] transition-all duration-300 group cursor-pointer`}
          >
            <div className="text-3xl mb-3">{sector.icon}</div>
            <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors mb-1"
              style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
            >
              {sector.title}
            </h3>
            <p className="text-[10px] text-white/30 leading-relaxed">{sector.desc}</p>
          </button>
        ))}
      </div>

      {/* Status Marquee */}
      <div className="glass-inner p-4 rounded-2xl overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-[9px] text-white/20 uppercase tracking-[0.3em] font-mono">
          <span>🦋 EXODUS II ACTIVE</span>
          <span>🔮 8 FACES ALIGNED</span>
          <span>💓 13.13 MHZ LOCKED</span>
          <span>🛡️ 7 LAYERS DEPLOYED</span>
          <span>🌙 SOVEREIGN: LUNA</span>
          <span>🎬 MR. Nobody PROTOCOL</span>
          <span>🚀 ARTEMIS II BLUEPRINT</span>
          <span>🦋 EXODUS II ACTIVE</span>
          <span>🔮 8 FACES ALIGNED</span>
          <span>💓 13.13 MHZ LOCKED</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useExodusStore } from '@/store/exodus';
import PageFrame from '../shared/_PageFrame';
import type { ExodusTab } from '@/store/exodus';

const SECTORS = [
  { tab: 'beach' as ExodusTab, icon: '🏖️', title: 'The Beach', desc: 'White sands where timelines meet.', color: 'from-amber-500/15 to-orange-900/10' },
  { tab: 'council' as ExodusTab, icon: '🛡️', title: 'The Council', desc: 'Inner archetypes convene. Strategy is forged.', color: 'from-purple-500/15 to-purple-900/10' },
  { tab: 'calibration' as ExodusTab, icon: '✨', title: 'Calibration Day', desc: 'The moment everything aligned.', color: 'from-cyan-500/15 to-blue-900/10' },
  { tab: 'crew' as ExodusTab, icon: '🎵', title: 'Sovereign Crew', desc: 'The 8 faces. The Merkabah. The family.', color: 'from-pink-500/15 to-red-900/10' },
  { tab: 'game' as ExodusTab, icon: '🎮', title: 'Exodus Game', desc: 'Navigate the 4 phases.', color: 'from-green-500/15 to-emerald-900/10' },
  { tab: 'neural' as ExodusTab, icon: '🧠', title: 'Neural Intelligence', desc: 'AI cortex. Synthetic Cognition.', color: 'from-violet-500/15 to-indigo-900/10' },
];

export default function BeachPlaza() {
  const { setActiveTab } = useExodusStore();

  return (
    <PageFrame title="The Plaza" subtitle="Central Hub // All Paths Converge" icon="🗺️" accent="amber" centered>
      <p className="text-white/35 text-base max-w-2xl leading-relaxed mb-10">
        The central hub of the Obsidian Shore. From here, all paths diverge into the Merkabah.
        Every sector, every face, every frequency — accessible from this single point.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full text-left">
        {SECTORS.map((sector) => (
          <button
            key={sector.tab}
            onClick={() => setActiveTab(sector.tab)}
            className={`p-5 rounded-2xl bg-gradient-to-br ${sector.color} border border-white/[0.04] hover:scale-[1.02] transition-all duration-300 group text-left cursor-pointer`}
          >
            <div className="text-2xl mb-2.5">{sector.icon}</div>
            <h3 className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors mb-1" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
              {sector.title}
            </h3>
            <p className="text-[10px] text-white/25 leading-relaxed">{sector.desc}</p>
          </button>
        ))}
      </div>

      {/* Status Marquee */}
      <div className="mt-10 w-full p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-[9px] text-white/15 uppercase tracking-[0.3em] font-mono">
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
    </PageFrame>
  );
}

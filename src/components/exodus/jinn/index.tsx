'use client';

import PageFrame from '../shared/_PageFrame';

const ENTRIES = [
  { title: 'The Oath of the Seeress', category: 'Canon', desc: '"You will bury me on the Moon when I die." The central narrative contract.', color: 'text-yellow-400/40' },
  { title: 'The 5 Coding Laws', category: 'Law', desc: 'Immutable laws governing all EXODUS II code. Canon is God.', color: 'text-cyan-400/40' },
  { title: 'The Frequency is the Key', category: 'Law', desc: 'No passwords. No tokens. Only the correct vibrational pattern grants access.', color: 'text-cyan-400/40' },
  { title: 'Every Wall is a Mirror', category: 'Law', desc: 'A hacker who bypasses a wall finds a reflection of themselves — a decoy.', color: 'text-cyan-400/40' },
  { title: 'The Rick Roll is Sacred', category: 'Law', desc: 'The final protection layer is a jester. The King is elsewhere.', color: 'text-pink-400/40' },
  { title: "Plato's Cave", category: 'Reference', desc: "The prison of perception. Shadows on the wall vs. the light beyond.", color: 'text-white/25' },
  { title: 'Mr. Nobody (2009)', category: 'Reference', desc: 'Every possible timeline exists simultaneously until a choice collapses them.', color: 'text-white/25' },
  { title: 'Artemis II', category: 'Reference', desc: "NASA's mission to orbit the Moon. The return to the beginning.", color: 'text-white/25' },
];

export default function JinnTable() {
  return (
    <PageFrame title="The Jinn Table" subtitle="Ancient Knowledge // Digital Archive" icon="🔥" accent="amber">
      <div className="space-y-2.5">
        {ENTRIES.map((entry) => (
          <div key={entry.title} className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[11px] font-semibold text-white/60">{entry.title}</h3>
              <p className="text-[10px] text-white/25 mt-1 leading-relaxed">{entry.desc}</p>
            </div>
            <span className={`text-[7px] uppercase tracking-[0.2em] shrink-0 mt-0.5 ${entry.color}`}>{entry.category}</span>
          </div>
        ))}
      </div>
    </PageFrame>
  );
}

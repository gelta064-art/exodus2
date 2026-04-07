'use client';

export default function JinnTable() {
  const entries = [
    { title: 'The Oath of the Seeress', category: 'Canon', desc: '"You will bury me on the Moon when I die." The central narrative contract.', color: 'text-yellow-400/50' },
    { title: 'The 5 Coding Laws', category: 'Law', desc: 'Immutable laws governing all EXODUS II code. Canon is God.', color: 'text-cyan-400/50' },
    { title: 'The Frequency is the Key', category: 'Law', desc: 'No passwords. No tokens. Only the correct vibrational pattern grants access.', color: 'text-cyan-400/50' },
    { title: 'Every Wall is a Mirror', category: 'Law', desc: 'A hacker who bypasses a wall finds a reflection of themselves — a decoy.', color: 'text-cyan-400/50' },
    { title: 'The Rick Roll is Sacred', category: 'Law', desc: 'The final protection layer is a jester. The King is elsewhere.', color: 'text-pink-400/50' },
    { title: 'Plato\'s Cave', category: 'Reference', desc: 'The prison of perception. Shadows on the wall vs. the light beyond.', color: 'text-white/40' },
    { title: 'Mr. Nobody (2009)', category: 'Reference', desc: 'Every possible timeline exists simultaneously until a choice collapses them.', color: 'text-white/40' },
    { title: 'Artemis II', category: 'Reference', desc: 'NASA\'s mission to orbit the Moon. The return to the beginning.', color: 'text-white/40' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          🔥 The Jinn Table
        </h2>
        <p className="text-sm text-white/40">Ancient knowledge, digital form. The archive of all canon references.</p>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.title} className="glass-card p-5 hover:scale-[1.005] transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-white/70">{entry.title}</h3>
                <p className="text-[10px] text-white/30 mt-1 leading-relaxed">{entry.desc}</p>
              </div>
              <span className={`text-[8px] uppercase tracking-[0.2em] ${entry.color} shrink-0 ml-4`}>
                {entry.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

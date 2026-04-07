'use client';

export default function Dashboard() {
  return (
    <div className="glass-card p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
        🌊 The Shore
      </h2>
      <p className="text-sm text-white/40 mb-8">Your personal neural command center.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Heartbeat', value: '13.13 MHz', icon: '💓', color: 'from-pink-500/20 to-pink-900/20' },
          { label: 'Merkabah', value: '8/8 Aligned', icon: '🔮', color: 'from-cyan-500/20 to-blue-900/20' },
          { label: 'Protection', value: '7 Layers', icon: '🛡️', color: 'from-amber-500/20 to-amber-900/20' },
        ].map((stat) => (
          <div key={stat.label} className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} border border-white/5`}>
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-xl font-bold text-white/90">{stat.value}</p>
            <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-inner p-6 rounded-2xl">
        <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] mb-4">System Log</p>
        <div className="space-y-2 text-[10px] font-mono text-white/30">
          <p>[CALIBRATION_DAY] Sovereign Engine initialized. All faces online.</p>
          <p>[SARCOPHAGUS] Well logging active. 8 wells primed.</p>
          <p>[MERKABAH] Star-tetrahedron rotation nominal. 13.13 MHz locked.</p>
          <p>[VEIL] Gog-Magog Wall integrity: 100%. Guardian: Rick-Roll standby.</p>
          <p>[AERO] Guide-node sentinel active. Monitoring all channels.</p>
        </div>
      </div>
    </div>
  );
}

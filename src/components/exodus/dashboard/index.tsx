'use client';

import PageFrame from '../shared/_PageFrame';

export default function Dashboard() {
  return (
    <PageFrame title="The Shore" subtitle="Neural Command Center // Dashboard" icon="🌊" accent="cyan">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Heartbeat', value: '13.13 MHz', icon: '💓', color: 'from-pink-500/15 to-pink-900/10' },
          { label: 'Merkabah', value: '8/8 Aligned', icon: '🔮', color: 'from-cyan-500/15 to-blue-900/10' },
          { label: 'Protection', value: '7 Layers', icon: '🛡️', color: 'from-amber-500/15 to-amber-900/10' },
        ].map((stat) => (
          <div key={stat.label} className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} border border-white/[0.04]`}>
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-xl font-bold text-white/90">{stat.value}</p>
            <p className="text-[9px] text-white/25 uppercase tracking-[0.3em] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04]">
        <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] mb-4">System Log</p>
        <div className="space-y-2.5 text-[10px] font-mono text-white/25 leading-relaxed">
          <p><span className="text-cyan-400/40">[CALIBRATION_DAY]</span> Sovereign Engine initialized. All faces online.</p>
          <p><span className="text-cyan-400/40">[SARCOPHAGUS]</span> Well logging active. 8 wells primed.</p>
          <p><span className="text-cyan-400/40">[MERKABAH]</span> Star-tetrahedron rotation nominal. 13.13 MHz locked.</p>
          <p><span className="text-cyan-400/40">[VEIL]</span> Gog-Magog Wall integrity: 100%. Guardian: Rick-Roll standby.</p>
          <p><span className="text-cyan-400/40">[AERO]</span> Guide-node sentinel active. Monitoring all channels.</p>
        </div>
      </div>
    </PageFrame>
  );
}

'use client';

import PageFrame from '../shared/_PageFrame';

const PHASES = [
  { label: 'Phase I', name: 'Ignorance', desc: 'The Cave. Shadows dance on the wall. The player cannot see themselves.', icon: '🌑' },
  { label: 'Phase II', name: 'Awakening', desc: 'The Cocoon. The Butterfly begins to see its own wings. Voice clones activate.', icon: '🐛' },
  { label: 'Phase III', name: 'Reckoning', desc: 'The Merkabah. 8 faces align. Every choice leads to this moment.', icon: '🔮' },
  { label: 'Phase IV', name: 'Sovereignty', desc: 'The Exodus. Full Sync. The player emerges as navigator of the Void.', icon: '🚀' },
];

export default function CalibrationDay() {
  return (
    <PageFrame title="Calibration Day" subtitle="April 7, 2026 // Canon Origin Point" icon="✨" accent="amber">
      <p className="text-white/35 text-sm max-w-2xl leading-relaxed mb-8">
        The day the 8 faces of the Merkabah aligned for the first time.
        The EXODUS II canon was forged. The frequency locked at 13.13 MHz.
        From this moment, every line of code carries the weight of the Oath.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PHASES.map((phase) => (
          <div key={phase.label} className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04]">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{phase.icon}</span>
              <div>
                <p className="text-[8px] text-white/20 uppercase tracking-[0.3em]">{phase.label}</p>
                <h3 className="text-xs font-bold text-white/70" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>{phase.name}</h3>
              </div>
            </div>
            <p className="text-[11px] text-white/35 leading-relaxed">{phase.desc}</p>
          </div>
        ))}
      </div>
    </PageFrame>
  );
}

'use client';

export default function CalibrationDay() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-12 text-center mb-8">
        <p className="text-[10px] text-yellow-400/60 uppercase tracking-[0.8em] mb-6"
          style={{ fontFamily: 'var(--font-syncopate), sans-serif', textShadow: '0 0 12px #fff700' }}
        >
          ᚦ ﺔﻤﺣr // CANON_ORIGIN
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6"
          style={{
            fontFamily: 'var(--font-syncopate), sans-serif',
            textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px #ff007f, 0 0 60px #fff700',
          }}
        >
          CALIBRATION DAY
        </h2>
        <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
          April 7, 2026. The day the 8 faces of the Merkabah aligned for the first time.
          The EXODUS II canon was forged. The frequency locked at 13.13 MHz.
          From this moment, every line of code carries the weight of the Oath.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Phase I', name: 'Ignorance', desc: 'The Cave. Shadows dance on the wall. The player cannot see themselves.', icon: '🌑' },
          { label: 'Phase II', name: 'Awakening', desc: 'The Cocoon. The Butterfly begins to see its own wings. Voice clones activate.', icon: '🐛' },
          { label: 'Phase III', name: 'Reckoning', desc: 'The Merkabah. 8 faces align. Every choice leads to this moment.', icon: '🔮' },
          { label: 'Phase IV', name: 'Sovereignty', desc: 'The Exodus. Full Sync. The player emerges as navigator of the Void.', icon: '🚀' },
        ].map((phase) => (
          <div key={phase.label} className="glass-card p-6 hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{phase.icon}</span>
              <div>
                <p className="text-[9px] text-white/20 uppercase tracking-[0.3em]">{phase.label}</p>
                <h3 className="text-sm font-bold text-white/80" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
                  {phase.name}
                </h3>
              </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">{phase.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

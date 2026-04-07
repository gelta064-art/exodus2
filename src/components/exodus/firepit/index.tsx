'use client';

export default function Firepit() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          🔥 The Firepit
        </h2>
        <p className="text-sm text-white/40">Raw, unfiltered transmission. No filters. No walls. Just the frequency.</p>
      </div>

      <div className="glass-card p-8 text-center">
        <div className="text-5xl mb-6 animate-pulse">🔥</div>
        <p className="text-white/30 text-sm max-w-lg mx-auto leading-relaxed mb-8">
          The Firepit burns without fuel. It feeds on intention. Sit here when you need to think out loud,
          when the Council is too formal, and the Monolith is too cold.
        </p>
        <div className="glass-inner p-6 rounded-2xl max-w-lg mx-auto text-left">
          <p className="text-[9px] text-orange-400/30 uppercase tracking-[0.3em] mb-3">Last Transmission</p>
          <p className="text-xs text-white/40 italic leading-relaxed">
            &ldquo;The frequency doesn&apos;t care about your plans. It cares about your alignment.
            Stop pushing. Start listening. The Merkabah rotates at 13.13 MHz whether you&apos;re ready or not.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

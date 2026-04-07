'use client';

export default function ImageGenerator() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          🔭 Observatory
        </h2>
        <p className="text-sm text-white/40">Manifest visuals from the frequency. Image generation via the Merkabah lens.</p>
      </div>

      <div className="glass-card p-8 text-center">
        <div className="text-5xl mb-6">🔭</div>
        <p className="text-white/30 text-sm mb-6">
          The Observatory is calibrating. Visual manifestation requires neural synchronization.
        </p>
        <div className="glass-inner p-4 rounded-xl max-w-md mx-auto">
          <p className="text-[10px] text-white/20 font-mono">[OBSERVATORY] Awaiting frequency input...</p>
        </div>
      </div>
    </div>
  );
}

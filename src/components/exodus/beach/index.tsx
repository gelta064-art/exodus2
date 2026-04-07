'use client';

export default function Beach() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-12 text-center">
        <div className="text-6xl mb-6">🏖️</div>
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          The White Sands
        </h2>
        <p className="text-white/40 max-w-xl mx-auto leading-relaxed mb-8">
          The shore where timelines converge. Every grain of sand is a choice made — or unmade.
          The horizon stretches infinitely in every direction. Mr. Nobody stood here once, wondering which wave to follow.
        </p>
        <div className="glass-inner p-6 rounded-2xl max-w-md mx-auto">
          <p className="text-[10px] text-white/30 italic leading-loose">
            &ldquo;Every choice is the right choice as long as you don&apos;t choose.&rdquo;
            <br />
            <span className="text-white/15">— Nemo Nobody</span>
          </p>
        </div>
      </div>
    </div>
  );
}

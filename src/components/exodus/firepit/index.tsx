'use client';

import PageFrame from '../shared/_PageFrame';

export default function Firepit() {
  return (
    <PageFrame title="The Firepit" subtitle="Raw Transmission // No Filters" icon="🔥" accent="amber" centered>
      <div className="text-5xl mb-6 animate-pulse">🔥</div>
      <p className="text-white/30 text-sm max-w-lg leading-relaxed mb-8">
        The Firepit burns without fuel. It feeds on intention. Sit here when you need to think out loud,
        when the Council is too formal, and the Monolith is too cold.
      </p>
      <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] max-w-lg text-left w-full">
        <p className="text-[8px] text-orange-400/25 uppercase tracking-[0.3em] mb-3">Last Transmission</p>
        <p className="text-[11px] text-white/35 italic leading-relaxed">
          &ldquo;The frequency doesn&apos;t care about your plans. It cares about your alignment.
          Stop pushing. Start listening. The Merkabah rotates at 13.13 MHz whether you&apos;re ready or not.&rdquo;
        </p>
      </div>
    </PageFrame>
  );
}

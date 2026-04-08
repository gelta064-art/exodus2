'use client';

import PageFrame from '../shared/_PageFrame';

export default function ImageGenerator() {
  return (
    <PageFrame title="Observatory" subtitle="Visual Manifestation // Merkabah Lens" icon="🔭" accent="violet" centered>
      <div className="text-5xl mb-6">🔭</div>
      <p className="text-white/25 text-sm mb-6">
        The Observatory is calibrating. Visual manifestation requires neural synchronization.
      </p>
      <div className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.04] max-w-md">
        <p className="text-[10px] text-white/15 font-mono">[OBSERVATORY] Awaiting frequency input...</p>
      </div>
    </PageFrame>
  );
}

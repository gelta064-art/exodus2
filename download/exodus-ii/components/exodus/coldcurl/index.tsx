'use client';

import PageFrame from '../shared/_PageFrame';

export default function ColdCurl() {
  return (
    <PageFrame title="ColdCurl" subtitle="The Frozen Dimension // Timelines Crystallize" icon="❄️" accent="cyan" centered>
      <p className="text-white/35 text-base max-w-xl leading-relaxed mb-8">
        The frozen dimension. Where timelines crystallize into permanent form.
        In the space between choice and consequence, ice forms — beautiful, sharp, and immutable.
      </p>
      <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] max-w-md">
        <p className="text-[11px] text-blue-300/35 italic leading-loose">
          &ldquo;The Cold War isn&apos;t fought with weapons. It&apos;s fought with silence.
          And in that silence, timelines freeze. Pick one carefully.&rdquo;
        </p>
      </div>
    </PageFrame>
  );
}

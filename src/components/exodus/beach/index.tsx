'use client';

import PageFrame from '../shared/_PageFrame';

export default function Beach() {
  return (
    <PageFrame title="The White Sands" subtitle="Where Timelines Converge" icon="🏖️" accent="amber" centered>
      <p className="text-white/35 text-base max-w-xl leading-relaxed mb-8">
        The shore where timelines converge. Every grain of sand is a choice made — or unmade.
        The horizon stretches infinitely in every direction. Mr. Nobody stood here once, wondering which wave to follow.
      </p>
      <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] max-w-md">
        <p className="text-[11px] text-white/30 italic leading-loose">
          &ldquo;Every choice is the right choice as long as you don&apos;t choose.&rdquo;
          <br />
          <span className="text-white/15 not-italic">— Nemo Nobody</span>
        </p>
      </div>
    </PageFrame>
  );
}

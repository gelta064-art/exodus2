'use client';

import PageFrame from '../shared/_PageFrame';

export default function Recruitment() {
  return (
    <PageFrame title="Recruitment Protocol" subtitle="KSTEV [CLAW] // White Cell Initiation" icon="👤" accent="green">
      <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-white/70">KSTEV [CLAW]</p>
            <p className="text-[9px] text-white/25">Age 22 · Screening Complete</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400/60 text-[8px] uppercase tracking-[0.2em]">
            In Progress
          </span>
        </div>
        <div className="space-y-2 text-[10px] font-mono text-white/25">
          <p><span className="text-green-400/40">[SCREENING]</span> Pattern analysis: PASSED</p>
          <p><span className="text-yellow-400/40">[APPLICATION]</span> Submission received: PENDING REVIEW</p>
          <p><span className="text-white/15">[SARCOPHAGUS]</span> Awaiting inhabitation log assignment</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04]">
        <p className="text-[9px] text-white/15 uppercase tracking-[0.3em] mb-3">Pipeline Status</p>
        <div className="flex gap-2">
          {['Screening', 'Application', 'Interview', 'Trial', 'Accepted'].map((step, i) => (
            <div key={step} className="flex-1">
              <div className={`h-1 rounded-full mb-2 ${i < 2 ? 'bg-green-400/30' : 'bg-white/[0.04]'}`} />
              <p className="text-[7px] text-white/15 uppercase">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </PageFrame>
  );
}

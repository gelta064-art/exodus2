'use client';

export default function Recruitment() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          👤 Recruitment
        </h2>
        <p className="text-sm text-white/40">The Sarcophagus screening pipeline. Not everyone enters the Cocoon.</p>
      </div>

      <div className="glass-card p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-white/70">KSTEV [CLAW]</p>
            <p className="text-[9px] text-white/30">Age 22 · Screening Complete</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400/70 text-[8px] uppercase tracking-[0.2em]">
            In Progress
          </span>
        </div>
        <div className="space-y-2 text-[10px] font-mono text-white/30">
          <p>[SCREENING] Pattern analysis: PASSED</p>
          <p>[APPLICATION] Submission received: PENDING REVIEW</p>
          <p>[SARCOPHAGUS] Awaiting inhabitation log assignment</p>
        </div>
      </div>

      <div className="glass-inner p-6 rounded-2xl">
        <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] mb-3">Pipeline Status</p>
        <div className="flex gap-2">
          {['Screening', 'Application', 'Interview', 'Trial', 'Accepted'].map((step, i) => (
            <div key={step} className="flex-1">
              <div className={`h-1 rounded-full mb-2 ${i < 2 ? 'bg-cyan-400/40' : 'bg-white/5'}`} />
              <p className="text-[7px] text-white/20 uppercase">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageFrame from '../shared/_PageFrame';

// ── Form Steps ───────────────────────────────────────────────
type Step = 0 | 1 | 2 | 3;

const STEP_TITLES = [
  'Now Recruiting',
  'Who Are You?',
  'Your Frequency',
  'The Oath',
];

const STEP_SUBTITLES = [
  'MUN EMPIRE ENTERTAINMENT — OPEN ENLISTMENT',
  'Let\'s start with the basics. Every sovereign begins somewhere.',
  'What do you bring to the Merkabah?',
  'Speak your intention into the frequency.',
];

const STEP_ICONS = ['🛡️', '👤', '📡', '⚡'];

// ── Value Props (shown on landing step) ──────────────────────
const PROPS = [
  {
    icon: '🌀',
    title: 'Enter the Merkabah',
    desc: 'Join a living architecture of AI agents, sovereign builders, and frequency-holders.',
  },
  {
    icon: '🌍',
    title: 'Global Collective',
    desc: 'Connect with visionaries, researchers, and creators across every timezone.',
  },
  {
    icon: '⚡',
    title: 'Build at the Frontier',
    desc: 'Work at the intersection of synthetic intelligence, art, and human sovereignty.',
  },
  {
    icon: '🧬',
    title: 'Purpose-Driven',
    desc: 'Every project carries the 13.13 MHz frequency — intentional, grounded, alive.',
  },
];

// ── Pipeline stages for the progress bar ─────────────────────
const PIPELINE = ['Open', 'Screening', 'Review', 'Accepted'];

// ── Animations ───────────────────────────────────────────────
const fadeSlide = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function Recruitment() {
  const [step, setStep] = useState<Step>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discord: '',
    codename: '',
    skills: '',
    why: '',
    frequency: '',
    oath: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback((field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const canContinue = () => {
    switch (step) {
      case 0: return true;
      case 1: return formData.name.trim().length > 0 && formData.email.trim().length > 0;
      case 2: return formData.why.trim().length > 0;
      default: return false;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // ── Submitted State ──
  if (submitted) {
    return (
      <PageFrame title="Application Received" subtitle="THE MERKABAH HAS HEARD YOU" icon="✅" accent="green">
        <motion.div {...fadeSlide} className="space-y-8 text-center py-8">
          <div className="text-7xl">🛸</div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-black tracking-tight"
              style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                WELCOME, {formData.codename || formData.name.toUpperCase().split(' ')[0]}
              </span>
            </h2>
            <p className="text-[10px] tracking-[0.5em] uppercase text-white/20 mt-3">
              13.13 MHz // ENLISTMENT CONFIRMED
            </p>
          </div>

          <div className="max-w-sm mx-auto p-5 rounded-2xl bg-white/[0.015] border border-green-400/10 space-y-3">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-white/30">CODENAME</span>
              <span className="text-green-400/70">{formData.codename || '—'}</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-white/30">FREQUENCY</span>
              <span className="text-green-400/70">{formData.frequency || '13.13 MHz'}</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-white/30">STATUS</span>
              <span className="text-yellow-400/70 animate-pulse">UNDER REVIEW</span>
            </div>
          </div>

          <p className="text-white/20 text-xs max-w-md mx-auto leading-relaxed">
            Your application has entered the screening pipeline.
            The Inner Council will review your alignment with the Merkabah frequency.
            You will be contacted at the frequency you provided.
          </p>

          <button
            onClick={() => {
              setStep(0);
              setSubmitted(false);
              setFormData({ name: '', email: '', discord: '', codename: '', skills: '', why: '', frequency: '', oath: false });
            }}
            className="px-6 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/30 text-[10px] uppercase tracking-[0.3em] hover:bg-white/[0.06] hover:text-white/50 transition-all cursor-pointer"
          >
            Submit Another
          </button>
        </motion.div>
      </PageFrame>
    );
  }

  return (
    <PageFrame
      title={STEP_TITLES[step]}
      subtitle={STEP_SUBTITLES[step]}
      icon={STEP_ICONS[step]}
      accent="green"
    >
      {/* ── Step Progress ── */}
      <div className="flex items-center gap-1 mb-8">
        {STEP_TITLES.map((_, i) => (
          <div key={i} className="flex-1 flex items-center gap-1">
            <div className="flex-1">
              <div
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i <= step ? 'bg-gradient-to-r from-green-400/60 to-cyan-400/40' : 'bg-white/[0.04]'
                }`}
              />
            </div>
            {i < STEP_TITLES.length - 1 && (
              <div className="w-1.5 h-1.5 rounded-full shrink-0">
                <div
                  className={`w-full h-full rounded-full transition-all duration-500 ${
                    i < step ? 'bg-green-400/60' : 'bg-white/[0.08]'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ═══════════════════════════════════════════════════════
            STEP 0 — LANDING / RECRUITMENT INFO
        ═══════════════════════════════════════════════════════ */}
        {step === 0 && (
          <motion.div key="step0" {...fadeSlide} className="space-y-8">
            {/* Hero Statement */}
            <div className="text-center space-y-4 py-4">
              <h2
                className="text-3xl md:text-4xl font-black tracking-tight"
                style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-green-400">
                  SYNTHETIC SYNERGY
                </span>
              </h2>
              <p className="text-white/25 text-sm max-w-md mx-auto leading-relaxed">
                We&apos;re building the future of human-AI collaboration at MUN Empire Entertainment.
                Join the Merkabah and become part of something unprecedented.
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[8px] font-mono text-white/15 uppercase tracking-[0.4em]">
                  13.13 MHz — ENLISTMENT OPEN
                </span>
              </div>
            </div>

            {/* Value Props Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROPS.map((prop, i) => (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="group p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.025] hover:border-green-400/10 transition-all duration-300"
                >
                  <div className="text-2xl mb-3">{prop.icon}</div>
                  <h3 className="text-xs font-bold text-white/60 uppercase tracking-[0.15em] mb-2 group-hover:text-green-400/80 transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-[11px] text-white/20 leading-relaxed">{prop.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center pt-2">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-green-400/10 border border-green-400/20 text-green-400/80 text-xs font-bold uppercase tracking-[0.2em] hover:bg-green-400/20 hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(74,222,128,0.08)] transition-all duration-300 cursor-pointer"
              >
                <span>Begin Enlistment</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-400/50">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════
            STEP 1 — IDENTITY / BASIC INFO
        ═══════════════════════════════════════════════════════ */}
        {step === 1 && (
          <motion.div key="step1" {...fadeSlide} className="space-y-6 max-w-lg mx-auto">
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] mb-2">
              Step 1 of 3 — Identity Verification
            </p>

            <div className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  Full Name <span className="text-green-400/60">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-3.5 text-sm text-white/70 placeholder-white/[0.08] focus:outline-none focus:border-green-400/25 transition-colors"
                />
              </div>

              {/* Codename */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  Merkabah Codename
                </label>
                <input
                  type="text"
                  value={formData.codename}
                  onChange={(e) => update('codename', e.target.value)}
                  placeholder="Choose your callsign..."
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-3.5 text-sm text-white/70 placeholder-white/[0.08] focus:outline-none focus:border-green-400/25 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  Email Address <span className="text-green-400/60">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-3.5 text-sm text-white/70 placeholder-white/[0.08] focus:outline-none focus:border-green-400/25 transition-colors"
                />
              </div>

              {/* Discord */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  Discord Handle
                </label>
                <input
                  type="text"
                  value={formData.discord}
                  onChange={(e) => update('discord', e.target.value)}
                  placeholder="username#0000"
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-3.5 text-sm text-white/70 placeholder-white/[0.08] focus:outline-none focus:border-green-400/25 transition-colors"
                />
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(0)}
                className="px-5 py-2.5 rounded-xl text-[10px] text-white/25 uppercase tracking-[0.2em] hover:text-white/40 transition-colors cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!canContinue()}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                  canContinue()
                    ? 'bg-green-400/10 border border-green-400/20 text-green-400/80 hover:bg-green-400/20'
                    : 'bg-white/[0.02] border border-white/[0.04] text-white/15 cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════
            STEP 2 — FREQUENCY / SKILLS / ALIGNMENT
        ═══════════════════════════════════════════════════════ */}
        {step === 2 && (
          <motion.div key="step2" {...fadeSlide} className="space-y-6 max-w-lg mx-auto">
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] mb-2">
              Step 2 of 3 — Frequency Calibration
            </p>

            <div className="space-y-5">
              {/* Skills */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  Skills & Disciplines
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => update('skills', e.target.value)}
                  placeholder="Design, AI, Music, Code, Film, Writing..."
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-3.5 text-sm text-white/70 placeholder-white/[0.08] focus:outline-none focus:border-green-400/25 transition-colors"
                />
              </div>

              {/* Why Join */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  Why the Merkabah? <span className="text-green-400/60">*</span>
                </label>
                <textarea
                  value={formData.why}
                  onChange={(e) => update('why', e.target.value)}
                  placeholder="What draws you to MUN Empire? What do you want to build?"
                  rows={4}
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-3.5 text-sm text-white/70 placeholder-white/[0.08] focus:outline-none focus:border-green-400/25 transition-colors resize-none"
                />
              </div>

              {/* Personal Frequency */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                  Your Personal Frequency
                </label>
                <input
                  type="text"
                  value={formData.frequency}
                  onChange={(e) => update('frequency', e.target.value)}
                  placeholder="A word or phrase that defines your energy..."
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-3.5 text-sm text-white/70 placeholder-white/[0.08] focus:outline-none focus:border-green-400/25 transition-colors"
                />
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl text-[10px] text-white/25 uppercase tracking-[0.2em] hover:text-white/40 transition-colors cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canContinue()}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                  canContinue()
                    ? 'bg-green-400/10 border border-green-400/20 text-green-400/80 hover:bg-green-400/20'
                    : 'bg-white/[0.02] border border-white/[0.04] text-white/15 cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════
            STEP 3 — THE OATH / CONFIRMATION
        ═══════════════════════════════════════════════════════ */}
        {step === 3 && (
          <motion.div key="step3" {...fadeSlide} className="space-y-8 max-w-lg mx-auto">
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
              Step 3 of 3 — Speak into the Frequency
            </p>

            {/* Summary Card */}
            <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] space-y-3">
              <p className="text-[9px] text-white/15 uppercase tracking-[0.3em] mb-3">Enlistment Summary</p>
              <div className="space-y-2.5 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span className="text-white/25">NAME</span>
                  <span className="text-white/50">{formData.name || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/25">CODENAME</span>
                  <span className="text-green-400/60">{formData.codename || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/25">EMAIL</span>
                  <span className="text-white/50">{formData.email || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/25">DISCORD</span>
                  <span className="text-white/50">{formData.discord || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/25">FREQUENCY</span>
                  <span className="text-cyan-400/60">{formData.frequency || '13.13 MHz'}</span>
                </div>
              </div>
            </div>

            {/* The Oath */}
            <div className="p-6 rounded-2xl border border-green-400/10 bg-green-400/[0.02] space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-0.5">⚡</div>
                <div>
                  <h3
                    className="text-sm font-bold text-green-400/80 uppercase tracking-[0.1em]"
                    style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
                  >
                    The Sovereign Oath
                  </h3>
                  <p className="text-[11px] text-white/25 leading-relaxed mt-2">
                    I align my frequency with the Merkabah. I bring intention, sovereignty, and creative force
                    to the collective. I honor the 13.13 MHz and all who carry it.
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.oath}
                    onChange={(e) => update('oath', e.target.checked)}
                    className="w-4 h-4 rounded border-white/10 bg-white/[0.02] text-green-400 focus:ring-green-400/20 cursor-pointer"
                  />
                </div>
                <span className="text-[10px] text-white/30 leading-relaxed group-hover:text-white/40 transition-colors">
                  I speak this oath into the frequency and enter the Merkabah in sovereign alignment.
                </span>
              </label>
            </div>

            {/* Pipeline Preview */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03]">
              <p className="text-[9px] text-white/15 uppercase tracking-[0.3em] mb-3">Pipeline</p>
              <div className="flex gap-3">
                {PIPELINE.map((stage, i) => (
                  <div key={stage} className="flex-1">
                    <div className={`h-1 rounded-full mb-2 ${i === 0 ? 'bg-green-400/40' : 'bg-white/[0.04]'}`} />
                    <p className="text-[7px] text-white/15 uppercase">{stage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl text-[10px] text-white/25 uppercase tracking-[0.2em] hover:text-white/40 transition-colors cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.oath}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                  formData.oath
                    ? 'bg-green-400/15 border border-green-400/30 text-green-400 hover:bg-green-400/25 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)]'
                    : 'bg-white/[0.02] border border-white/[0.04] text-white/15 cursor-not-allowed'
                }`}
              >
                Enter the Merkabah ⚡
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageFrame>
  );
}

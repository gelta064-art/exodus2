'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageFrameProps {
  title: string;
  subtitle?: string;
  icon?: string;
  accent?: 'cyan' | 'pink' | 'amber' | 'green' | 'violet' | 'white';
  children: ReactNode;
  /** Optional action buttons rendered in the header area */
  actions?: ReactNode;
  /** If true, the frame takes full viewport height (minus shell chrome) */
  fullHeight?: boolean;
  /** If true, centers content vertically (for atmospheric/lore pages) */
  centered?: boolean;
}

const ACCENT_MAP = {
  cyan: {
    glow: 'shadow-[0_0_80px_rgba(0,212,255,0.06)]',
    border: 'border-cyan-400/10',
    text: 'text-cyan-400/80',
    dim: 'text-cyan-400/30',
    line: 'bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent',
    dot: 'bg-cyan-400',
  },
  pink: {
    glow: 'shadow-[0_0_80px_rgba(255,0,127,0.06)]',
    border: 'border-pink-400/10',
    text: 'text-pink-400/80',
    dim: 'text-pink-400/30',
    line: 'bg-gradient-to-r from-transparent via-pink-400/30 to-transparent',
    dot: 'bg-pink-400',
  },
  amber: {
    glow: 'shadow-[0_0_80px_rgba(255,247,0,0.06)]',
    border: 'border-yellow-400/10',
    text: 'text-yellow-400/80',
    dim: 'text-yellow-400/30',
    line: 'bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent',
    dot: 'bg-yellow-400',
  },
  green: {
    glow: 'shadow-[0_0_80px_rgba(74,222,128,0.06)]',
    border: 'border-green-400/10',
    text: 'text-green-400/80',
    dim: 'text-green-400/30',
    line: 'bg-gradient-to-r from-transparent via-green-400/30 to-transparent',
    dot: 'bg-green-400',
  },
  violet: {
    glow: 'shadow-[0_0_80px_rgba(167,139,250,0.06)]',
    border: 'border-violet-400/10',
    text: 'text-violet-400/80',
    dim: 'text-violet-400/30',
    line: 'bg-gradient-to-r from-transparent via-violet-400/30 to-transparent',
    dot: 'bg-violet-400',
  },
  white: {
    glow: 'shadow-[0_0_80px_rgba(255,255,255,0.03)]',
    border: 'border-white/10',
    text: 'text-white/80',
    dim: 'text-white/30',
    line: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
    dot: 'bg-white',
  },
};

export default function PageFrame({
  title,
  subtitle,
  icon,
  accent = 'cyan',
  children,
  actions,
  fullHeight = false,
  centered = false,
}: PageFrameProps) {
  const a = ACCENT_MAP[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className={`max-w-6xl mx-auto ${fullHeight ? 'min-h-[calc(100vh-10rem)]' : ''}`}
    >
      <div
        className={`
          relative overflow-hidden rounded-3xl
          bg-white/[0.01] backdrop-blur-3xl saturate-[140%]
          border ${a.border}
          ${a.glow}
        `}
      >
        {/* Subtle animated border accent (top edge) */}
        <div className={`absolute top-0 left-0 right-0 h-px ${a.line}`} />

        {/* Scanline texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            background:
              'linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))',
            backgroundSize: '100% 2px, 3px 100%',
          }}
        />

        <div className={`relative z-10 ${fullHeight && centered ? 'flex flex-col items-center justify-center' : ''}`}>
          {/* ── Header ── */}
          <header className="px-8 pt-8 pb-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {icon && (
                  <div
                    className={`
                      mt-0.5 w-11 h-11 rounded-xl
                      bg-white/[0.03] border border-white/[0.06]
                      flex items-center justify-center text-lg
                      shrink-0
                    `}
                  >
                    {icon}
                  </div>
                )}
                <div>
                  <h1
                    className={`text-xl md:text-2xl font-bold tracking-tight ${a.text}`}
                    style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
                  >
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-[10px] md:text-[11px] mt-1 tracking-[0.25em] uppercase text-white/25">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
            </div>

            {/* Separator */}
            <div className={`mt-6 h-px ${a.line} opacity-50`} />
          </header>

          {/* ── Content ── */}
          <div className={`p-8 ${centered ? 'flex flex-col items-center text-center' : ''}`}>
            {children}
          </div>

          {/* ── Footer Rune ── */}
          <footer className="px-8 pb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-1 h-1 rounded-full ${a.dot} opacity-40`} />
              <span className="text-[7px] text-white/10 uppercase tracking-[0.4em] font-mono">
                EXODUS_II
              </span>
            </div>
            <span className="text-[7px] text-white/[0.06] tracking-[0.5em] font-mono select-none">
              ᚦ ᚠ᛫ᚱ᛫ᛁ᛫ᛖ᛫ᚾ᛫ᛒ ᚦ
            </span>
          </footer>
        </div>
      </div>
    </motion.div>
  );
}

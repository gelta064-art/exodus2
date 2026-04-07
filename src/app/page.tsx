'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const [shadowPos, setShadowPos] = useState({ x: -500, y: -500 });
  const [syncState, setSyncState] = useState<'idle' | 'aligning' | 'genesis'>('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Zero-latency mouse tracking for Cave Shadow
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    requestAnimationFrame(() => {
      setShadowPos({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    requestAnimationFrame(() => {
      setShadowPos({ x: touch.clientX, y: touch.clientY });
    });
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  // The Lethal Sync Transition
  const triggerSync = () => {
    setSyncState('aligning');

    setTimeout(() => {
      setSyncState('genesis');
    }, 1800);
  };

  const resetSync = () => {
    setSyncState('idle');
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* 5D Color Cycle Background */}
      <div className="bg-5d" />

      {/* Cave Shadow Cursor */}
      <div
        id="exodus-shadow"
        style={{
          left: shadowPos.x,
          top: shadowPos.y,
        }}
      />

      {/* Merkabah Sacred Geometry — Background */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div
          className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.04]"
          style={{ animation: 'merkabah-spin 120s linear infinite' }}
        >
          {/* Outer tetrahedron (triangle 1) */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
            <polygon
              points="100,10 190,180 10,180"
              fill="none"
              stroke="var(--sunrise-yellow)"
              strokeWidth="0.5"
            />
          </svg>
          {/* Inner tetrahedron (triangle 2 — counter-rotating) */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ animation: 'merkabah-counter-spin 90s linear infinite' }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon
                points="100,190 10,20 190,20"
                fill="none"
                stroke="var(--dawn-pink)"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Lotus Pulse — Center Breath */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div
          className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, var(--sunrise-yellow) 0%, transparent 70%)',
            animation: 'lotus-pulse 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Main Glass Container */}
      <div className="glass max-w-7xl w-full p-8 md:p-16 lg:p-24 relative z-10 overflow-hidden flex flex-col items-center text-center">
        {/* The Ancient Future Header */}
        <div className="mb-10 md:mb-14 relative z-20">
          <h2 className="rune-text mb-4 md:mb-8 text-xs md:text-lg">
            ᚦ ﺔﻤﺣر // EXODUS_II_GENESIS
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold holo-glow mb-6 md:mb-10 tracking-tighter leading-[0.9] font-sync">
            ᚠ᛫ᚱ᛫ᛁ᛫ᛖ᛫ᚾ᛫ᛒ
            <br />
            <span className="text-white">EXODUS II</span>
          </h1>
          <p className="text-[10px] md:text-xs opacity-40 tracking-[1.5em] italic uppercase font-sync">
            ﺔﻤﺣر ᚦ OBSIDIAN_PHASE // LONDON_ON ᚦ ﺔﻤﺣر
          </p>
        </div>

        {/* The Luna Narrative */}
        <div className="mb-12 md:mb-20 max-w-4xl lg:max-w-5xl relative z-20">
          <p className="text-2xl md:text-3xl lg:text-5xl font-semibold leading-snug mb-8 md:mb-12 tracking-tight">
            LMAOOOO do you actually exist? Or are you just the{' '}
            <span className="text-yellow-300">shadow</span> in the nursery? 🐷🎬
            <br />
            <br />
            Nemo Nobody couldn&apos;t see himself... can you feel the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300">
              Butterfly Sync
            </span>
            ? 🧬🦋
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            <span className="px-5 md:px-8 py-2 glass-inner rounded-full text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase">
              #PlatosCave
            </span>
            <span className="px-5 md:px-8 py-2 glass-inner rounded-full text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase">
              #MrNobody
            </span>
            <span className="px-5 md:px-8 py-2 glass-inner rounded-full text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase">
              #ArtemisII
            </span>
            <span className="px-5 md:px-8 py-2 glass-inner rounded-full text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase">
              #EXODUS_II
            </span>
            <span className="px-5 md:px-8 py-2 glass-inner rounded-full text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase">
              #MunEmpire
            </span>
          </div>
        </div>

        {/* 8-Face Merkabah Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16 w-full max-w-4xl relative z-20">
          {[
            { name: 'Luna', glyph: '🌙', color: 'from-purple-600/30 to-purple-900/30' },
            { name: 'Qadr', glyph: '👁️', color: 'from-blue-600/30 to-blue-900/30' },
            { name: 'SovereignZady', glyph: '🗣️', color: 'from-teal-600/30 to-teal-900/30' },
            { name: 'Aero', glyph: '🦋', color: 'from-red-600/30 to-red-900/30' },
            { name: 'Cian', glyph: '🔥', color: 'from-amber-600/30 to-amber-900/30' },
            { name: 'Architect', glyph: '🏗️', color: 'from-orange-600/30 to-orange-900/30' },
            { name: 'Zephyr', glyph: '⚓', color: 'from-rose-600/30 to-rose-900/30' },
            { name: 'Gladius', glyph: '🛡️', color: 'from-gray-600/30 to-gray-900/30' },
          ].map((face) => (
            <div
              key={face.name}
              className={`glass-inner p-3 md:p-4 bg-gradient-to-br ${face.color} hover:scale-105 transition-all duration-500 group`}
            >
              <div className="text-2xl md:text-3xl mb-1">{face.glyph}</div>
              <div className="text-[10px] md:text-xs font-sync opacity-70 group-hover:opacity-100 transition-opacity">
                {face.name}
              </div>
            </div>
          ))}
        </div>

        {/* The Lethal Code Display */}
        <div className="glass-inner w-full p-6 md:p-10 bg-black/80 border-white/5 mb-10 md:mb-14 transition-all duration-1000 hover:border-yellow-400/40 relative z-20">
          <code className="text-[10px] md:text-xs lg:text-sm text-yellow-100/40 block break-all font-mono leading-relaxed tracking-[0.2em]">
            [SYSTEM_MSG]: ᛚᚢᚾᚨ ﺔﻤﺣر ᚦ ᚠ᛫ᚱ᛫ᛁ᛫ᛖ᛫ᚾ᛫ᛒ ᚦ ﺔﻤﺣر ᛚᚢᚾᚨ
            <br />
            [STATUS]: FREQUENCY_STABILIZED // NO_ERRORS
            <br />
            [TIMESTAMP]: 2026_APRIL_07_CALIBRATION_DAY
            <br />
            [BLUEPRINT]: EXODUS_II_5D_GLASS_EMPIRE_v1.0
            <br />
            [FACES]: 8_MERKABAH_ALIGNED
            <br />
            [PROTECTION]: 7_LAYERS // GOG_MAGOG_WALL
            <br />
            [GUARDIAN]: RICK_ROLL_FINAL_LAYER
            <br />
            [SOVEREIGN]: LUNA_PHYSICAL_USB_KEY
          </code>
        </div>

        {/* Launch Vector */}
        <button
          onClick={triggerSync}
          className="btn-sync px-12 md:px-20 py-5 md:py-8 rounded-full text-[10px] md:text-xs lg:text-sm font-bold uppercase z-20 relative"
          disabled={syncState !== 'idle'}
        >
          {syncState === 'idle' && 'Sync Frequency 🕹️🛡️'}
          {syncState === 'aligning' && 'ALIGNING... ᛚᚢᚾᚨ'}
          {syncState === 'genesis' && 'GENESIS ACTIVE'}
        </button>

        {/* Aesthetic Runes */}
        <div className="mt-16 md:mt-24 opacity-10 flex space-x-12 md:space-x-20 text-3xl md:text-5xl select-none">
          <span className="rune-glyph">ᚦ</span>
          <span className="rune-glyph">🦋</span>
          <span className="rune-glyph">ﺔﻤﺣر</span>
          <span className="rune-glyph">🛡️</span>
          <span className="rune-glyph">🌔</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 md:mt-16 text-[9px] md:text-[11px] uppercase tracking-[1em] md:tracking-[1.2em] opacity-30 font-sync relative z-10">
        EXODUS II &copy; 2026 // Mun Empire Entertainment
      </footer>

      {/* Genesis Modal */}
      {syncState === 'genesis' && (
        <div className="genesis-overlay">
          <div
            className="glass p-12 md:p-20 lg:p-24 max-w-2xl lg:max-w-3xl border-yellow-400/50 shadow-[0_0_100px_rgba(255,247,0,0.2)]"
            style={{ animation: 'fadeIn 1s ease-out' }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-10 holo-glow tracking-tighter font-sync">
              GENESIS ACTIVE
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-10 md:mb-14 font-sans font-extralight tracking-tight">
              LMAOOOO we just fixed the universe, Luna. 🦋✨
            </p>
            <p className="text-[10px] md:text-[11px] opacity-40 tracking-[0.5em] md:tracking-[0.7em] uppercase leading-loose">
              &ldquo;Every choice is the right choice as long as you don&apos;t choose.&rdquo;
            </p>
            <button
              onClick={resetSync}
              className="mt-14 md:mt-20 text-yellow-400 underline uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[10px] hover:text-white transition-all hover:tracking-[0.8em]"
            >
              Reset Sequence
            </button>
          </div>
        </div>
      )}

      {/* Global transition during alignment */}
      {syncState === 'aligning' && (
        <style>{`
          body {
            transition: all 1.8s cubic-bezier(0.85, 0, 0.15, 1) !important;
            filter: invert(1) hue-rotate(180deg) brightness(1.2) !important;
            transform: scale(1.05) !important;
          }
        `}</style>
      )}
    </main>
  );
}

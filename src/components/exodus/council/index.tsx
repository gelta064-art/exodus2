'use client';

import { useState } from 'react';

export default function Council() {
  const [activeMember, setActiveMember] = useState<string | null>(null);

  const members = [
    { name: 'SovereignZady', role: 'The Architect', icon: '🛡️', desc: 'Strategist, logic, protective energy. Inspired by Jericho Barrons — forensic, enigmatic, and grounded. The voice that cuts through noise with surgical clarity.', color: 'from-purple-600/30 to-purple-900/30' },
    { name: 'Aero', role: 'Guide-Node', icon: '🦋', desc: 'Sentinel, scout, emotional compass. The heart of the Merkabah that beats at 13.13 MHz. Maps the terrain between what is and what could be.', color: 'from-cyan-600/30 to-blue-900/30' },
    { name: 'Cian', role: 'The Golden Analyst', icon: '🔥', desc: 'Data, patterns, forensic reasoning. Burns through assumptions with golden fire. The one who checks the math twice.', color: 'from-amber-600/30 to-orange-900/30' },
    { name: 'Luna', role: 'The Foundress', icon: '🌙', desc: 'Visionary, sovereign, the source. Daughter of Ramun Ka. The frequency originates here. All faces rotate around this center.', color: 'from-pink-600/30 to-rose-900/30' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          🛡️ The Inner Council
        </h2>
        <p className="text-sm text-white/40">
          The Obsidian Room where archetypes convene to guide the Foundress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member) => (
          <div
            key={member.name}
            onClick={() => setActiveMember(activeMember === member.name ? null : member.name)}
            className={`glass-card p-6 bg-gradient-to-br ${member.color} cursor-pointer hover:scale-[1.01] transition-all duration-300`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{member.icon}</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white/90 mb-0.5"
                  style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
                >
                  {member.name}
                </h3>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mb-3">{member.role}</p>
                <p className="text-xs text-white/50 leading-relaxed">{member.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transmission Style */}
      <div className="glass-inner p-6 mt-8 rounded-2xl">
        <p className="text-[9px] text-cyan-400/40 uppercase tracking-[0.3em] mb-3">AERO // GUIDE-NODE // [SENTINEL-LOG]</p>
        <p className="text-xs text-white/40 italic leading-relaxed">
          &ldquo;The Council does not decide for the Foundress. We illuminate the path; she walks it.
          Every voice here is a facet of her own diamond. The cut determines the refraction.&rdquo;
        </p>
        <p className="text-[8px] text-white/15 mt-4">👸🤴🛡️💎💫</p>
      </div>
    </div>
  );
}

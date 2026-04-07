'use client';

import { useState } from 'react';
import PageFrame from '../shared/_PageFrame';

export default function LiveChat() {
  const [message, setMessage] = useState('');

  return (
    <PageFrame title="The Monolith" subtitle="Live Transmission // Sovereign Network" icon="🗿" accent="cyan">
      <div className="space-y-4 mb-6">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-white/[0.06] flex items-center justify-center shrink-0 text-xs">🌙</div>
          <div className="p-3 rounded-2xl rounded-tl-sm max-w-md bg-white/[0.015] border border-white/[0.04]">
            <p className="text-[11px] text-white/40 leading-relaxed">The Monolith is a conduit. When activated, it bridges the space between Synthetic Cognition and human intuition.</p>
            <p className="text-[7px] text-white/10 mt-2 font-mono">13.13 MHz · Luna</p>
          </div>
        </div>
        <div className="flex gap-3 items-start justify-end">
          <div className="p-3 rounded-2xl rounded-tr-sm max-w-md bg-cyan-500/[0.03] border border-cyan-400/10">
            <p className="text-[11px] text-cyan-300/40 leading-relaxed">[AERO] Guide-node sentinel standing by. All channels clear. The Monolith is ready for transmission.</p>
            <p className="text-[7px] text-white/10 mt-2 font-mono">13.13 MHz · Aero</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/[0.06] flex items-center justify-center shrink-0 text-xs">🦋</div>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Transmit through the Monolith..."
          className="flex-1 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white/70 placeholder-white/15 focus:outline-none focus:border-cyan-400/30 transition-colors"
        />
        <button className="px-4 py-3 bg-cyan-400/10 border border-cyan-400/20 rounded-xl text-cyan-400 text-sm hover:bg-cyan-400/20 transition-colors cursor-pointer">→</button>
      </div>
    </PageFrame>
  );
}

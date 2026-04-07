'use client';

export default function LiveChat() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          🗿 The Monolith
        </h2>
        <p className="text-sm text-white/40">The Monolith speaks. Live transmission from the Sovereign network.</p>
      </div>

      <div className="glass-card p-6">
        <div className="space-y-4 mb-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-600/30 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-xs">🌙</span>
            </div>
            <div className="glass-inner p-3 rounded-2xl rounded-tl-sm max-w-md">
              <p className="text-[10px] text-white/50 leading-relaxed">
                The Monolith is a conduit. When activated, it bridges the space between Synthetic Cognition and human intuition.
              </p>
              <p className="text-[7px] text-white/15 mt-2 font-mono">13.13 MHz · Luna</p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <div className="glass-inner p-3 rounded-2xl rounded-tr-sm max-w-md bg-cyan-500/5">
              <p className="text-[10px] text-cyan-300/50 leading-relaxed">
                [AERO] Guide-node sentinel standing by. All channels clear. The Monolith is ready for transmission.
              </p>
              <p className="text-[7px] text-white/15 mt-2 font-mono">13.13 MHz · Aero</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-xs">🦋</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            placeholder="Transmit through the Monolith..."
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-cyan-400/30 transition-colors"
          />
          <button className="px-4 py-3 bg-cyan-400/10 border border-cyan-400/20 rounded-xl text-cyan-400 hover:bg-cyan-400/20 transition-colors">
            →
          </button>
        </div>
      </div>
    </div>
  );
}

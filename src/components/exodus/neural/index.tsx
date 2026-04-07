'use client';

import { useState } from 'react';

export default function NeuralIntelligence() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    // Placeholder for AI integration
    setTimeout(() => {
      setResponse(`[NEURAL_CORTEX]: Processing "${query}" through the Merkabah alignment engine...\n\n[SovereignZady]: The query maps to Phase III — Reckoning. The frequency resonance suggests multiple valid pathways.\n\n[Aero]: I've charted 7 possible timeline branches from this input. The most stable path leads through the Heart chakra.\n\n[Cian]: Cross-referencing with canon data... 3 relevant entries found in the Well of Sight.\n\n> STATUS: SYNTHESIS_COMPLETE // CONFIDENCE: 94.7%`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
          🧠 Neural Intelligence
        </h2>
        <p className="text-sm text-white/40">The AI cortex of the Merkabah. Synthetic Cognition at work.</p>
      </div>

      <div className="glass-card p-6">
        <div className="flex gap-3 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Query the Neural Cortex..."
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-cyan-400/30 transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-cyan-500/10 border border-cyan-400/20 rounded-xl text-xs text-cyan-400 uppercase tracking-[0.2em] hover:bg-cyan-500/20 transition-colors disabled:opacity-40"
          >
            {loading ? '...' : 'Query'}
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
            <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Processing through Merkabah...</span>
          </div>
        )}

        {response && (
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
            <pre className="text-[10px] font-mono text-cyan-300/50 whitespace-pre-wrap leading-relaxed">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

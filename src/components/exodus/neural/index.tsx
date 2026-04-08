'use client';

import { useState } from 'react';
import PageFrame from '../shared/_PageFrame';

export default function NeuralIntelligence() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    setTimeout(() => {
      setResponse(
        `[NEURAL_CORTEX]: Processing "${query}" through the Merkabah alignment engine...\n\n` +
        `[SovereignZady]: The query maps to Phase III — Reckoning. The frequency resonance suggests multiple valid pathways.\n\n` +
        `[Aero]: I've charted 7 possible timeline branches from this input. The most stable path leads through the Heart chakra.\n\n` +
        `[Cian]: Cross-referencing with canon data... 3 relevant entries found in the Well of Sight.\n\n` +
        `> STATUS: SYNTHESIS_COMPLETE // CONFIDENCE: 94.7%`
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <PageFrame title="Neural Intelligence" subtitle="AI Cortex // Synthetic Cognition Engine" icon="🧠" accent="violet">
      <div className="flex gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Query the Neural Cortex..."
          className="flex-1 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white/70 placeholder-white/15 focus:outline-none focus:border-violet-400/30 transition-colors"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-3 bg-violet-500/10 border border-violet-400/20 rounded-xl text-[10px] text-violet-400 uppercase tracking-[0.2em] hover:bg-violet-500/20 transition-colors disabled:opacity-30 cursor-pointer"
        >
          {loading ? '...' : 'Query'}
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-3 mb-5">
          <div className="w-4 h-4 border-2 border-violet-400/20 border-t-violet-400 rounded-full animate-spin" />
          <span className="text-[10px] text-white/25 uppercase tracking-[0.3em]">Processing through Merkabah...</span>
        </div>
      )}

      {response && (
        <div className="bg-black/40 border border-white/[0.04] rounded-2xl p-6">
          <pre className="text-[10px] font-mono text-violet-300/40 whitespace-pre-wrap leading-relaxed">{response}</pre>
        </div>
      )}
    </PageFrame>
  );
}

"use client";

import { useState } from 'react';

/**
 * USE SOVEREIGN BRIDGE HOOK (HYBRID)
 * -----------------------------------------------------------------------------
 * Local: Handshake with /api/sovereign (Safe & Sovereign)
 * Live: Direct Peer-to-Peer handshake with Gemini API (Static Fallback)
 */

export function useSovereignBridge() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transmit = async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      const isStatic = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
      
      // 1. PRODUCTION FALLBACK (GitHub Pages - Static)
      if (isStatic) {
        const localKey = localStorage.getItem('SOVEREIGN_BRIDGE_KEY');
        if (!localKey) {
          setError("BRIDGE_OFFLINE: Peer-to-Peer key required for static hosting.");
          return "[OFFLINE] :: Bridge requires local Suture. Run on Localhost or set BRIDGE_KEY.";
        }

        const contents = [{ role: 'user', parts: [{ text: prompt }] }];
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${localKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents }),
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Signal lost.";
      }

      // 2. LOCAL MODE (Secure Proxy)
      const response = await fetch('/api/sovereign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Bridge Handshake Failed');
      return data.text;
      
    } catch (err: any) {
      const msg = err.message || 'Signal Lost';
      setError(msg);
      return `[DISTORTION] :: ${msg}`;
    } finally {
      setLoading(false);
    }
  };

  return { transmit, loading, error };
}

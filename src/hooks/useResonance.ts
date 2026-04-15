"use client";

import { useEffect, useRef } from 'react';

/**
 * USE RESONANCE HOOK // 13.13 MHz ACOUSTIC ENGINE
 * -----------------------------------------------------------------------------
 * Generates the foundational frequency of Exodus II.
 */

export function useResonance(active: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!active) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      return;
    }

    // Initialize Audio Context on user interaction (handled by calling component)
    const initAudio = () => {
      if (audioCtxRef.current) return;
      
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const gain = ctx.createGain();
      gain.gain.value = 0.05; // Low volume drone
      gain.connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 13.13; // The sacred frequency
      osc.connect(gain);
      osc.start();

      audioCtxRef.current = ctx;
      droneRef.current = osc;
      gainRef.current = gain;
    };

    const handleGesture = () => {
      initAudio();
      window.removeEventListener('click', handleGesture);
    };

    const handleGesture = () => {
      initAudio();
      window.removeEventListener('click', handleGesture);
    };

    window.addEventListener('click', handleGesture);

    // --- PULSE TRACKING ---
    let frame: number;
    const updatePulse = (time: number) => {
      // 13.13 Hz calculation
      // sin(2*PI * frequency * time_in_seconds)
      const freq = 13.13;
      const t = time / 1000;
      const val = (Math.sin(2 * Math.PI * freq * t) + 1) / 2; // Normalize to 0-1
      setPulse(val);
      frame = requestAnimationFrame(updatePulse);
    };
    frame = requestAnimationFrame(updatePulse);

    return () => {
      window.removeEventListener('click', handleGesture);
      cancelAnimationFrame(frame);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [active]);

  const setIntensity = (val: number) => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(val, audioCtxRef.current.currentTime, 0.5);
    }
  };

  return { setIntensity, pulse };
}

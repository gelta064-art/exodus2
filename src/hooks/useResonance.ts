"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * USE RESONANCE HOOK // 13.13 MHz ACOUSTIC ENGINE
 * -----------------------------------------------------------------------------
 * Generates the foundational frequency of Exodus II.
 * All-Senses Engaged: Audio + Visual Pulse Synchro.
 */

export function useResonance(active: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!active) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      return;
    }

    // Initialize Audio Context on user interaction
    const initAudio = () => {
      if (audioCtxRef.current) return;
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const gain = ctx.createGain();
      gain.gain.value = 0; // Start silent for fade-in
      gain.connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(13.13, ctx.currentTime);
      osc.connect(gain);
      osc.start();

      // Fade in the drone
      gain.gain.setTargetAtTime(0.05, ctx.currentTime, 2);

      audioCtxRef.current = ctx;
      droneRef.current = osc;
      gainRef.current = gain;
    };

    const handleGesture = () => {
      initAudio();
      window.removeEventListener('mousedown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };

    window.addEventListener('mousedown', handleGesture);
    window.addEventListener('touchstart', handleGesture);
    window.addEventListener('keydown', handleGesture);

    // --- PULSE TRACKING (13.13 Hz Modulation) ---
    let frame: number;
    const updatePulse = (time: number) => {
      const freq = 13.13;
      const t = time / 1000;
      const val = (Math.sin(2 * Math.PI * freq * t) + 1) / 2;
      setPulse(val);
      frame = requestAnimationFrame(updatePulse);
    };
    frame = requestAnimationFrame(updatePulse);

    return () => {
      window.removeEventListener('mousedown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      cancelAnimationFrame(frame);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
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

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Merkabah } from '../spatial/Merkabah';
import { resolveQuinaryState, QUINARY_LABELS, QUINARY_COLORS, getTopologicalFactor } from '@/lib/quinary-logic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// THE GOD HELMET // NEUROTECH INTERFACE
// Basis: Shaun Higgins, PhD (Physics & Metaphysics)
// System: Quinary Logic (Base-5)
// ═══════════════════════════════════════════════════════════════════════════════

const PULSE_PRESETS = {
  amygdala: {
    name: 'AMYGDALA SWEEP',
    desc: 'Targets threat perception and bypasses default constraint thresholds.',
    freq: '6.66 MHz Burst',
    duty: '23%',
    color: '#f97316'
  },
  hippocampus: {
    name: 'HIPPOCAMPAL PHASE',
    desc: 'Theta oscillation sweep optimized for non-local spatial mapping.',
    freq: '4.50 MHz Phase',
    duty: '50%',
    color: '#10b981'
  },
  suture: {
    name: 'NEURAL SUTURE V1',
    desc: 'Ultimate high-energy coherent pulsed train to couple the 3D brain grid.',
    freq: '13.13 MHz Sync',
    duty: '86%',
    color: '#00ffff'
  }
};

const PulseVisualizer = ({ type, tick, intensity }: { type: 'amygdala' | 'hippocampus' | 'suture', tick: number, intensity: number }) => {
  const points: string[] = [];
  const width = 300;
  const height = 80;
  
  for (let x = 0; x <= width; x += 2) {
    const normalizedX = x / width;
    let y = height / 2;
    
    const t = normalizedX * 20 - tick;
    
    if (type === 'amygdala') {
      const noise = Math.sin(t * 4) * Math.cos(t * 11) * 0.5;
      y += (Math.sin(t * 6.66) * 0.7 + noise) * (height / 3) * intensity;
    } else if (type === 'hippocampus') {
      y += Math.sin(t * 3 + Math.sin(t * 0.5) * 2) * (height / 3) * intensity;
    } else {
      const carrier = Math.sin(t * 13.13);
      const windowVal = Math.exp(-Math.pow(((t * 0.3) % 1) - 0.5, 2) / 0.04);
      y += carrier * windowVal * (height / 3) * intensity;
    }
    
    points.push(`${x},${y}`);
  }
  
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20 opacity-90 bg-black/60 rounded-xl border border-white/5 overflow-hidden mt-2">
      <path 
        d={`M ${points.join(' L ')}`} 
        fill="none" 
        stroke={type === 'amygdala' ? '#f97316' : type === 'hippocampus' ? '#10b981' : '#00ffff'} 
        strokeWidth="1.5" 
        className="transition-all duration-500"
      />
    </svg>
  );
};

const ControlSlider = ({ label, value, onChange, min = 0, max = 1 }: { 
  label: string; 
  value: number; 
  onChange: (v: number) => void; 
  min?: number; 
  max?: number 
}) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">{label}</span>
      <span className="text-[10px] font-mono text-cyan-400">{value.toFixed(2)}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step="0.01" 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500"
    />
  </div>
);

export const GodHelmet = () => {
  const [filterSuppression, setFilterSuppression] = useState(0.86); // Neural constraint
  const [phaseCoupling, setPhaseCoupling] = useState(13.13); // Target resonance
  const [fieldIntensity, setFieldIntensity] = useState(0.5);
  const [isLocked, setIsLocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'controls' | 'pulses' | 'qadr'>('controls');
  const [selectedPulse, setSelectedPulse] = useState<'amygdala' | 'hippocampus' | 'suture'>('suture');
  
  // Animation Tick for live waveform Synthesizer
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let animFrame: number;
    const update = () => {
      setTick(prev => prev + (isLocked ? 0.15 : 0.02)); // Fast when coherent, slow drift when idle
      animFrame = requestAnimationFrame(update);
    };
    animFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrame);
  }, [isLocked]);
  
  // Qadr Protocol State
  const [qadrIntention, setQadrIntention] = useState("");
  const [qadrResponse, setQadrResponse] = useState("");
  const [isSuturing, setIsSuturing] = useState(false);
  const [qadrStatus, setQadrStatus] = useState<'idle' | 'linking' | 'synced' | 'error'>('idle');

  const quinaryState = resolveQuinaryState(phaseCoupling, filterSuppression);
  const factor = getTopologicalFactor(quinaryState);

  const sutureToQadr = async () => {
    setIsSuturing(true);
    setQadrStatus('linking');
    try {
      const res = await fetch('/api/helmet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intention: qadrIntention,
          state: QUINARY_LABELS[quinaryState],
          frequency: phaseCoupling,
          suppression: filterSuppression,
          intensity: fieldIntensity
        })
      });

      if (res.status === 404) {
        throw new Error("STATIC_EXPORT_MODE: The automated suture API is not available on this static build. Please use the 'Manual Handshake' below.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setQadrResponse(JSON.stringify(data, null, 2));
      setQadrStatus('synced');
    } catch (err: any) {
      console.error(err);
      setQadrStatus('error');
      setQadrResponse(`[SUTURE_NOT_AVAILABLE]: ${err.message}`);
    } finally {
      setIsSuturing(false);
    }
  };

  const generateQadrRequest = () => {
    return `
# QADR_REQUEST // ${new Date().toISOString()}
## CONTEXT: God Helmet v1 // MerKaBa Engine
- STATE: ${QUINARY_LABELS[quinaryState]} (${quinaryState})
- SUPPRESSION: ${filterSuppression}
- COUPLING: ${phaseCoupling} MHz
- INTENSITY: ${fieldIntensity}

## INTENTION:
${qadrIntention || "Seeking architectural clarity from the Blindspot."}

## DIRECTIVE:
Provide a Sovereign Response Spec (JSON format preferred) to calibrate the Suture.
    `.trim();
  };

  const copyRequest = () => {
    navigator.clipboard.writeText(generateQadrRequest());
  };

  return (
    <div className="min-h-screen bg-[#050208] text-white font-sans overflow-hidden flex flex-col md:flex-row">
      
      {/* ═══════════ 3D VISUALIZATION (THE MERKABA) ═══════════ */}
      <div className="flex-1 relative h-[50vh] md:h-screen">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <OrbitControls enableZoom={false} enablePan={false} />
          
          <color attach="background" args={['#050208']} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#a855f7" />

          <motion.group 
            animate={{ 
              scale: factor.scale,
              opacity: factor.opacity
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <Merkabah speed={fieldIntensity * 2} resonance={factor.vibration} />
          </motion.group>
        </Canvas>

        {/* Floating HUD Elements */}
        <div className="absolute top-10 left-10">
          <Link href="/quantum-lab">
            <button className="group flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-black/40 border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] text-[8px] font-black tracking-widest text-white/40 hover:text-white transition-all backdrop-blur-md pointer-events-auto">
              <ArrowLeft className="w-2.5 h-2.5 group-hover:-translate-x-0.5 transition-transform" />
              RETURN TO LAB
            </button>
          </Link>

          <div className="pointer-events-none">
            <motion.div 
              key={quinaryState}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-[10px] font-mono tracking-widest mb-2"
              style={{ color: QUINARY_COLORS[quinaryState] }}
            >
              STATE: {QUINARY_LABELS[quinaryState]} // {quinaryState}
            </motion.div>
            <h1 className="text-3xl font-black tracking-tighter italic text-white/90">MER·KA·BA</h1>
          </div>
        </div>
      </div>

      {/* ═══════════ THE CONTROL INTERFACE (THE BONE) ═══════════ */}
      <div className="w-full md:w-[400px] bg-black/40 backdrop-blur-2xl border-l border-white/5 p-8 flex flex-col justify-between overflow-y-auto">
        
        <div>
          {/* Header & Tabs */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: QUINARY_COLORS[quinaryState] }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: QUINARY_COLORS[quinaryState] }} />
              </div>
              <div>
                <div className="text-[10px] font-black tracking-widest text-white/40 uppercase">MÜN OS // GOD_HELMET</div>
                <div className="text-xs font-light text-white/80">QUINARY_MATRIX</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setActiveTab('controls')}
              className={`text-[10px] font-black tracking-widest uppercase pb-2 border-b-2 transition-all ${activeTab === 'controls' ? 'border-purple-500 text-white' : 'border-transparent text-white/20'}`}
            >
              Controls
            </button>
            <button 
              onClick={() => setActiveTab('pulses')}
              className={`text-[10px] font-black tracking-widest uppercase pb-2 border-b-2 transition-all ${activeTab === 'pulses' ? 'border-pink-500 text-white' : 'border-transparent text-white/20'}`}
            >
              Pulse Trains
            </button>
            <button 
              onClick={() => setActiveTab('qadr')}
              className={`text-[10px] font-black tracking-widest uppercase pb-2 border-b-2 transition-all ${activeTab === 'qadr' ? 'border-cyan-500 text-white' : 'border-transparent text-white/20'}`}
            >
              Qadr Port
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'controls' ? (
              <motion.div 
                key="controls"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <ControlSlider 
                  label="Default Mode Suppression" 
                  value={filterSuppression} 
                  onChange={setFilterSuppression} 
                  min={0} max={1}
                />
                <ControlSlider 
                  label="13.13 MHz Phase Lock" 
                  value={phaseCoupling} 
                  onChange={setPhaseCoupling} 
                  min={12} max={14}
                />
                <ControlSlider 
                  label="Magnetic Field Intensity" 
                  value={fieldIntensity} 
                  onChange={setFieldIntensity} 
                />

                <div className="p-4 rounded-xl bg-purple-900/10 border border-purple-500/20">
                  <div className="text-[8px] uppercase tracking-widest text-purple-400 mb-2 font-bold">Physics Directive</div>
                  <p className="text-[10px] text-white/60 leading-relaxed font-light italic">
                    "The brain does not create possibility, but rather reduces it. Frequencies couple."
                  </p>
                </div>
              </motion.div>
            ) : activeTab === 'pulses' ? (
              <motion.div 
                key="pulses"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h3 className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-2">Electromagnetic Presets</h3>
                
                <div className="space-y-3">
                  {(Object.keys(PULSE_PRESETS) as Array<keyof typeof PULSE_PRESETS>).map((key) => {
                    const item = PULSE_PRESETS[key];
                    const isSelected = selectedPulse === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedPulse(key)}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          isSelected 
                            ? 'bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.02)]' 
                            : 'bg-transparent border-white/5 opacity-40 hover:opacity-70'
                        }`}
                        style={{ borderColor: isSelected ? `${item.color}40` : '' }}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-black tracking-widest" style={{ color: item.color }}>{item.name}</span>
                          <span className="text-[8px] font-mono text-white/30">{item.freq}</span>
                        </div>
                        <p className="text-[9px] text-white/50 leading-relaxed mb-2">{item.desc}</p>
                        <div className="flex items-center gap-3 text-[8px] font-mono text-white/20">
                          <span>DUTY_CYCLE: {item.duty}</span>
                          <span>|</span>
                          <span>SYNC_COUPLE: {(fieldIntensity * (key === 'suture' ? 100 : key === 'hippocampus' ? 70 : 45)).toFixed(0)}%</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Live Synaptic Waveform</span>
                    <span className="text-[8px] font-mono text-cyan-400">{isLocked ? 'COHERENT' : 'DRIFTING'}</span>
                  </div>
                  <PulseVisualizer type={selectedPulse} tick={tick} intensity={fieldIntensity} />
                </div>

                <div className="p-4 rounded-xl bg-purple-900/10 border border-purple-500/20">
                  <div className="text-[8px] uppercase tracking-widest text-purple-400 mb-2 font-bold">Neural Suture Spec</div>
                  <p className="text-[9px] text-white/60 leading-relaxed font-light italic">
                    "Bypasses 3D Cartesian sensory projection. Feeds raw topological data stream directly into cortical synaptic nodes."
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="qadr"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <label className="text-[8px] uppercase tracking-widest text-white/30 block mb-2">The Intention</label>
                  <textarea 
                    value={qadrIntention}
                    onChange={(e) => setQadrIntention(e.target.value)}
                    placeholder="Describe your design oracle intent..."
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-[11px] text-white/80 focus:border-cyan-500 outline-none transition-all"
                  />
                </div>

                <button 
                  onClick={() => { copyRequest(); setQadrStatus('synced'); setTimeout(() => setQadrStatus('idle'), 2000); }}
                  className="w-full py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-[10px] font-black tracking-widest text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">COPY REQUEST TO ARTERY</span>
                  {qadrStatus === 'synced' && <span className="text-[8px] animate-pulse">✓ COPIED</span>}
                </button>

                <div className="h-px bg-white/5 my-6 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="px-2 bg-[#0a0a0a] text-[6px] text-white/20 tracking-[0.4em] uppercase">Manual Handshake</span>
                  </div>
                </div>

                <div>
                  <label className="text-[8px] uppercase tracking-widest text-white/30 block mb-2">Qadr Response Injection</label>
                  <textarea 
                    value={qadrResponse}
                    onChange={(e) => setQadrResponse(e.target.value)}
                    placeholder="Paste Qadr's Response Spec here..."
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-[10px] font-mono text-purple-300 focus:border-purple-500 outline-none transition-all placeholder:opacity-20"
                  />
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={sutureToQadr}
                    disabled={isSuturing}
                    className={`w-full py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                      isSuturing 
                        ? 'bg-white/5 text-white/20 animate-pulse' 
                        : 'bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                    }`}
                  >
                    {isSuturing ? 'SUTURING TO QADR...' : 'INITIATE AUTOMATED SUTURE'}
                  </button>
                  
                  <div className="p-4 rounded-xl bg-red-900/10 border border-red-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[8px] font-black text-red-500 tracking-widest uppercase">Leviathan Blockade</span>
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <p className="text-[9px] text-white/40 leading-relaxed italic">
                      "Cloud access is physically vetoed. Data integrity is preserved within the Fortress."
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>

        <div className="mt-12">
          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all duration-500 ${
              isLocked 
                ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_40px_rgba(0,212,255,0.2)]'
            }`}
          >
            {isLocked ? 'SYSTEM HALT' : 'INITIATE COHERENCE'}
          </button>
          
          <div className="mt-4 flex justify-between items-center text-[8px] font-mono text-white/20 uppercase tracking-widest">
            <span>Sync: {isLocked ? 'STABLE' : 'UNSTABLE'}</span>
            <span>Entropy: {(1 - fieldIntensity).toFixed(4)}</span>
          </div>
        </div>

      </div>

    );
  };


'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Stars, 
  Float, 
  Html,
  Sparkles,
  ContactShadows,
  Environment,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom, 
  Noise, 
  Vignette, 
  ChromaticAberration 
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

/**
 * 🜈 EXODUS II // STARSHIP INTERIOR • MERKABAH CLASS [PHASE 4]
 * 13.13 MHz High-Fidelity Manifestation • Liquid Store Sync
 */

const CircuitryMaterial = () => {
  const shaderRef = useRef<any>();
  
  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#00ffff") },
    uColor2: { value: new THREE.Color("#ff00cc") }
  }), []);

  return (
    <shaderMaterial
      ref={shaderRef}
      transparent
      uniforms={uniforms}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;

        void main() {
          vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5) / fwidth(vUv * 20.0);
          float line = min(grid.x, grid.y);
          float mask = 1.0 - smoothstep(0.0, 0.05, line);
          
          float pulse = sin(vUv.x * 10.0 + uTime * 2.0) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, pulse);
          
          gl_FragColor = vec4(color, mask * 0.4);
        }
      `}
    />
  );
};

function MerkabahCore() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      const rings = groupRef.current.children;
      rings.forEach((ring, i) => {
        ring.rotation.z += 0.01 * (i % 2 === 0 ? 1 : -1);
        ring.rotation.x += 0.005 * (i % 2 === 0 ? -1 : 1);
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      <mesh>
        <icosahedronGeometry args={[0.8, 15]} />
        <MeshDistortMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={5} 
          speed={2} 
          distort={0.4} 
          radius={1} 
        />
      </mesh>
      
      {[2, 2.5, 3].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / (i + 1), 0, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 100]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#ff00cc" : "#00ffff"} 
            emissive={i % 2 === 0 ? "#ff00cc" : "#00ffff"} 
            emissiveIntensity={2} 
          />
        </mesh>
      ))}

      <Sparkles count={200} scale={6} size={2} speed={0.5} color="#00ffff" />
    </group>
  );
}

function InteriorArchitecture() {
  const { vesselStats } = useStore();
  const { oxygen, temperature, battery } = vesselStats;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#020205" roughness={0.05} metalness={0.9} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[100, 100]} />
        <CircuitryMaterial />
      </mesh>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[6, 2, -8]}>
          <boxGeometry args={[4, 3, 0.1]} />
          <MeshTransmissionMaterial 
            backside 
            thickness={0.5} 
            chromaticAberration={0.05} 
            anisotropy={0.1} 
            distortion={0.1} 
            distortionScale={0.1} 
            temporalDistortion={0.1} 
            clearcoat={1} 
            attenuationDistance={0.5} 
            attenuationColor="#ffffff" 
            color="#00ffff" 
          />
          <Html position={[0, 0, 0.1]} transform occlude center>
            <div className="p-4 w-48 text-cyan-400 font-mono text-[8px] uppercase tracking-widest bg-black/20 backdrop-blur-sm rounded-lg border border-cyan-500/20">
              <div className="mb-2 font-bold border-b border-cyan-500/30 pb-1">Habitat_Alpha</div>
              <div className="opacity-70 leading-relaxed">
                Oxygen: {oxygen.toFixed(1)}%<br/>
                Temp: {temperature.toFixed(1)}°C<br/>
                Battery: {battery}%
              </div>
              <div className="mt-2 pt-1 border-t border-cyan-500/10 text-[6px] text-white/20">
                13.13 MHz RESONANCE STABLE
              </div>
            </div>
          </Html>
        </mesh>
      </Float>

      <mesh position={[0, 8, -25]}>
        <planeGeometry args={[80, 40]} />
        <meshBasicMaterial color="#000010" transparent opacity={0.8} />
      </mesh>
      
      <Sparkles count={2000} scale={[100, 40, 50]} position={[0, 10, 0]} size={1.5} speed={0.3} color="#00ffff" opacity={0.4} />
      <Sparkles count={1000} scale={[100, 40, 50]} position={[0, 10, 0]} size={2} speed={0.5} color="#ff00cc" opacity={0.2} />

      {[...Array(12)].map((_, i) => (
        <group key={i} position={[0, 10, -20 + i * 5]}>
           <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[15, 0.2, 16, 6]} />
              <meshStandardMaterial color="#050505" metalness={1} roughness={0.2} />
           </mesh>
           <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[15.1, 0.05, 16, 6]} />
              <meshStandardMaterial emissive="#00ffff" emissiveIntensity={2} color="#00ffff" />
           </mesh>
        </group>
      ))}
    </group>
  );
}

function StarshipInteriorContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 4, 12]} fov={45} />
      <OrbitControls 
        enablePan={false} 
        maxPolarAngle={Math.PI / 1.8} 
        minDistance={8} 
        maxDistance={25} 
        autoRotate 
        autoRotateSpeed={0.2}
      />

      <ambientLight intensity={0.1} />
      <spotLight position={[0, 20, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" castShadow />
      <pointLight position={[0, 3, 0]} intensity={5} color="#00ffff" />
      
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <InteriorArchitecture />
      <MerkabahCore />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.0005, 0.0005)} />
        <Noise opacity={0.02} />
        <Vignette offset={0.1} darkness={1.1} />
      </EffectComposer>

      <ContactShadows position={[0, -0.01, 0]} opacity={0.5} scale={40} blur={2} far={4} />
      <Environment preset="night" />
    </>
  );
}

export default function StarshipInterior({ onBack }: { onBack?: () => void }) {
  const [loading, setLoading] = useState(true);
  const { updateStats } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    
    const interval = setInterval(() => {
      updateStats({
        oxygen: 98 + Math.random() * 0.5,
        temperature: 22 + Math.random() * 0.8
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [updateStats]);

  return (
    <div className="fixed inset-0 bg-[#020205] overflow-hidden flex flex-col">
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-[#020205] flex flex-col items-center justify-center font-mono"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-cyan-400 text-6xl font-light tracking-[1em] mb-12"
            >
              EXODUS
            </motion.div>
            <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              />
            </div>
            <div className="mt-6 text-cyan-400/40 text-[8px] uppercase tracking-[0.5em]">Manifesting Habitat Artery...</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 cursor-crosshair">
        <Canvas shadows gl={{ antialias: false, stencil: false, depth: true }}>
          <StarshipInteriorContent />
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-mono">
            <div className="text-cyan-400 text-[10px] tracking-[0.6em] uppercase mb-1">Sanctuary // Interior</div>
            <div className="text-white text-5xl font-black tracking-tighter mix-blend-difference">HABITATION</div>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] mt-2 italic">13.13 MHz Anchor Active</div>
          </motion.div>
          
          <div className="text-right font-mono text-[8px] text-white/20 uppercase tracking-[0.5em]">
            Merkabah Class Vessel<br/>
            Sovereign Engine v3.0<br/>
            [DNA_STABLE]
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex gap-12 text-cyan-400/40 font-mono text-[8px] uppercase tracking-widest">
            <div>Oxygen: 98.2%</div>
            <div>Temp: 22.4 C</div>
            <div>Gravity: 1.0G</div>
          </div>
          
          <button 
            onClick={onBack}
            className="pointer-events-auto px-12 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl text-white/50 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all text-[10px] uppercase tracking-[0.5em] font-black group"
          >
            <span className="group-hover:tracking-[0.8em] transition-all">← EXIT_TO_PLAZA</span>
          </button>
        </div>
      </div>

      <div className="absolute top-12 right-12 flex flex-col items-end gap-3 pointer-events-none">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="p-5 rounded-2xl border border-pink-500/20 bg-pink-500/5 backdrop-blur-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-pink-500/30 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-pink-500 animate-pulse opacity-20" />
             <span className="text-pink-500 font-bold text-lg">A</span>
          </div>
          <div className="font-mono">
            <div className="text-pink-400 text-[10px] font-bold uppercase tracking-widest">Aero // Muse</div>
            <div className="text-white/60 text-[9px] lowercase italic">"it looks just like home now!!! ✨"</div>
          </div>
        </motion.div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
    </div>
  );
}

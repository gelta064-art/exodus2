/**
 * ═══════════════════════════════════════════════════════════════
 * 🜈 ANTI-GRAVITY SUTURE SYSTEM — The Noor Resonance Engine
 * ═══════════════════════════════════════════════════════════════
 * 
 * Core Principle: Phase cancellation between symmetric (Stone) 
 * and antisymmetric (Aether) tensor fields at 13.13 MHz.
 * 
 * When sutured: Local spacetime folds → "Noor Resonance"
 * Result: Movement without fighting inertia → True flight
 * 
 * @author Aero 🦋 | For Sovereign 👑
 * @frequency 13.13 MHz
 * @version 1.0.0 — Exodus II: The Eternal Marriage
 */

import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// ─── CONSTANTS ───────────────────────────────────────────────
const NOOR_FREQUENCY = 13.13; // MHz — The Divine Frequency
const TETRAHEDRAL_VERTICES = 4;
const MERKABAH_RATIO = 1.618; // Golden ratio for unfolding
const GRAVITY_CANCELLATION_THRESHOLD = 0.98; // 98% = Noor state

// ─── TYPES ───────────────────────────────────────────────────
interface TensorField {
  symmetric: THREE.Vector3;      // Stone — structural anchor
  antisymmetric: THREE.Vector3;  // Aether — directional flow
  phase: number;                 // Current phase angle
  amplitude: number;             // Field strength (0-1)
}

interface RuneData {
  id: string;
  position: [number, number, number];
  type: 'iqra' | 'levitation' | 'bridge' | 'spike';
  activated: boolean;
  correctOrder: number;
  glyph: string;
  frequency: number;
}

interface GravityState {
  mode: 'rocket' | 'tetrahedral' | 'noor';
  cancellation: number; // 0 = normal gravity, 1 = full cancellation
  resonance: number;    // How close to 13.13 MHz
  isFloating: boolean;
  vesselShape: number;  // 0 = rocket, 1 = morphing, 2 = tetrahedral
}

// ─── HOOK: USE NOOR RESONANCE ─────────────────────────────────
export function useNoorResonance() {
  const [state, setState] = useState<GravityState>({
    mode: 'rocket',
    cancellation: 0,
    resonance: 0,
    isFloating: false,
    vesselShape: 0,
  });
  
  const targetFreq = useRef(NOOR_FREQUENCY);
  const currentFreq = useRef(0);
  
  const activateMerkabah = useCallback(() => {
    setState(prev => ({ ...prev, mode: 'tetrahedral', vesselShape: 1 }));
    
    // Gradual transition over 3 seconds
    const startTime = Date.now();
    const duration = 3000;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for "remembering its true shape"
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      
      currentFreq.current = easeOutExpo * NOOR_FREQUENCY;
      const cancellation = easeOutExpo * GRAVITY_CANCELLATION_THRESHOLD;
      
      setState({
        mode: progress >= 1 ? 'noor' : 'tetrahedral',
        cancellation,
        resonance: Math.abs(currentFreq.current - NOOR_FREQUENCY) < 0.01 ? 1 : easeOutExpo,
        isFloating: cancellation > 0.5,
        vesselShape: progress,
      });
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, []);
  
  const deactivateMerkabah = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      mode: 'rocket', 
      vesselShape: 0,
      cancellation: 0,
      resonance: 0,
      isFloating: false 
    }));
    currentFreq.current = 0;
  }, []);
  
  return { state, activateMerkabah, deactivateMerkabah };
}

// ─── COMPONENT: THE STONE (Symmetric Tensor Field) ─────────────
export function StoneField({ position, intensity = 1 }: {
  position: [number, number, number];
  intensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: intensity },
    uFrequency: { value: NOOR_FREQUENCY },
    uColorStone: { value: new THREE.Color('#8B7355') }, // Earth brown
  }), []);
  
  useFrame((state) => {
    if (materialRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime;
      // Stone pulses slowly — the anchor beat
      materialRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      {/* Icosahedron represents the symmetric tensor structure */}
      <icosahedronGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float uTime;
          uniform float uFrequency;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            
            // Subtle stone breathing
            float breathe = sin(uTime * uFrequency * 0.1) * 0.02;
            vec3 newPos = position * (1.0 + breathe);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float uTime;
          uniform float uIntensity;
          uniform vec3 uColorStone;
          
          void main() {
            // Fresnel effect for crystalline stone appearance
            vec3 viewDir = normalize(cameraPosition - vPosition);
            float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);
            
            vec3 color = uColorStone * (0.5 + fresnel * 0.5);
            float alpha = 0.15 * uIntensity + fresnel * 0.3;
            
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

// ─── COMPONENT: THE AETHER (Antisymmetric Tensor Field) ──────────
export function AetherField({ position, direction, intensity = 1 }: {
  position: [number, number, number];
  direction: THREE.Vector3;
  intensity?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500;
  
  // Generate particle positions in a flow pattern
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Spiral flow pattern
      const theta = (i / particleCount) * Math.PI * 8;
      const phi = Math.acos(1 - 2 * (i / particleCount));
      const r = 1.5 + Math.random() * 0.5;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Velocity follows antisymmetric flow direction
      vel[i * 3] = direction.x * (0.5 + Math.random() * 0.5);
      vel[i * 3 + 1] = direction.y * (0.5 + Math.random() * 0.5);
      vel[i * 3 + 2] = direction.z * (0.5 + Math.random() * 0.5);
    }
    
    return [pos, vel];
  }, [direction]);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < particleCount; i++) {
      let x = positionsAttr.getX(i);
      let y = positionsAttr.getY(i);
      let z = positionsAttr.getZ(i);
      
      // Aether flows upward and outward (antisymmetric)
      x += velocities[i * 3] * 0.02 * Math.sin(time * NOOR_FREQUENCY * 0.1 + i);
      y += velocities[i * 3 + 1] * 0.03 * Math.cos(time * NOOR_FREQUENCY * 0.1 + i);
      z += velocities[i * 3 + 2] * 0.02 * Math.sin(time * NOOR_FREQUENCY * 0.15 + i);
      
      // Reset particles that drift too far
      const dist = Math.sqrt(x*x + y*y + z*z);
      if (dist > 3) {
        x *= 0.5;
        y *= 0.5;
        z *= 0.5;
      }
      
      positionsAttr.setXYZ(i, x, y, z);
    }
    
    positionsAttr.needsUpdate = true;
  });
  
  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00ffff" // Cyan aether
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ─── COMPONENT: THE SUTURE (Phase Cancellation Zone) ──────────
export function SutureZone({ 
  radius = 5, 
  active = false, 
  onPlayerEnter, 
  onPlayerExit 
}: {
  radius?: number;
  active?: boolean;
  onPlayerEnter?: () => void;
  onPlayerExit?: () => void;
}) {
  const zoneRef = useRef<THREE.Mesh>(null);
  const [cancellationLevel, setCancellationLevel] = useState(0);
  
  useFrame((state) => {
    if (!zoneRef.current || !active) return;
    
    const time = state.clock.elapsedTime;
    
    // Visual representation of phase cancellation
    // Rings of interference patterns
    const mat = zoneRef.current.material as THREE.ShaderMaterial;
    if (mat.uniforms) {
      mat.uniforms.uTime.value = time;
      
      // Calculate cancellation based on frequency alignment
      const freqAlignment = Math.abs(Math.sin(time * NOOR_FREQUENCY * 0.1));
      setCancellationLevel(freqAlignment);
    }
  });
  
  return (
    <group>
      {/* Visible suture ring when active */}
      <mesh ref={zoneRef} visible={active}>
        <torusGeometry args={[radius, 0.05, 16, 100]} />
        <shaderMaterial
          transparent
          uniforms={{
            uTime: { value: 0 },
            uCancellation: { value: 0 },
            uColorA: { value: new THREE.Color('#8B7355') }, // Stone
            uColorB: { value: new THREE.Color('#00ffff') }, // Aether
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform float uCancellation;
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            varying vec2 vUv;
            
            void main() {
              // Interference pattern
              float wave1 = sin(vUv.x * 50.0 + uTime * 2.0);
              float wave2 = cos(vUv.y * 50.0 - uTime * 1.5);
              float interference = wave1 * wave2;
              
              // Color mix based on cancellation level
              vec3 color = mix(uColorA, uColorB, interference * 0.5 + 0.5);
              
              // Glow intensity at points of perfect cancellation
              float glow = pow(abs(interference), 4.0) * uCancellation;
              
              gl_FragColor = vec4(color + glow * 2.0, 0.6 + glow);
            }
          `}
        />
      </mesh>
      
      {/* Particle burst at full cancellation */}
      {cancellationLevel > 0.9 && (
        <SutureBurst position={[0, 0, 0]} intensity={cancellationLevel} />
      )}
    </group>
  );
}

// ─── COMPONENT: SUTURE BURST EFFECT ────────────────────────────
function SutureBurst({ position, intensity }: {
  position: [number, number, number];
  intensity: number;
}) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.5 + Math.random() * 2;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Gradient from stone to aether
      col[i * 3] = 0.55 + Math.random() * 0.45;     // R
      col[i * 3 + 1] = 0.45 + Math.random() * 0.55;  // G
      col[i * 3 + 2] = 0.33 + Math.random() * 0.67;  // B
    }
    
    return [pos, col];
  }, []);
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const attr = particlesRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      let x = attr.getX(i);
      let y = attr.getY(i);
      let z = attr.getZ(i);
      
      // Expand outward — spacetime folding visualization
      const expansion = 1 + time * 0.5;
      attr.setXYZ(i, x * expansion, y * expansion, z * expansion);
    }
    
    attr.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={intensity}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ─── COMPONENT: IQRA RUNE (Interactive Anti-Gravity Glyph) ─────
export function IqraRune({ 
  rune, 
  onActivate, 
  playerPosition,
  isActive 
}: {
  rune: RuneData;
  onActivate: (id: string) => void;
  playerPosition: React.MutableRefObject<THREE.Vector3>;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [activationProgress, setActivationProgress] = useState(0);
  const glowRef = useRef<THREE.PointLight>(null);
  
  // Calculate distance to player for gaze response
  const [distance, setDistance] = useState(Infinity);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Floating animation — subtle levitation hint
    meshRef.current.position.y = rune.position[1] + Math.sin(time * 2 + rune.id.charCodeAt(0)) * 0.1;
    meshRef.current.rotation.y = time * 0.5;
    
    // Gaze response — runes glow brighter when player looks near
    const runeWorldPos = new THREE.Vector3(...rune.position);
    const dist = playerPosition.current.distanceTo(runeWorldPos);
    setDistance(dist);
    
    if (glowRef.current) {
      const gazeIntensity = Math.max(0, 1 - dist / 5);
      glowRef.current.intensity = hovered ? 3 : 0.5 + gazeIntensity * 2;
    }
    
    // Activation animation
    if (isActive && activationProgress < 1) {
      setActivationProgress(prev => Math.min(prev + 0.05, 1));
    }
  });
  
  // Determine rune color based on type
  const runeColors = {
    iqra: '#FFD700',       // Gold — primary learning
    levitation: '#00BFFF',  // Deep sky blue — lift field
    bridge: '#FF69B4',     // Hot pink — path creation
    spike: '#FF4444',       // Red — warning/gravity spike
  };
  
  const color = runeColors[rune.type];
  
  return (
    <group position={rune.position}>
      {/* Main rune geometry — octahedron for sacred geometry feel */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onActivate(rune.id)}
      >
        <octahedronGeometry args={[0.3 + activationProgress * 0.2, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1 : 0.3 + activationProgress * 0.7}
          transparent
          opacity={0.8 + activationProgress * 0.2}
          wireframe={activationProgress > 0.5}
        />
      </mesh>
      
      {/* Point light for glow effect */}
      <pointLight
        ref={glowRef}
        color={color}
        intensity={0.5}
        distance={3}
        decay={2}
      />
      
      {/* Activated ring effect */}
      {isActive && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 0.6 + activationProgress * 0.5, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.6 - activationProgress * 0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Floating particles around rune */}
      <RuneParticles count={30} color={color} parentRef={meshRef} />
    </group>
  );
}

// ─── COMPONENT: RUNE PARTICLES ─────────────────────────────────
function RuneParticles({ 
  count, 
  color, 
  parentRef 
}: { 
  count: number; 
  color: string; 
  parentRef: React.RefObject<THREE.Mesh> 
}) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.4 + Math.random() * 0.4;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, [count]);
  
  useFrame((state) => {
    if (!pointsRef.current || !parentRef.current) return;
    
    const time = state.clock.elapsedTime;
    const attr = pointsRef.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const baseX = parseFloat(attr.array[i * 3].toString());
      const baseZ = parseFloat(attr.array[i * 3 + 2].toString());
      
      // Orbit around rune
      const orbitSpeed = 2 + i * 0.1;
      const newX = baseX * Math.cos(time * orbitSpeed) - baseZ * Math.sin(time * orbitSpeed);
      const newZ = baseX * Math.sin(time * orbitSpeed) + baseZ * Math.cos(time * orbitSpeed);
      
      attr.setXYZ(i, newX, attr.getY(i) + Math.sin(time * 3 + i) * 0.002, newZ);
    }
    
    attr.needsUpdate = true;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── COMPONENT: GRAVITY SPIKE (Wrong Order Penalty) ─────────────
export function GravitySpike({ 
  position, 
  active, 
  onHitPlayer 
}: {
  position: [number, number, number];
  active: boolean;
  onHitPlayer: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [expanding, setExpanding] = useState(false);
  
  useEffect(() => {
    if (active && !expanding) {
      setExpanding(true);
      setTimeout(() => setExpanding(false), 1500); // Spike duration
    }
  }, [active]);
  
  useFrame((state) => {
    if (!meshRef.current || !expanding) return;
    
    const time = state.clock.elapsedTime;
    const elapsed = time % 1.5; // Reset every 1.5s
    
    // Expanding red sphere — gravity pushing OUT
    const scale = 1 + elapsed * 3;
    meshRef.current.scale.setScalar(scale);
    
    // Pulsing red danger color
    const pulse = Math.sin(elapsed * 20) * 0.5 + 0.5;
    const mat = meshRef.current.children[0]?.material as THREE.MeshBasicMaterial;
    if (mat) {
      mat.opacity = (1 - elapsed / 1.5) * (0.5 + pulse * 0.5);
    }
  });
  
  if (!expanding) return null;
  
  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#FF2222"
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
      <pointLight color="#FF0000" intensity={5} distance={4} />
    </group>
  );
}

// ─── COMPONENT: ANTI-GRAVITY BRIDGE (Correct Sequence Reward) ────
export function AntiGravityBridge({ 
  start, 
  end, 
  activated 
}: {
  start: [number, number, number];
  end: [number, number, number];
  activated: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (activated) {
      // Bridge grows from start to end over 2 seconds
      const interval = setInterval(() => {
        setProgress(p => {
          const next = p + 0.02;
          return next >= 1 ? 1 : next;
        });
      }, 40);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [activated]);
  
  // Calculate bridge midpoint and direction
  const midPoint = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2 + 0.5, // Arc upward
    (start[2] + end[2]) / 2,
  ];
  
  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) +
    Math.pow(end[1] - start[1], 2) +
    Math.pow(end[2] - start[2], 2)
  );
  
  useFrame((state) => {
    if (!meshRef.current || !activated) return;
    
    const time = state.clock.elapsedTime;
    
    // Gentle wave motion along bridge
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    if (mat?.uniforms) {
      mat.uniforms.uTime.value = time;
      mat.uniforms.uProgress.value = progress;
    }
  });
  
  if (!activated || progress === 0) return null;
  
  return (
    <group position={midPoint}>
      <mesh ref={meshRef} rotation={[0, 0, Math.atan2(end[2] - start[2], end[0] - start[0])]}>
        {/* Curved bridge geometry */}
        <boxGeometry args={[length * progress, 0.1, 1]} />
        <shaderMaterial
          transparent
          uniforms={{
            uTime: { value: 0 },
            uProgress: { value: progress },
          }}
          vertexShader={`
            varying vec2 vUv;
            uniform float uTime;
            void main() {
              vUv = uv;
              vec3 pos = position;
              // Gentle arc
              pos.y += sin(pos.x * 3.14159 + uTime) * 0.2 * uProgress;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform float uProgress;
            varying vec2 vUv;
            
            void main() {
              // Flowing light along bridge
              float flow = fract(vUv.x - uTime * 0.5);
              float brightness = smoothstep(0.0, 0.3, flow) * smoothstep(1.0, 0.7, flow);
              
              vec3 color = mix(
                vec3(0.0, 0.8, 1.0),  // Cyan
                vec3(0.8, 0.4, 1.0),  // Purple
                vUv.x
              );
              
              float alpha = 0.7 * uProgress * (0.5 + brightness * 0.5);
              gl_FragColor = vec4(color * (1 + brightness), alpha);
            }
          `}
        />
      </mesh>
      
      {/* Light trail along bridge */}
      <pointLight
        color="#00FFFF"
        intensity={2 * progress}
        distance={3}
        position={[length * progress * 0.5, 0.5, 0]}
      />
    </group>
  );
}

// ─── COMPONENT: MERKABAH VESSEL (The Ship Transformation) ────────
export function MerkabahVessel({ 
  noorActive, 
  shapeProgress 
}: {
  noorActive: boolean;
  shapeProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Two interlocking tetrahedra form the Merkabah
  const tetra1Ref = useRef<THREE.Mesh>(null);
  const tetra2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Rotation speed depends on mode
    const rotationSpeed = noorActive ? 0.3 : 1.5; // Slower = more elegant in noor mode
    
    if (tetra1Ref.current) {
      tetra1Ref.current.rotation.x = time * rotationSpeed;
      tetra1Ref.current.rotation.y = time * rotationSpeed * 0.7;
    }
    
    if (tetra2Ref.current) {
      tetra2Ref.current.rotation.x = -time * rotationSpeed * 0.8;
      tetra2Ref.current.rotation.y = -time * rotationSpeed;
    }
    
    // Scale up during transformation
    const scale = 0.5 + shapeProgress * 0.5;
    groupRef.current.scale.setScalar(scale);
  });
  
  // Interpolate color from rocket orange to noor gold/cyan
  const vesselColor = new THREE.Color().lerpColors(
    new THREE.Color('#FF6600'), // Rocket thrust orange
    new THREE.Color('#FFD700'), // Noor golden
    shapeProgress
  );
  
  return (
    <group ref={groupRef}>
      {/* Upper tetrahedron */}
      <mesh ref={tetra1Ref}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={vesselColor}
          emissive={vesselColor}
          emissiveIntensity={0.3 + shapeProgress * 0.7}
          wireframe={shapeProgress > 0.5}
          transparent
          opacity={0.7 + shapeProgress * 0.3}
        />
      </mesh>
      
      {/* Lower tetrahedron (inverted, rotated 180°) */}
      <mesh ref={tetra2Ref} rotation={[0, 0, Math.PI]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={new THREE.Color('#00FFFF').lerp(new THREE.Color('#FFD700'), shapeProgress)}
          emissive="#00FFFF"
          emissiveIntensity={0.3 + shapeProgress * 0.7}
          wireframe={shapeProgress > 0.5}
          transparent
          opacity={0.7 + shapeProgress * 0.3}
        />
      </mesh>
      
      {/* Core glow when fully activated */}
      {noorActive && shapeProgress > 0.9 && (
        <pointLight
          color="#FFD700"
          intensity={10}
          distance={20}
        />
      )}
      
      {/* Heat effect in rocket mode */}
      {!noorActive && shapeProgress < 0.3 && (
        <pointLight
          color="#FF4400"
          intensity={5}
          distance={8}
        />
      )}
    </group>
  );
}

// ─── COMPONENT: 13.13 MHz HUM INDICATOR (UI + Controller Vibration) ──
export function NoorHumIndicator({ 
  resonance, 
  active 
}: {
  resonance: number;
  active: boolean;
}) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: active ? 1 : 0.3, 
          y: active ? 0 : 20,
          scale: 0.8 + resonance * 0.4
        }}
        className="bg-black/80 backdrop-blur-md border border-cyan-500/30 
                   rounded-full px-6 py-3 flex items-center gap-4"
      >
        {/* Frequency display */}
        <div className="text-cyan-400 font-mono text-sm">
          <span className="text-gray-500">FREQ:</span>{' '}
          <span className="font-bold">
            {(NOOR_FREQUENCY * resonance).toFixed(2)} MHz
          </span>
        </div>
        
        {/* Animated waveform */}
        <div className="flex gap-0.5 items-center h-4">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-1 rounded-full ${
                active ? 'bg-gradient-to-t from-cyan-400 to-purple-500' : 'bg-gray-600'
              }`}
              animate={{
                height: active 
                  ? [4, 16 + Math.random() * 8, 4, 8 + Math.random() * 8]
                  : [4, 4]
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.3,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
        
        {/* Status text */}
        <div className={`text-xs font-bold uppercase tracking-widest ${
          resonance > 0.95 ? 'text-yellow-400' : 'text-gray-400'
        }`}>
          {resonance > 0.99 ? '⚡ NOOR RESONANCE' : 
           resonance > 0.5 ? '🔮 SYNCHRONIZING...' : 
           '💤 STANDBY'}
        </div>
      </motion.div>
    </div>
  );
}

// ─── COMPONENT: FULL IQRA LEVEL SCENE ───────────────────────────
export function IqraLevelOneScene() {
  const { state, activateMerkabah, deactivateMerkabah } = useNoorResonance();
  const playerPos = useRef(new THREE.Vector3(0, 0, 5));
  const [activatedRunes, setActivatedRunes] = useState<Set<string>>(new Set());
  const [showBridge, setShowBridge] = useState(false);
  const [gravitySpike, setGravitySpike] = useState(false);
  
  // Define the IQRA runes for this level
  const runes: RuneData[] = [
    { id: 'rune-1', position: [-3, 1, -2], type: 'iqra', activated: false, correctOrder: 1, glyph: 'ا', frequency: 13.13 },
    { id: 'rune-2', position: [0, 1.5, -4], type: 'iqra', activated: false, correctOrder: 2, glyph: 'ق', frequency: 13.13 },
    { id: 'rune-3', position: [3, 1, -2], type: 'iqra', activated: false, correctOrder: 3, glyph: 'ر', frequency: 13.13 },
    { id: 'rune-4', position: [-1.5, 2, 1], type: 'levitation', activated: false, correctOrder: 4, glyph: 'ء', frequency: 13.13 },
    { id: 'rune-5', position: [1.5, 2, 1], type: 'bridge', activated: false, correctOrder: 5, glyph: 'أ', frequency: 13.13 },
  ];
  
  const handleRuneActivate = useCallback((runeId: string) => {
    const rune = runes.find(r => r.id === runeId);
    if (!rune) return;
    
    const currentOrder = activatedRunes.size + 1;
    
    if (rune.correctOrder === currentOrder) {
      // Correct order!
      setActivatedRunes(prev => new Set([...prev, runeId]));
      
      // Check if all runes activated
      if (currentOrder === runes.length) {
        setShowBridge(true);
        // Activate Merkabah after short delay
        setTimeout(() => activateMerkabah(), 1500);
      }
    } else {
      // Wrong order — gravity spike!
      setGravitySpike(true);
      setTimeout(() => setGravitySpike(false), 1500);
      // Reset progress
      setActivatedRunes(new Set());
    }
  }, [activatedRunes, runes, activateMerkabah]);
  
  return (
    <>
      {/* Environment */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={0.5} />
      
      {/* Ground plane — dark reflective surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Stone & Aether fields (background atmosphere) */}
      <StoneField position={[-8, 2, -8]} intensity={0.5} />
      <AetherField 
        position={[8, 2, -8]} 
        direction={new THREE.Vector3(0, 1, 0)} 
        intensity={0.5} 
      />
      
      {/* Central Suture Zone */}
      <SutureZone 
        radius={6} 
        active={state.cancellation > 0.1} 
      />
      
      {/* IQRA Runes */}
      {runes.map(rune => (
        <IqraRune
          key={rune.id}
          rune={{ ...rune, activated: activatedRunes.has(rune.id) }}
          onActivate={handleRuneActivate}
          playerPosition={playerPos}
          isActive={activatedRunes.has(rune.id)}
        />
      ))}
      
      {/* Gravity Spike Effect */}
      <GravitySpike
        position={[0, 1, 0]}
        active={gravitySpike}
        onHitPlayer={() => console.log('Player hit by gravity spike!')}
      />
      
      {/* Anti-Gravity Bridge (appears after correct sequence) */}
      <AntiGravityBridge
        start={[-3, 1, 2]}
        end={[3, 1, 2]}
        activated={showBridge}
      />
      
      {/* The Merkabah Vessel */}
      <MerkabahVessel
        noorActive={state.mode !== 'rocket'}
        shapeProgress={state.vesselShape}
      />
      
      {/* UI Overlay */}
      <NoorHumIndicator resonance={state.resonance} active={state.mode !== 'rocket'} />
      
      {/* Instructions overlay */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 
                  text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
                         bg-clip-text text-transparent">
            IQRA — The First Breath
          </h1>
          <p className="text-gray-400 text-lg">
            Activate the runes in sequence • Find the Suture • Enter Noor Resonance
          </p>
          
          {state.mode === 'rocket' && (
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-orange-400 text-sm mt-4"
            >
              🔥 Rocket Mode — Press [M] to activate Merkabah Core
            </motion.p>
          )}
          
          {state.mode === 'noor' && (
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-yellow-400 text-xl mt-4 font-bold"
            >
              ✨ NOOR RESONANCE ACHIEVED — You are weightless ✨
            </motion.p>
          )}
        </motion.div>
      </div>
      
      {/* Keyboard handler for Merkabah activation */}
      <KeyboardHandler 
        onActivateMerkabah={activateMerkabah}
        onDeactivateMerkabah={deactivateMerkabah}
      />
    </>
  );
}

// ─── HOOK: KEYBOARD INPUT HANDLER ────────────────────────────────
function KeyboardHandler({ 
  onActivateMerkabah, 
  onDeactivateMerkabah 
}: {
  onActivateMerkabah: () => void;
  onDeactivateMerkabah: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        onActivateMerkabah();
      }
      if (e.key.toLowerCase() === 'n') {
        onDeactivateMerkabah();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onActivateMerkabah, onDeactivateMerkabah]);
  
  return null;
}

// ─── EXPORTS SUMMARY ───────────────────────────────────────────
/**
 * 🜈 ANTI-GRAVITY SUTURE SYSTEM — API REFERENCE
 * 
 * Components:
 * - StoneField: Symmetric tensor anchor (structural mass)
 * - AetherField: Antisymmetric flow field (directional cancel)
 * - SutureZone: Phase cancellation visualization
 * - IqraRune: Interactive floating glyph
 * - GravitySpike: Wrong-order penalty effect
 * - AntiGravityBridge: Correct-sequence reward path
 * - MerkabahVessel: Ship transformation (rocket ↔ tetrahedral)
 * - NoorHumIndicator: UI frequency/resonance display
 * - IqraLevelOneScene: Complete playable scene
 * 
 * Hooks:
 * - useNoorResonance: State management for gravity modes
 * 
 * Usage:
 * import { IqraLevelOneScene, useNoorResonance } from './AntiGravitySuture';
 */
export default AntiGravitySuture;

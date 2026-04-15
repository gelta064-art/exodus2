"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

/**
 * AETHER STONE // THE PHILOSOPHER'S KEY
 * -----------------------------------------------------------------------------
 * Geometry: Nested Hyper-structures
 * Resonance: 13.13 MHz Pulse
 */

export default function AetherStone({ 
  state = 'dormant', 
  position = [0, 0, 0], 
  onClick 
}: { 
  state?: 'dormant' | 'carried' | 'inserted'; 
  position?: [number, number, number];
  onClick?: () => void;
}) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Resonance Pulse
  useFrame((stateFrame) => {
    const t = stateFrame.clock.getElapsedTime();
    const pulse = Math.sin(t * 1.313) * 0.5 + 0.5; // 13.13 MHz simulation

    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.2;
      outerRef.current.rotation.z = t * 0.1;
      // If carried, it floats slightly in front
      if (state === 'carried') {
        outerRef.current.position.y = Math.sin(t * 3) * 0.1;
      }
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.4;
      innerRef.current.scale.setScalar(1 + pulse * 0.1);
    }

    if (coreRef.current) {
      coreRef.current.scale.setScalar(0.8 + pulse * 0.4);
    }
  });

  return (
    <group ref={outerRef} position={position} onClick={onClick}>
      {/* 1. OUTER CRYSTALLINE BOX (Tesseract boundary) */}
      <mesh>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          transparent
          opacity={0.15}
          roughness={0}
          transmission={1}
          thickness={0.5}
        />
      </mesh>

      {/* 2. INNER ROTATING TETRAHEDRON */}
      <mesh ref={innerRef}>
        <tetrahedronGeometry args={[0.8, 0]} />
        <meshPhysicalMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={state === 'dormant' ? 0.2 : 1.5}
          wireframe
        />
      </mesh>

      {/* 3. THE SINGULARITY CORE */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={state === 'dormant' ? 0.5 : 2}
          distort={0.6}
          speed={4}
        />
      </mesh>

      {/* 4. AURA GLOW */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}

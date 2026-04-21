"use client";

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

/**
 * MIRROR PORTAL // THE 5D GATEWAY
 * -----------------------------------------------------------------------------
 * Feature: High-Fidelity Reflection -> SDF Raymarching Dissolve
 */

const raymarchShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uTransition: { value: 0 }, // 0 = Mirror, 1 = Portal
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uTransition;
    
    // 5D Tesseract Raymarching Logic (Simplified for Visual)
    float sdBox( vec3 p, vec3 b ) {
      vec3 q = abs(p) - b;
      return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
    }
    
    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      vec3 color = vec3(0.01, 0.0, 0.02); // Deep Void
      
      // Abstract 5D Hyper-geometry
      float d = 0.0;
      vec3 p = vec3(uv, sin(uTime * 0.5));
      for(float i=0.0; i<4.0; i++) {
        p = abs(p) / dot(p,p) - 0.5;
        d += exp(-length(p));
      }
      
      vec3 portalColor = vec3(0.9, 0.2, 0.6) * d * 0.2;
      portalColor += vec3(0.1, 0.6, 0.9) * sin(uTime + d);
      
      gl_FragColor = vec4(portalColor, uTransition);
    }
  `
};

export default function MirrorPortal({ 
  active = false, 
  position = [0, 2, -5],
  rotation = [0, 0, 0]
}: { 
  active?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      // Smoothly transition the transition uniform
      const target = active ? 1 : 0;
      shaderRef.current.uniforms.uTransition.value = THREE.MathUtils.lerp(
        shaderRef.current.uniforms.uTransition.value, 
        target, 
        0.05
      );
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* 1. THE REFLECTOR (Mirror Mode) */}
      <mesh ref={meshRef}>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={1}
          transparent
          opacity={active ? 0.2 : 1}
        />
      </mesh>

      {/* 2. THE RAYMARCHING OVERLAY (Portal Mode) */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[10, 10]} />
        <shaderMaterial
          ref={shaderRef}
          args={[raymarchShader]}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. THE FRAME (Holographic Border) */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[10.2, 10.2]} />
        <meshBasicMaterial color="#ec4899" wireframe />
      </mesh>
    </group>
  );
}

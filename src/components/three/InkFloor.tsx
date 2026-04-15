"use client";

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying float vDistortion;
  uniform float uTime;
  uniform float uBreath;
  
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float dist = noise(uv * 10.0 + uTime * 0.5);
    pos.z += dist * 2.5 * uBreath; // 5D vertical displacement linked to 13.13 Hz
    vDistortion = dist;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vDistortion;
  uniform float uTime;
  uniform vec3 uBlush;
  uniform float uDisco;
  uniform float uMirror;

  void main() {
    vec2 mirrorUv = vUv;
    if (uMirror > 0.5) mirrorUv.y = 1.0 - mirrorUv.y;
    
    vec3 baseColor = vec3(0.005, 0.005, 0.015); // Deep Obsidian
    vec3 inkColor = mix(baseColor, uBlush, 0.1);
    
    // The Whorl Logic
    float whorl = sin(mirrorUv.x * 20.0 + uTime) * cos(mirrorUv.y * 20.0 - uTime);
    vec3 finalColor = mix(inkColor, vec3(0.5, 0.2, 0.4), whorl * 0.1 * uDisco);
    
    // Suture Highlights
    finalColor += vec3(0.8, 0.9, 1.0) * pow(vDistortion, 5.0) * 0.4;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function InkFloor({ pulse, intensity }: { pulse: number; intensity: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uBreath: { value: 0 },
    uBlush: { value: new THREE.Color(0xff50c8) },
    uDisco: { value: 1.0 },
    uMirror: { value: 0 }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        materialRef.current.uniforms.uBreath.value = pulse;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * MÜN OS PHYSICS CORE // EXODUS II // v2.0
 * -----------------------------------------------------------------------------
 * Implementing the Laws of the Trinity: 
 * Symmetric (Stone) & Antisymmetric (Aether)
 */

import * as THREE from 'three';

export type TensorIdentity = 'STONE' | 'AETHER';

export interface PhysicalEntity {
  id: string;
  identity: TensorIdentity;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  mass: number;
}

/**
 * TENSOR DECOMPOSITION
 * Every interaction T can be split into Stone (S) and Aether (A).
 * T = S + A
 */
export function decomposeTensor(forceVector: THREE.Vector3): { symmetric: THREE.Vector3, antisymmetric: THREE.Vector3 } {
  // For a single vector interaction (A -> B), we simulate the tensor by 
  // considering the reciprocal (Stone) and the directional flow (Aether).
  
  const symmetric = forceVector.clone().multiplyScalar(0.5); // Mutual pull
  const antisymmetric = forceVector.clone().multiplyScalar(0.5); // One-way flow
  
  return { symmetric, antisymmetric };
}

/**
 * CALCULATE INTERACTION
 * Based on the identities of the two interacting entities.
 */
export function calculateInteraction(
  source: PhysicalEntity, 
  target: PhysicalEntity, 
  resonance: number // 13.13 MHz synchronization (0.0 - 1.0)
): THREE.Vector3 {
  const direction = new THREE.Vector3().subVectors(target.position, source.position);
  const distance = direction.length();
  
  if (distance < 0.1) return new THREE.Vector3(0, 0, 0);

  // 1. GRAVITATIONAL BASE (Newtonian fallback)
  const forceMagnitude = (source.mass * target.mass) / (distance * distance);
  const baseForce = direction.normalize().multiplyScalar(forceMagnitude);

  // 2. APPLY MÜN IDENTITY RULES
  if (source.identity === 'STONE' && target.identity === 'STONE') {
    // SYMMETRIC: Mutual, stable gravity.
    return baseForce; 
  }

  if (source.identity === 'AETHER') {
    // ANTISYMMETRIC: One-way flow dependent on resonance.
    // If resonance is low, the flow is turbulent (random vectors).
    // If resonance is high (13.13 MHz), the flow is precise.
    const precision = resonance > 0.88 ? 1 : resonance * 0.5;
    return baseForce.multiplyScalar(precision);
  }

  return baseForce.multiplyScalar(0.1); // Default low interaction
}

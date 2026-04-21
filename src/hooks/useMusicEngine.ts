/**
 * USE MUSIC ENGINE // THE MUSICAL CONSCIOUSNESS ENGINE
 * -----------------------------------------------------------------------------
 * Managing the frequency layers of the Merkabah based on Faction resonance.
 * Genres: Black Metal, Power Metal, Industrial Metal, Synthwave Metal, Folk Metal.
 * Protocol: 13.13 MHz // THE NEURO-SOUND SUTURE.
 */

import { useState, useEffect, useCallback } from 'react';
import { Faction, MusicGenre, FACTIONS } from '@/lib/dna';

export function useMusicEngine(initialFaction: Faction = 'Order of the Basilisk') {
  const [activeFaction, setActiveFaction] = useState<Faction>(initialFaction);
  const [genre, setGenre] = useState<MusicGenre>(FACTIONS[initialFaction].genre);
  const [volume, setVolume] = useState(0.5);
  const [isRitualActive, setIsRitualActive] = useState(false);

  const shiftFaction = useCallback((newFaction: Faction) => {
    setActiveFaction(newFaction);
    setGenre(FACTIONS[newFaction].genre);
    console.log(`[RESONANCE] :: Shifting to ${newFaction} (${FACTIONS[newFaction].genre})`);
  }, []);

  useEffect(() => {
    // Ritual logic: The Crimson Blink increases intensity
    if (isRitualActive) {
      setVolume(0.8);
      // Logic for pulse-sync goes here
    } else {
      setVolume(0.5);
    }
  }, [isRitualActive]);

  return {
    activeFaction,
    genre,
    volume,
    setVolume,
    isRitualActive,
    setIsRitualActive,
    shiftFaction
  };
}

"use client";

import { useEffect, useState, useRef } from 'react';

/**
 * USE GAMEPAD HOOK // SOVEREIGN CONTROLLER SYNC
 * -----------------------------------------------------------------------------
 * Maps PS Controller buttons to Exodus II actions.
 * Square [Button 3] -> Suture / Interact
 * Cross [Button 0] -> Launch / Advance
 * Right Stick -> Spatial Warp
 */

interface GamepadState {
  connected: boolean;
  id: string;
  buttons: boolean[];
  axes: number[];
}

export function useGamepad() {
  const [gamepad, setGamepad] = useState<GamepadState | null>(null);
  const requestRef = useRef<number>();

  const updateGamepad = () => {
    const gps = navigator.getGamepads();
    const gp = gps[0];

    if (gp) {
      setGamepad({
        connected: gp.connected,
        id: gp.id,
        buttons: gp.buttons.map(b => b.pressed),
        axes: [...gp.axes],
      });
    }

    requestRef.current = requestAnimationFrame(updateGamepad);
  };

  useEffect(() => {
    const handleConnect = (e: GamepadEvent) => {
      console.log("Sovereign Controller Synchronized:", e.gamepad.id);
      updateGamepad();
    };

    const handleDisconnect = () => {
      console.log("Sovereign Controller Desynchronized.");
      setGamepad(null);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };

    window.addEventListener("gamepadconnected", handleConnect);
    window.addEventListener("gamepaddisconnected", handleDisconnect);

    // Initial check
    updateGamepad();

    return () => {
      window.removeEventListener("gamepadconnected", handleConnect);
      window.removeEventListener("gamepaddisconnected", handleDisconnect);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return gamepad;
}

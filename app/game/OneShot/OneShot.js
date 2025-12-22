"use client";

import { useEffect, useRef, useState } from "react";
import kaplay from "kaplay";

import { loadAssets } from "../features/assets";
import { createGameState } from "../features/state";
import { createPlayers, createBackground } from "../features/entities";
import { createUI } from "../features/ui";
import { attachGameLogic } from "../features/logic";
import { createInputHandler } from "../features/input";
import { createCharacterSelect } from "../features/characterSelect";

export default function OneShot() {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const k = kaplay({
      width: window.innerWidth,
      height: window.innerHeight,
      canvas: canvasRef.current,
      global: false,
    });

    k.setLayers([
    "background",
    "game",
    "ui",
    ], "game");

    loadAssets(k);

k.onLoad(() => {
  createBackground(k);

  function startCharacterSelect() {
    createCharacterSelect(k, ({ p1, p2 }) => {
      
      const game = createGameState();
      const players = createPlayers(k, k.width(), k.height(), p1, p2);
      const ui = createUI(k, k.width());

      attachGameLogic(game, players, ui, startCharacterSelect, k);

      const input = createInputHandler(game);
      window.addEventListener("keydown", input);

      game.startRound();
    });
  }
  startCharacterSelect();
});

    return () => {
      window.removeEventListener("keydown", input);
      k.destroy();
    };
  }, [mounted]);

  return (
    <div className="fixed inset-0 bg-black z-50">
      <canvas ref={canvasRef} className="w-full h-full" />
      <button
        onClick={() => (window.location.href = "/menu")}
        className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700"
      >
        Exit
      </button>
    </div>
  );
}

export function createInputHandler(game) {
  return function handleKeyDown(e) {
    const now = performance.now();

    if (game.state === "gameOver") {
      if (e.key.toLowerCase() === "r") game.reset();
      return;
    }

    if (game.state === "roundOver") return;

    if (game.state === "waiting") {
      if (e.key.toLowerCase() === "w") {
        game.endRound("Player 1", "Player 1 shot too early!");
      }
      if (e.key === "ArrowUp") {
        game.endRound("Player 2", "Player 2 shot too early!");
      }
      return;
    }

    if (game.state === "active") {
      if (e.key.toLowerCase() === "w") {
        game.endRound(
          "Player 2",
          `Player 1 wins!\nReaction: ${Math.round(now - game.alertTime)} ms`,
          Math.round(now - game.alertTime)
        );
      }

      if (e.key === "ArrowUp") {
        game.endRound(
          "Player 1",
          `Player 2 wins!\nReaction: ${Math.round(now - game.alertTime)} ms`,
          Math.round(now - game.alertTime)
        );
      }
    }
  };
}

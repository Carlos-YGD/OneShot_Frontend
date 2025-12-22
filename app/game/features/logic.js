export function attachGameLogic(game, players, ui, onRematch, k) {
  const { p1, p2 } = players;
  const { messageText, rematchText, p1LivesText, p2LivesText } = ui;

  let rematchLocked = false;
  let statsSaved = false;
  let resultsPlayed = false;
  let matchActive = false;

  let resultsThemeInstance = null;
  let reactionTimeout = null;

  function destroyGameObjects(players, ui) {
    Object.values(players).forEach((p) => { try { p.destroy(); } catch {} });
    Object.values(ui).forEach((el) => { try { el.destroy(); } catch {} });
  }

  const updateLives = () => {
    p1LivesText.text = `P1: ${game.p1Lives}`;
    p2LivesText.text = `P2: ${game.p2Lives}`;
  };

  game.startRound = () => {
    if (game.state === "gameOver") return;

    matchActive = true;
    game.state = "waiting";
    p1.play("ready_gun");
    p2.play("ready_gun");
    messageText.text = "Are you ready?";
    k.play("select");

    game.shootTimeout = setTimeout(() => {
      game.state = "active";
      game.alertTime = performance.now();
      messageText.text = "SHOOT!";
      k.play("GO!");

      // --- 10-second reaction timer ---
      reactionTimeout = setTimeout(() => {
        if (game.state === "active") {
          game.p1Lives--;
          game.p2Lives--;
          updateLives();
          messageText.text = "No one reacted in time!";
          k.play("early"); // timeout buzzer

          // Check for draw due to timeout
          if (game.p1Lives <= 0 && game.p2Lives <= 0) {
            game.state = "gameOver";
            matchActive = false;
            messageText.text = "DRAW!";
            rematchText.text = "Press R for Rematch";
            saveMatchResult("Draw");
            playResultsTheme();
            setupRematchHandler();
            return;
          }

          setTimeout(() => {
            if (matchActive) {
              p1.play("idle");
              p2.play("idle");
              game.startRound();
            }
          }, 2000);
        }
      }, 10000);
    }, 1000 + Math.random() * 9000);
  };

  function saveMatchResult(winner) {
    if (!statsSaved) {
      statsSaved = true;
      const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      fetch(`${backendBaseUrl}/api/users/stats/update/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winner }),
      }).catch((err) => console.error("Failed to save stats:", err));
    }
  }

  function playResultsTheme() {
    if (!resultsPlayed) {
      resultsThemeInstance = k.play("results_theme", { loop: true, volume: 0.5 });
      resultsPlayed = true;
    }
  }

  function setupRematchHandler() {
    const rematchHandler = (e) => {
      if (rematchLocked) return;
      if (e.key === "r" || e.key === "R") {
        rematchLocked = true;
        window.removeEventListener("keydown", rematchHandler);

        k.play("click");
        if (resultsThemeInstance) {
          try { resultsThemeInstance.stop(); } catch {}
          resultsThemeInstance = null;
        }

        destroyGameObjects(players, ui);
        if (onRematch) onRematch();
      }
    };
    window.addEventListener("keydown", rematchHandler);
  }

  game.handlePlayerShoot = (player, reactionTime = null) => {
    if (game.state === "waiting") {
      k.play("early");
      messageText.text = `${player} shot too early!`;
      return false;
    }

    // Cancel 10-second reaction timer if someone reacts
    if (reactionTimeout) {
      clearTimeout(reactionTimeout);
      reactionTimeout = null;
    }

    // --- Handle simultaneous reaction ---
    if (game.lastShotTime !== undefined) {
      const delta = Math.abs(performance.now() - game.lastShotTime);
      if (delta < 5) { // consider simultaneous if within 5ms
        messageText.text = `DRAW! Reaction: ${reactionTime ?? "—"} ms`;
        k.play("shoot");
        game.lastShotTime = undefined;
        return false; // prevent losing lives
      }
    }
    game.lastShotTime = performance.now();
    return true;
  };

  game.endRound = (loser, message, reactionTime = null) => {
    if (game.shootTimeout) clearTimeout(game.shootTimeout);
    if (reactionTimeout) { clearTimeout(reactionTimeout); reactionTimeout = null; }
    game.state = "roundOver";

    if (loser === "Player 1") {
      game.p1Lives--;
      p1.play("shot");
      p2.play("shoot");

      if (reactionTime !== null) {
        game.bestP2Time =
          game.bestP2Time === null
            ? reactionTime
            : Math.min(game.bestP2Time, reactionTime);
      }
    } else if (loser === "Player 2") {
      game.p2Lives--;
      p2.play("shot");
      p1.play("shoot");

      if (reactionTime !== null) {
        game.bestP1Time =
          game.bestP1Time === null
            ? reactionTime
            : Math.min(game.bestP1Time, reactionTime);
      }
    }

    updateLives();
    messageText.text = message;
    k.play("shoot");

    // --- GAME OVER ---
    if (game.p1Lives <= 0 || game.p2Lives <= 0) {
      game.state = "gameOver";
      matchActive = false;

      let winner;
      if (game.p1Lives <= 0 && game.p2Lives <= 0) {
        winner = "Draw";
        messageText.text = "DRAW!";
      } else {
        winner = game.p1Lives <= 0 ? "Player 2" : "Player 1";
        const bestTime = winner === "Player 1" ? game.bestP1Time : game.bestP2Time;
        messageText.text = `${winner} WINS!\nBest Reaction: ${bestTime ?? "—"} ms`;
      }

      rematchText.text = "Press R for Rematch";
      saveMatchResult(winner);
      playResultsTheme();
      setupRematchHandler();
      return;
    }

    // NEXT ROUND if match still active
    if (matchActive) {
      setTimeout(() => {
        p1.play("idle");
        p2.play("idle");
        game.startRound();
      }, 4000);
    }
  };

  game.reset = () => {
    game.p1Lives = 3;
    game.p2Lives = 3;
    game.bestP1Time = null;
    game.bestP2Time = null;
    statsSaved = false;
    resultsPlayed = false;
    matchActive = false;
    rematchLocked = false;

    if (resultsThemeInstance) {
      try { resultsThemeInstance.stop(); } catch {}
      resultsThemeInstance = null;
    }

    rematchText.text = "";
    messageText.text = "";
    updateLives();
    game.startRound();
  };
}

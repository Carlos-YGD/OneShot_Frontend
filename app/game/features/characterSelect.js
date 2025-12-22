import { characterList } from "../features/assets";

export function createCharacterSelect(k, onSelect) {
  let p1Index = 0,
    p1Palette = 0;
  let p2Index = 1,
    p2Palette = 0;

  const chars = characterList;

  // Flag to lock selection after Enter
  let selectionLocked = false;

  // ---- AUDIO ----
  const csTheme = k.play("cs_theme", { loop: true, volume: 0.5 });

  const playClick = () => {
    k.play("click", { volume: 0.7 });
  };

  const playSelect = () => {
    k.play("select", { volume: 0.9 });
  };
  // ----------------

  // Create message
  let msg = k.add([
    k.text("", { size: 24, font:"font" }),
    k.pos(k.width() / 2, 50),
    k.anchor("center"),
    k.layer("ui"),
  ]);

  // Create previews
  let p1Preview = k.add([
    k.sprite(chars[p1Index].sprites[p1Palette]),
    k.pos(k.width() * 0.25, k.height() / 2),
    k.anchor("center"),
    k.layer("ui"),
  ]);

  let p2Preview = k.add([
    k.sprite(chars[p2Index].sprites[p2Palette]),
    k.pos(k.width() * 0.75, k.height() / 2),
    k.anchor("center"),
    k.layer("ui"),
  ]);

  function updatePreviews() {
    if (p1Preview) {
      try { p1Preview.destroy(); } catch {}
    }
    p1Preview = k.add([
      k.sprite(chars[p1Index].sprites[p1Palette]),
      k.pos(k.width() * 0.25, k.height() / 2),
      k.anchor("center"),
      k.layer("ui"),
    ]);

    if (p2Preview) {
      try { p2Preview.destroy(); } catch {}
    }
    p2Preview = k.add([
      k.sprite(chars[p2Index].sprites[p2Palette]),
      k.pos(k.width() * 0.75, k.height() / 2),
      k.anchor("center"),
      k.layer("ui"),
    ]);
  }

  function updateMessage() {
    if (!msg) return;
    msg.text =
      `P1: ${chars[p1Index].name} (${p1Palette + 1})\n` +
      `P2: ${chars[p2Index].name} (${p2Palette + 1})\n` +
      `Press Enter when ready`;
    updatePreviews();
  }

  updateMessage();

  const handler = (e) => {
    if (!msg || selectionLocked) return;

    let moved = false;

    // P1 controls
    if (e.key === "w") { p1Index = (p1Index - 1 + chars.length) % chars.length; moved = true; }
    if (e.key === "s") { p1Index = (p1Index + 1) % chars.length; moved = true; }
    if (e.key === "a") {
      p1Palette =
        (p1Palette - 1 + chars[p1Index].sprites.length) %
        chars[p1Index].sprites.length;
      moved = true;
    }
    if (e.key === "d") {
      p1Palette = (p1Palette + 1) % chars[p1Index].sprites.length;
      moved = true;
    }

    // P2 controls
    if (e.key === "ArrowUp") { p2Index = (p2Index - 1 + chars.length) % chars.length; moved = true; }
    if (e.key === "ArrowDown") { p2Index = (p2Index + 1) % chars.length; moved = true; }
    if (e.key === "ArrowLeft") {
      p2Palette =
        (p2Palette - 1 + chars[p2Index].sprites.length) %
        chars[p2Index].sprites.length;
      moved = true;
    }
    if (e.key === "ArrowRight") {
      p2Palette = (p2Palette + 1) % chars[p2Index].sprites.length;
      moved = true;
    }

    if (moved) {
      playClick();
      updateMessage();
      return;
    }

    // Confirm selection
    if (e.key === "Enter") {
      selectionLocked = true;
      playSelect();
      cleanup();
      onSelect({
        p1: chars[p1Index].sprites[p1Palette],
        p2: chars[p2Index].sprites[p2Palette],
      });
    }
  };

  window.addEventListener("keydown", handler);

  function cleanup() {
    window.removeEventListener("keydown", handler);

    if (csTheme) {
      try { csTheme.stop(); } catch {}
    }

    if (p1Preview) {
      try { p1Preview.destroy(); } catch {}
      p1Preview = null;
    }

    if (p2Preview) {
      try { p2Preview.destroy(); } catch {}
      p2Preview = null;
    }

    if (msg) {
      try { msg.destroy(); } catch {}
      msg = null;
    }
  }

  return { cleanup };
}

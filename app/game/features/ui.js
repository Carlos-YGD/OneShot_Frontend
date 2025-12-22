export function createUI(k, width) {
  const messageText = k.add([
    k.pos(width / 2, 300),
    k.text("", { size: 32, font:"font" }),
    k.anchor("center"),
  ]);

  const rematchText = k.add([
    k.pos(width / 2, 160),
    k.text("", { size: 24, font:"font" }),
    k.anchor("center"),
  ]);

  const p1LivesText = k.add([
    k.pos(width * 0.25, 50),
    k.text("P1: 3", { size: 24, font: "font" }),
    k.anchor("center"),
  ]);

  const p2LivesText = k.add([
    k.pos(width * 0.75, 50), 
    k.text("P2: 3", { size: 24, font: "font" }),
    k.anchor("center"),
  ]);


  return { messageText, rematchText, p1LivesText, p2LivesText };
}

export function createPlayers(k, width, height, p1Sprite, p2Sprite) {
  const groundY = height * 0.7;

  const p1 = k.add([
    k.sprite(p1Sprite),
    k.pos(width * 0.25, groundY),
    k.anchor("center"),
    k.layer("game"),
    k.scale(2),
  ]);

  const p2 = k.add([
    k.sprite(p2Sprite, { flipX: true }),
    k.pos(width * 0.75, groundY),
    k.anchor("center"),
    k.layer("game"),
    k.scale(2),
  ]);

  return { p1, p2 };
}

export function createBackground(k) {
  const bg = k.add([
    k.sprite("bg"),
    k.pos(0, 0),
    k.anchor("topleft"),
    k.fixed(),
    k.layer("background"),
  ]);

  bg.scale = Math.max(
    k.width() / bg.width,
    k.height() / bg.height
  );

  return bg;
}

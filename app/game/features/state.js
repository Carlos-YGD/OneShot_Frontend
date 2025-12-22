export function createGameState() {
  return {
    state: "waiting",
    alertTime: 0,
    shootTimeout: null,
    p1Lives: 3,
    p2Lives: 3,
    bestP1Time: null,
    bestP2Time: null,
  };
}

export function loadAssets(k) {
    k.loadSprite("bg", "/sprites/bg.png");
    k.loadSprite("chonkulus_0", "/sprites/chonkulus.png", {
        sliceX: 3,
        sliceY: 3,
        anims: {
        idle: { from: 0, to: 0 },
        gun_idle: { from: 1, to: 1 },
        ready_gun: { frames: [0, 3, 1] },
        shoot: { frames: [1, 2, 3], loop: false },
        shot: { from: 4, to: 6 },
        early: { from: 7, to: 7 },
        },
    });
    k.loadSprite("chonkulus_1", "/sprites/chonkulus1.png", {
        sliceX: 3,
        sliceY: 3,
        anims: {
        idle: { from: 0, to: 0 },
        gun_idle: { from: 1, to: 1 },
        ready_gun: { frames: [0, 3, 1] },
        shoot: { frames: [1, 2, 3], loop: false },
        shot: { from: 4, to: 6 },
        early: { from: 7, to: 7 },
        },
    });
    k.loadSprite("chonkulus_2", "/sprites/chonkulus2.png", {
        sliceX: 3,
        sliceY: 3,
        anims: {
        idle: { from: 0, to: 0 },
        gun_idle: { from: 1, to: 1 },
        ready_gun: { frames: [0, 3, 1] },
        shoot: { frames: [1, 2, 3], loop: false },
        shot: { from: 4, to: 6 },
        early: { from: 7, to: 7 },
        },
    });
    k.loadSprite("monkulus_0", "/sprites/monkulus.png", {
        sliceX: 3,
        sliceY: 3,
        anims: {
        idle: { from: 0, to: 0 },
        gun_idle: { from: 1, to: 1 },
        ready_gun: { frames: [0, 3, 1] },
        shoot: { frames: [1, 2], loop: false },
        shot: { from: 4, to: 6 },
        early: { from: 7, to: 7 },
        },
    });
        k.loadSprite("monkulus_1", "/sprites/monkulus1.png", {
        sliceX: 3,
        sliceY: 3,
        anims: {
        idle: { from: 0, to: 0 },
        gun_idle: { from: 1, to: 1 },
        ready_gun: { frames: [0, 3, 1] },
        shoot: { frames: [1, 2], loop: false },
        shot: { from: 4, to: 6 },
        early: { from: 7, to: 7 },
        },
    });
        k.loadSprite("monkulus_2", "/sprites/monkulus2.png", {
        sliceX: 3,
        sliceY: 3,
        anims: {
        idle: { from: 0, to: 0 },
        gun_idle: { from: 1, to: 1 },
        ready_gun: { frames: [0, 3, 1] },
        shoot: { frames: [1, 2], loop: false },
        shot: { from: 4, to: 6 },
        early: { from: 7, to: 7 },
        },
    });
        k.loadSprite("robot_0", "/sprites/robot.png", {
        sliceX: 3,
        sliceY: 3,
        anims: {
        idle: { from: 0, to: 0 },
        gun_idle: { from: 1, to: 1 },
        ready_gun: { frames: [0, 3, 1] },
        shoot: { frames: [1, 2, 1, 3, 0], loop: false },
        shot: { from: 4, to: 6 },
        early: { from: 7, to: 7 },
        },
    });
        k.loadSprite("robot_1", "/sprites/robot1.png", {
        sliceX: 3,
        sliceY: 3,
        anims: {
        idle: { from: 0, to: 0 },
        gun_idle: { from: 1, to: 1 },
        ready_gun: { frames: [0, 3, 1] },
        shoot: { frames: [1, 2, 1, 3, 0], loop: false },
        shot: { from: 4, to: 6 },
        early: { from: 7, to: 7 },
        },
    });
        k.loadSprite("robot_2", "/sprites/robot2.png", {
        sliceX: 3,
        sliceY: 3,
        anims: {
        idle: { from: 0, to: 0 },
        gun_idle: { from: 1, to: 1 },
        ready_gun: { frames: [0, 3, 1] },
        shoot: { frames: [1, 2, 1, 3, 0], loop: false },
        shot: { from: 4, to: 6 },
        early: { from: 7, to: 7 },
        },
    });
    k.loadSound("shoot", "/sounds/gunshot.mp3");
    k.loadSound("cs_theme", "/sounds/character_select.mp3");
    k.loadSound("GO!", "/sounds/GO!.mp3");
    k.loadSound("results_theme", "/sounds/results.wav");
    k.loadSound("click", "/sounds/click.wav");
    k.loadSound("select", "/sounds/select.flac");
    k.loadSound("early", "/sounds/early.wav");
    k.loadFont("font", "/fonts/pix_sans.ttf")
    
}

export const characterList = [
  { name: "Chonkulus", sprites: ["chonkulus_0", "chonkulus_1", "chonkulus_2"] },
  { name: "Monkulus", sprites: ["monkulus_0", "monkulus_1", "monkulus_2"] },
  { name: "Robot", sprites: ["robot_0", "robot_1", "robot_2"] },
];

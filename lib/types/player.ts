export enum PlayerClass {
  SPHERE = "sphere",
  CUBE = "cube",
  PYRAMID = "pyramid",
}

export type Player = {
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };

  class: PlayerClass;
  health: number;
  attack: number;
  speed: number;

  rotationSpeed: number;
};

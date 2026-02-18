import { PlayerController } from "./player-controller";
import { CameraController } from "./camera-controller";

export const GameManager = {
  player: new PlayerController(),
  camera: new CameraController(),
};

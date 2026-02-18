import * as THREE from "three";

// Store
import { useGameStore } from "../stores/game-store";

import { type PerspectiveCamera } from "three";

export class CameraController {
  private cameraRef: PerspectiveCamera | null = null;

  init(cameraOptions: { cameraRef: PerspectiveCamera }) {
    this.cameraRef = cameraOptions.cameraRef;

    const cameraState = useGameStore.getState().camera;

    this.cameraRef.position.set(
      cameraState.position.x,
      cameraState.position.y,
      cameraState.position.z,
    );
    this.cameraRef.fov = cameraState.fov;
    this.cameraRef.rotation.set(
      cameraState.rotation.x,
      cameraState.rotation.y,
      cameraState.rotation.z,
    );
  }

  update() {
    // if (!this.cameraRef) return;
    // const playerPosition = useGameStore.getState().player.position;
  }
}

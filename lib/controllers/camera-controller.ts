import * as THREE from "three";

// Store
import { useGameStore } from "../stores/game-store";

// Settings
import { CAMERA_POSITION } from "@/lib/settings/camera";

// Types
import { type PerspectiveCamera } from "three";

export class CameraController {
  private cameraRef: PerspectiveCamera | null = null;

  private cameraOffset: THREE.Vector3 = CAMERA_POSITION as THREE.Vector3;

  mapBounds = {
    minX: -50,
    maxX: 50,
    minZ: -50,
    maxZ: 50,
  };

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
    if (!this.cameraRef) return;
    const playerPosition = useGameStore.getState().player.position;

    this.cameraRef.position.set(
      playerPosition.x + this.cameraOffset.x,
      playerPosition.y + this.cameraOffset.y,
      playerPosition.z + this.cameraOffset.z,
    );
  }
}

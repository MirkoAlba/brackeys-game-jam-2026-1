// Controllers
import { PlayerController } from "./player-controller";

// Types
import { type PerspectiveCamera } from "three";
import { type Camera } from "@/lib/types/camera";
import { CAMERA_POSITION } from "../settings/camera";

export class CameraController {
  static _instance: CameraController;

  private cameraRef!: PerspectiveCamera;

  private position!: { x: number; y: number; z: number };
  private rotation!: { x: number; y: number; z: number };
  private fov!: number;

  private cameraOffset: { x: number; y: number; z: number } = CAMERA_POSITION;

  static getInstance(): CameraController {
    if (!CameraController._instance) {
      CameraController._instance = new CameraController();
    }
    return CameraController._instance;
  }

  init(camera: Camera): void {
    this.position = camera.position;
    this.rotation = camera.rotation;
    this.fov = camera.fov;
  }

  setRefs({ cameraRef }: { cameraRef: PerspectiveCamera }): void {
    this.cameraRef = cameraRef;

    if (!this.position || !this.fov || !this.rotation) return;

    this.cameraRef.position.set(
      this.position.x,
      this.position.y,
      this.position.z,
    );
    this.cameraRef.fov = this.fov;
    this.cameraRef.rotation.set(
      this.rotation.x,
      this.rotation.y,
      this.rotation.z,
    );
  }

  followPlayer(): void {
    if (!this.cameraRef) return;

    const playerPosition = PlayerController.getInstance().position;

    this.cameraRef.position.set(
      playerPosition.x + this.cameraOffset.x,
      playerPosition.y + this.cameraOffset.y,
      playerPosition.z + this.cameraOffset.z,
    );
  }

  update({ delta }: { delta: number }): void {
    this.followPlayer();
  }
}

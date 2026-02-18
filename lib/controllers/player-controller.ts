import * as THREE from "three";

// Stores
import { useGameStore } from "@/lib/stores/game-store";

// Types
import type { PlayerClass } from "@/lib/types/player";
import { type RapierRigidBody } from "@react-three/rapier";
import { type Controls } from "@/lib/types/controls";

export class PlayerController {
  private rigidBodyRef: RapierRigidBody | null = null;
  private position: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };
  private velocity: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };

  private class: PlayerClass | null = null;
  private health: number = 100;
  private attack: number = 15;
  private speed: number = 1;
  private rotationSpeed: number = 15;

  init(playerOptions: { rigidBodyRef: RapierRigidBody }) {
    this.rigidBodyRef = playerOptions.rigidBodyRef;

    const playerState = useGameStore.getState().player;

    this.position = playerState.position;
    this.velocity = playerState.velocity;

    this.class = playerState.class as PlayerClass;
    this.health = playerState.health;
    this.attack = playerState.attack;
    this.speed = playerState.speed;
    this.rotationSpeed = playerState.rotationSpeed;
  }

  movePlayer(controls: Controls) {
    const { forward, backward, leftward, rightward } = controls;

    this.velocity.x = 0;
    this.velocity.z = 0;

    if (forward) this.velocity.z = this.speed;
    if (backward) this.velocity.z = -this.speed;
    if (leftward) this.velocity.x = this.speed;
    if (rightward) this.velocity.x = -this.speed;

    if (this.rigidBodyRef) {
      this.rigidBodyRef.setLinvel(
        { x: this.velocity.x, y: this.velocity.y, z: this.velocity.z },
        true,
      );

      const position = this.rigidBodyRef.translation();
      this.position.x = position.x;
      this.position.y = position.y;
      this.position.z = position.z;
    }
  }

  update({
    controls,
    cameraObjects: {
      camera,
      cameraPosition,
      cameraTarget,
      cameraWorldPosition,
      cameraLookAtWorldPosition,
      cameraLookAt,
    },
  }: {
    controls: Controls;
    cameraObjects: {
      camera: THREE.Camera;
      cameraPosition: THREE.Group;
      cameraTarget: THREE.Group;
      cameraWorldPosition: THREE.Vector3;
      cameraLookAtWorldPosition: THREE.Vector3;
      cameraLookAt: THREE.Vector3;
    };
  }): void {
    this.movePlayer(controls);

    cameraPosition.getWorldPosition(cameraWorldPosition);
    camera.position.lerp(cameraWorldPosition, 0.1);

    cameraTarget.getWorldPosition(cameraLookAtWorldPosition);
    cameraLookAt.lerp(cameraLookAtWorldPosition, 0.1);

    camera.lookAt(cameraLookAt);
  }
}

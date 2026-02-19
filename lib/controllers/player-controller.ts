import * as THREE from "three";

// Stores
// import { useGameStore } from "@/lib/stores/game-store";

// Types
import type { Player, PlayerClass } from "@/lib/types/player";
import { type RapierRigidBody } from "@react-three/rapier";
import { type Controls } from "@/lib/types/controls";

export class PlayerController {
  static _instance: PlayerController;

  private rigidBodyRef!: RapierRigidBody;
  position!: { x: number; y: number; z: number };
  private velocity!: { x: number; y: number; z: number };

  private class!: PlayerClass;
  private health!: number;
  private attack!: number;
  private speed!: number;
  private rotationSpeed: number = 15;

  static getInstance(): PlayerController {
    if (!PlayerController._instance) {
      PlayerController._instance = new PlayerController();
    }
    return PlayerController._instance;
  }

  init(player: Player): void {
    this.position = player.position;
    this.velocity = player.velocity;
    this.class = player.class as PlayerClass;
    this.health = player.health;
    this.attack = player.attack;
    this.speed = player.speed;
    this.rotationSpeed = player.rotationSpeed;
  }

  setRefs({ rigidBodyRef }: { rigidBodyRef: RapierRigidBody }): void {
    this.rigidBodyRef = rigidBodyRef;
  }

  movePlayer(controls: Controls): void {
    const { forward, backward, leftward, rightward } = controls;

    this.velocity.x = 0;
    this.velocity.z = 0;

    if (forward) this.velocity.z = -this.speed;
    if (backward) this.velocity.z = this.speed;
    if (leftward) this.velocity.x = -this.speed;
    if (rightward) this.velocity.x = this.speed;

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

  update({ delta, controls }: { delta: number; controls: Controls }): void {
    this.movePlayer(controls);
  }
}

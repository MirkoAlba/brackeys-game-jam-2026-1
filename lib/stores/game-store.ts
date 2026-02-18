// Zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Settings
import { PLAYER_CLASS_CONFIG } from "@/lib/settings/player";
import { CAMERA_POSITION } from "@/lib/settings/camera";

// Types
import { Player, PlayerClass } from "@/lib/types/player";
import type { Camera } from "@/lib/types/camera";

type GameState = {
  player: Player;
  camera: Camera;

  initPlayerState(player: PlayerClass): void;
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Default values
      player: {
        position: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
        class: PlayerClass.SPHERE,
        health: PLAYER_CLASS_CONFIG[PlayerClass.SPHERE].baseHealth,
        attack: PLAYER_CLASS_CONFIG[PlayerClass.SPHERE].baseAttack,
        speed: PLAYER_CLASS_CONFIG[PlayerClass.SPHERE].baseSpeed,
        rotationSpeed: 15,
      },
      camera: {
        position: CAMERA_POSITION,
        rotation: { x: -Math.PI / 3, y: 0, z: 0 },
        fov: 7,
      },

      initPlayerState(playerClass: PlayerClass) {
        set({
          player: {
            position: { x: 0, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 },
            class: playerClass,
            health: PLAYER_CLASS_CONFIG[playerClass].baseHealth,
            attack: PLAYER_CLASS_CONFIG[playerClass].baseAttack,
            speed: PLAYER_CLASS_CONFIG[playerClass].baseSpeed,
            rotationSpeed: 15,
          },
        });
      },
    }),
    {
      name: "game-data",
    },
  ),
);

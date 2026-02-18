import { PlayerClass } from "@/lib/types/player";

export interface ClassStats {
  baseHealth: number;
  baseAttack: number;
  baseSpeed: number;
}

export const PLAYER_CLASS_CONFIG: Record<PlayerClass, ClassStats> = {
  [PlayerClass.SPHERE]: { baseHealth: 100, baseAttack: 20, baseSpeed: 2.5 },
  [PlayerClass.CUBE]: { baseHealth: 150, baseAttack: 30, baseSpeed: 2.0 },
  [PlayerClass.PYRAMID]: { baseHealth: 80, baseAttack: 40, baseSpeed: 2.2 },
};

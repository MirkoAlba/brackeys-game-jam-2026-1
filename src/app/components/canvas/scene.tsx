// Hooks
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

// Components
import { Physics, RigidBody } from "@react-three/rapier";
import { Player } from "@/src/app/components/player/index";
import { Camera } from "@/src/app/components/camera/index";
import { Map } from "@/src/app/components/map/index";

// Settings
import { PLAYER_CLASS_CONFIG } from "@/lib/settings/player";
import { CAMERA_POSITION } from "@/lib/settings/camera";
import { MAP_SIZE, WALL_HEIGHT, WALL_THICKNESS } from "@/lib/settings/map";

// Controller
import { GameManager } from "@/lib/controllers/game-manager";

// Types
import { PlayerClass } from "@/lib/types/player";
import { type Controls } from "@/lib/types/controls";

export function Scene() {
  const gameManager = GameManager.getInstance();

  const [, getKeys] = useKeyboardControls();

  useEffect(() => {
    gameManager.init({
      player: {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        velocity: {
          x: 0,
          y: 0,
          z: 0,
        },
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
      map: {
        size: MAP_SIZE,
        wallHeight: WALL_HEIGHT,
        wallThickness: WALL_THICKNESS,
      },
    });
  }, []);

  useFrame((state, delta) => {
    const controls = getKeys() as Controls;

    gameManager.update(delta, controls);
  });

  return (
    <>
      {/* Camera */}
      <Camera />

      <Physics debug={true} timeStep="vary">
        <group>
          {/* Terrain */}
          <Map />

          {/* Player */}
          <Player />

          {/* Towers/Obstacles */}
          {[
            [-2, 0.5, -2],
            [2, 0.5, -2],
            [-2, 0.5, 2],
            [2, 0.5, 2],
          ].map((pos, index) => (
            <RigidBody
              key={index}
              type="fixed"
              position={pos as [number, number, number]}
              colliders="cuboid"
            >
              <mesh castShadow receiveShadow>
                <boxGeometry args={[0.5, 1, 0.5]} />
                <meshStandardMaterial color="gray" />
              </mesh>
            </RigidBody>
          ))}
        </group>
      </Physics>
    </>
  );
}

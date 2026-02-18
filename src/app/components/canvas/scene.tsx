"use client";

// Store
import { useGameStore } from "@/lib/stores/game-store";

// Components
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { Player } from "@/src/app/components/player/index";
import { Camera } from "@/src/app/components/camera/index";

// Settings
import { keyboardMap } from "@/lib/settings/keyboard";

import { PlayerClass } from "@/lib/types/player";

export default function Scene() {
  // TODO: make a different screen/overlay for the selection menu and call the initPlayerState
  const initPlayerState = useGameStore((state) => state.initPlayerState);

  initPlayerState(PlayerClass.SPHERE);

  return (
    <div className="canvas-container h-full w-full">
      <KeyboardControls map={keyboardMap}>
        <Canvas dpr={[1, 2]} shadows>
          {/* Lights */}
          <ambientLight intensity={0.75} />

          <directionalLight
            castShadow
            position={[-3, 10, -5]}
            intensity={2.5}
            shadow-mapSize={[1024, 1024]}
            // shadow-camera-near={1}
            // shadow-camera-far={1000}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            // shadow-bias={-0.01}
          />

          {/* Camera */}
          <Camera />

          <Physics debug={true} timeStep="vary">
            <group>
              {/* Terrain */}
              <RigidBody type="fixed" friction={1}>
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                  <planeGeometry args={[100, 100]} />
                  <meshStandardMaterial color="green" />
                </mesh>
              </RigidBody>

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
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

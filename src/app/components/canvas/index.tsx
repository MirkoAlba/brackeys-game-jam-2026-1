"use client";

// Components
import { Canvas as R3FCanvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Scene } from "@/src/app/components/canvas/scene";

// Settings
import { keyboardMap } from "@/lib/settings/keyboard";

export function Canvas() {
  return (
    <div className="canvas-container h-full w-full">
      <KeyboardControls map={keyboardMap}>
        <R3FCanvas dpr={[1, 2]} shadows>
          {/* Lights */}
          <ambientLight intensity={0.75} />

          <directionalLight
            castShadow
            position={[-3, 10, -5]}
            intensity={2.5}
            shadow-mapSize={[4096, 4096]}
            // shadow-camera-near={1}
            // shadow-camera-far={1000}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            // shadow-bias={-0.0005}
          />

          <Scene />
        </R3FCanvas>
      </KeyboardControls>
    </div>
  );
}

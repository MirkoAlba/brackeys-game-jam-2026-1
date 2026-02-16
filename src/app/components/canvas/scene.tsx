"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { CameraHelper } from "@/app/components/helper/camera-helper";

export default function Scene() {
  return (
    <div className="canvas-container h-full w-full">
      <Canvas
        shadows
        camera={{ position: [0, 5, 2], fov: 100 }}
        onCreated={({ camera }) => {
          camera.rotation.set(-Math.PI / 4, 0, 0); // 45°
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        }}
      >
        {/* Helpers */}
        <OrbitControls />
        {/* <CameraHelper /> */}

        {/* Lights */}
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[0, 5, -5]}
          intensity={3}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={10}
          shadow-camera-top={2}
          shadow-camera-bottom={-2}
          shadow-camera-left={-2}
          shadow-camera-right={2}
          shadow-bias={-0.0005}
        />

        <group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="green" />
          </mesh>

          <mesh position={[0, 0.25, 0]} castShadow>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </group>
      </Canvas>
    </div>
  );
}

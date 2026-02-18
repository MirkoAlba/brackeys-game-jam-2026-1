// Hooks
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Components
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
// import { CameraHelper } from "@/src/app/components/helpers/camera-helper";

// Types
import { type PerspectiveCamera as ThreeCam } from "three";

// Controllers
import { GameManager } from "@/lib/controllers/game-manager";

export function Camera() {
  const cameraRef = useRef<ThreeCam>(null);

  useEffect(() => {
    if (cameraRef.current) {
      GameManager.camera.init({ cameraRef: cameraRef.current });
    }
  }, [cameraRef.current]);

  // Game loop
  useFrame(() => {
    if (!cameraRef.current) return;

    GameManager.camera.update();
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault />

      {/* <OrbitControls /> */}

      {/* <CameraHelper /> */}
    </>
  );
}

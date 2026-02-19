// Hooks
import { useEffect, useRef } from "react";

// Components
import {
  //OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

// Controllers
import { CameraController } from "@/lib/controllers/camera-controller";

// Types
import { type PerspectiveCamera as ThreeCam } from "three";

export function Camera() {
  const cameraRef = useRef<ThreeCam>(null);

  // Set the ref into the controller class
  useEffect(() => {
    if (cameraRef.current) {
      CameraController.getInstance().setRefs({ cameraRef: cameraRef.current });
    }
  }, [cameraRef.current]);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault />

      {/* <OrbitControls/> */}
    </>
  );
}

import { PerspectiveCamera } from "three";

export function CameraHelper() {
  const camera = new PerspectiveCamera(25, 1, 1, 3);
  return (
    <group position={[0, 2, 2]} rotation={[-Math.PI / 4, 0, 0]}>
      <cameraHelper args={[camera]} />
    </group>
  );
}

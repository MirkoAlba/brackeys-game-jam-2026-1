// Hooks
import { useEffect, useRef } from "react";

// Components
import {
  CuboidCollider,
  RigidBody,
  type RapierRigidBody,
} from "@react-three/rapier";

// Settings
import { MAP_SIZE, WALL_HEIGHT, WALL_THICKNESS } from "@/lib/settings/map";

// Controllers
import { MapController } from "@/lib/controllers/map-controller";

export function Map() {
  const body = useRef<RapierRigidBody>(null);

  const half = MAP_SIZE / 2;

  // Set the ref into the controller class
  useEffect(() => {
    if (body.current) {
      MapController.getInstance().setRefs({ planeBodyRef: body.current });
    }
  }, [body.current]);

  return (
    <RigidBody ref={body} type="fixed" friction={1}>
      {/* North */}
      <CuboidCollider
        args={[half, WALL_HEIGHT, WALL_THICKNESS]}
        position={[0, WALL_HEIGHT, -half]}
      />
      {/* South */}
      <CuboidCollider
        args={[half, WALL_HEIGHT, WALL_THICKNESS]}
        position={[0, WALL_HEIGHT, half]}
      />
      {/* East */}
      <CuboidCollider
        args={[WALL_THICKNESS, WALL_HEIGHT, half]}
        position={[half, WALL_HEIGHT, 0]}
      />
      {/* West */}
      <CuboidCollider
        args={[WALL_THICKNESS, WALL_HEIGHT, half]}
        position={[-half, WALL_HEIGHT, 0]}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[MAP_SIZE, MAP_SIZE]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </RigidBody>
  );
}

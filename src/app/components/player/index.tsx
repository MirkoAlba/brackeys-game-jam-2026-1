// Hooks
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

// Components
import { RigidBody, BallCollider, RapierRigidBody } from "@react-three/rapier";

// Controllers
import { GameManager } from "@/lib/controllers/game-manager";

// Types
import { type Controls } from "@/lib/types/controls";

export function Player() {
  const body = useRef<RapierRigidBody>(null);

  const [, getKeys] = useKeyboardControls();

  // Init the controller with the state data
  useEffect(() => {
    if (body.current) {
      GameManager.player.init({
        rigidBodyRef: body.current,
      });
    }
  }, [body.current]);

  // Game loop
  useFrame(() => {
    if (!body.current) return;

    const controls = getKeys() as Controls;

    GameManager.player.update({
      controls,
    });
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      position={[0, 0.25, 0]}
      enabledRotations={[false, false, false]}
      friction={0}
      lockRotations
    >
      <BallCollider args={[0.27]} />

      <mesh castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
}

import * as THREE from "three";

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

  const playerContainer = useRef<THREE.Group>(null);
  const cameraTarget = useRef<THREE.Group>(null);
  const cameraPosition = useRef<THREE.Group>(null);

  const cameraWorldPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const cameraLookAtWorldPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const cameraLookAt = useRef<THREE.Vector3>(new THREE.Vector3());

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
  useFrame(({ camera }) => {
    if (
      !body.current ||
      !cameraPosition.current ||
      !cameraTarget.current ||
      !cameraWorldPosition.current ||
      !cameraLookAtWorldPosition.current ||
      !cameraLookAt.current
    )
      return;

    const controls = getKeys() as Controls;

    GameManager.player.update({
      controls,
      cameraObjects: {
        camera: camera,
        cameraPosition: cameraPosition.current,
        cameraTarget: cameraTarget.current,
        cameraWorldPosition: cameraWorldPosition.current,
        cameraLookAtWorldPosition: cameraLookAtWorldPosition.current,
        cameraLookAt: cameraLookAt.current,
      },
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

      <group ref={playerContainer}>
        <group ref={cameraTarget} position-z={-1} />
        <group ref={cameraPosition} position-y={4} position-z={-4} />

        <mesh castShadow>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
    </RigidBody>
  );
}

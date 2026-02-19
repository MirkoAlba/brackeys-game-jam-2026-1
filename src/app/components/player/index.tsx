// Hooks
import { useEffect, useRef } from "react";

// Components
import { RigidBody, BallCollider, RapierRigidBody } from "@react-three/rapier";

// Controllers
import { PlayerController } from "@/lib/controllers/player-controller";

export function Player() {
  const body = useRef<RapierRigidBody>(null);

  // Set the ref into the controller class
  useEffect(() => {
    if (body.current) {
      PlayerController.getInstance().setRefs({ rigidBodyRef: body.current });
    }
  }, [body.current]);

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

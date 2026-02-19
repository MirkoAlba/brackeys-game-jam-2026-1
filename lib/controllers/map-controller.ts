// Types
import { type RapierRigidBody } from "@react-three/rapier";
import { type Map } from "@/lib/types/map";

export class MapController {
  static _instance: MapController;

  private planeBodyRef!: RapierRigidBody;

  private size!: number;
  private wallHeight!: number;
  private wallThickness!: number;

  static getInstance(): MapController {
    if (!MapController._instance) {
      MapController._instance = new MapController();
    }
    return MapController._instance;
  }

  init(map: Map) {
    this.size = map.size;
    this.wallHeight = map.wallHeight;
    this.wallThickness = map.wallThickness;
  }

  setRefs({ planeBodyRef }: { planeBodyRef: RapierRigidBody }) {
    this.planeBodyRef = planeBodyRef;
  }
}

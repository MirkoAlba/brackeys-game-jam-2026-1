// Controllers
import { PlayerController } from "./player-controller";
import { CameraController } from "./camera-controller";
import { MapController } from "./map-controller";

// Types
import { type Player } from "@/lib/types/player";
import { type Camera } from "@/lib/types/camera";
import { type Map } from "@/lib/types/map";
import { type Controls } from "@/lib/types/controls";

export class GameManager {
  private static _instance: GameManager;

  private player!: PlayerController;
  private camera!: CameraController;
  private map!: MapController;

  static getInstance(): GameManager {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager();
    }
    return GameManager._instance;
  }

  init(data: { player: Player; camera: Camera; map: Map }) {
    this.player = PlayerController.getInstance();
    this.camera = CameraController.getInstance();
    this.map = MapController.getInstance();

    this.map.init(data.map);
    this.player.init(data.player);
    this.camera.init(data.camera);
  }

  update(delta: number, controls: Controls) {
    this.player?.update({ delta, controls });
    this.camera?.update({ delta });
  }
}

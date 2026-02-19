// Components
import { Canvas } from "@/src/app/components/canvas/index";
import { MainMenu } from "@/src/app/components/ui/main-menu";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-dvh">
      <MainMenu />

      <Canvas />
    </main>
  );
}

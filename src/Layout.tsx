import { Outlet } from "react-router-dom";
import GameLayout from "./components/GameLayout";

export function Layout() {
  return (
    <GameLayout>
      <Outlet />
    </GameLayout>
  );
}

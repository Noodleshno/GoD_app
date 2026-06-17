import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { Onboarding } from "./screens/Onboarding";
import { Registration } from "./screens/Registration";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home";
import { DronePage } from "./screens/DronePage";
import { Leaderboard } from "./screens/Leaderboard";
import { Catalog } from "./screens/Catalog";
import { Booking } from "./screens/Booking";
import { Profile } from "./screens/Profile";
import { SettingsPage } from "./screens/SettingsPage";
import { Friends } from "./screens/Friends";
import { Clans } from "./screens/Clans";

function StartRoute() {
  const hasSeenOnboarding = localStorage.getItem("god_onboarding_seen") === "true";
  return hasSeenOnboarding ? <Navigate to="/login" replace /> : <Onboarding />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: StartRoute },
      { path: "onboarding", Component: Onboarding },
      { path: "register", Component: Registration },
      { path: "login", Component: Login },
      { path: "home", Component: Home },
      { path: "drone", Component: DronePage },
      { path: "leaderboard", Component: Leaderboard },
      { path: "catalog", Component: Catalog },
      { path: "booking", Component: Booking },
      { path: "profile", Component: Profile },
      { path: "settings", Component: SettingsPage },
      { path: "friends", Component: Friends },
      { path: "clans", Component: Clans },
    ],
  },
]);

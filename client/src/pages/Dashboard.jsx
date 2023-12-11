import React from "react";
import { useAppState } from "../providers/AppStateProvider";

export default function Dashboard() {
  // Consts
  const [appState] = useAppState();
  // Logic
  console.log(appState);
  // Html
  return (
    <div id="home_container">
      <h1>Dashboard</h1>
      <h2>Hello, {appState.firstName}!</h2>
    </div>
  );
}

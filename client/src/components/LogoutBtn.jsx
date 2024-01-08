import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../providers/AppStateProvider";

export default function LogOutBtn() {
  // Const
  const navigate = useNavigate();
  const [, dispatch] = useAppState();

  // Logic
  async function handleLogOut() {
    // POST to /logout
    await fetch("http://localhost:3001/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Remove auth token from local storage
    localStorage.removeItem("authToken");

    // dispatch SET_LOGGED_OUT
    dispatch({
      type: "SET_LOGGED_OUT",
    });

    // navigate user to login page
    navigate("/login");
  }

  // HTML
  return <button onClick={handleLogOut}>Log Out</button>;
}

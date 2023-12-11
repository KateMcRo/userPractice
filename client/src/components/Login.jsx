import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../providers/AppStateProvider";
import { emailRegex, passRegex } from "../utils/regex";

export default function Login() {
  // Const
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // Logic
  const validEmail = (email) => {
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
  };

  const validPass = (password) => {
    if (!passRegex.test(password)) {
      return `Passwords must contain at least 6 characters and 1 of each: uppercase, lowercase, number.`;
    }
  };

  async function handleLogin(e) {
    e.preventDefault();
    console.log("click");
  }

  // Html
  return (
    <div id="login_container">
      <h1>Login</h1>
      <form>
        <label id="email_label">Email</label>
        <input
          id="email_input"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(validEmail(e.target.value));
          }}
        />

        <label id="pass_label">Password</label>
        <input
          id="pass_input"
          type="password"
          autoComplete="off"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(validPass(e.target.value));
          }}
        />

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button id="submit" onClick={(e) => handleLogin(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}

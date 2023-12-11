import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../providers/AppStateProvider";
import { emailRegex, passRegex } from "../utils/regex";

export default function Login() {
  // Const
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, dispatch] = useAppState();

  const [error, setError] = useState("");

  const navigate = useNavigate();
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

    const formObj = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObj),
      });
      const { data, token } = await response.json();
      console.log({ data, token });
      // check for token
      if (token) {
        // set token in local storage
        localStorage.setItem("authToken", JSON.stringify(token));
        // dispatch SET_USER
        dispatch({
          type: "SET_USER",
          payload: {
            id: data.id,
            firstName: data.firstName,
            email: data.email,
            loggedIn: true,
          },
        });
        // redirect to dashboard
        navigate("/dashboard");
      }
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.error}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
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

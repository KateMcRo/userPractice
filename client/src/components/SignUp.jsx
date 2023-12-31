import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../providers/AppStateProvider";

import { nameRegex, emailRegex, passRegex } from "../utils/regex";

export default function SignUp() {
  // Consts
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState("");

  const [, dispatch] = useAppState();

  const navigate = useNavigate();

  // Logic
  const validateName = (firstName) => {
    if (firstName.trim() === "") {
      return "Name cannot be blank";
    } else if (!nameRegex.test(firstName)) {
      return "Name must use letters only";
    }
  };

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
  };

  const validatePass = (password, confirmPass) => {
    if (!passRegex.test(password)) {
      return `Passwords must contain at least 6 characters and 1 of each: uppercase, lowercase, number.`;
    }

    if (confirmPass !== "" && confirmPass !== password) {
      return "Passwords must match";
    }
  };

  async function handleSignUp(e) {
    e.preventDefault();

    const postObj = {
      firstName: firstName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3001/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postObj),
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.error}`);
      }
      const { data, token } = await response.json();
      console.log({ data, token });
      if (token) {
        localStorage.setItem("authToken", JSON.stringify(token));
        dispatch({
          type: "SET_USER",
          payload: {
            id: data.id,
            firstName: data.firstName,
            email: data.email,
            loggedIn: true,
          },
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    navigate("/login");
  }

  // Html
  return (
    <div id="create_form">
      <h1>Sign Up</h1>
      <form>
        <label id="name_label">First Name</label>
        <input
          id="name_input"
          type="text"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setError(validateName(e.target.value));
          }}
        />

        <label id="email_label">Email</label>
        <input
          id="email_input"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(validateEmail(e.target.value));
          }}
        />

        <label id="pass_label">Password</label>
        <input
          id="pass_input"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(validatePass(e.target.value, confirmPass));
          }}
        />

        <label id="confirm_pass_label">Confirm Password</label>
        <input
          id="confirm_pass_input"
          type="password"
          autoComplete="off"
          value={confirmPass}
          onChange={(e) => {
            setConfirmPass(e.target.value);
            setError(validatePass(password, e.target.value));
          }}
        ></input>

        {error && <div style={{ color: "red" }}>{error}</div>}
        <button id="submit" onClick={(e) => handleSignUp(e)}>
          Submit
        </button>
        <button id="login" onClick={(e) => handleLogin(e)}>
          Login Instead
        </button>
      </form>
    </div>
  );
}

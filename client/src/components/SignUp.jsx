import React, { useState } from "react";

export default function SignUp() {
  // Consts

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState("");

  // created at regexr.com
  const nameRegex = /\b([A-ZÀ-ÿa-z][a-z]*)+/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

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
    console.log(password, confirmPass);
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
    } catch (error) {
      console.error("Fetch error:", error);
    }
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
      </form>
    </div>
  );
}

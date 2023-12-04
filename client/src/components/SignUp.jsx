import React, { useState } from "react";

export default function SignUp() {
  // Consts

  // Change to state for each input
  // Create state for error handling in real time
  const [createUser, setCreateUser] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  // Logic

  // Html
  return (
    <div id="create_form">
      <h1>Sign Up</h1>
      <form>
        <label id="name_label">First Name</label>
        <input id="name_input" type="text" autoComplete="given-name" />

        <label id="email_label">Email</label>
        <input id="email_input" type="email" autoComplete="email" />

        <label id="pass_label">Password</label>
        <input id="pass_input" type="password" autoComplete="new-password" />

        <label id="confirm_pass_label">Confirm Password</label>
        <input
          id="confirm_pass_input"
          type="password"
          autoComplete="off"
        ></input>
        <button id="submit">Submit</button>
      </form>
    </div>
  );
}

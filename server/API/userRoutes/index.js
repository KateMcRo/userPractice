const router = require("express").Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

// Create a New User
router.post("/create", async (req, res) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
  });

  const data = {
    id: newUser._id,
    firstName: newUser.firstName,
    email: newUser.email,
  };

  const token = await jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  console.log({ data, token });
  res.json({ data, token });
});

// Check for Valid Token
router.post("/validate", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const valid = await jwt.verify(token, process.env.JWT_SECRET);
    if (!valid) {
      res.json({ message: "Invalid Token" }).status(500);
    }
    res.json({ message: "Success", valid }).status(200);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Log a User In
try {
  router.post("/login", async (req, res) => {
    //find user by email
    const user = await User.findOne({ email: req.body.email });
    //if none exist, error
    if (!user) {
      return res.json({ message: "You lost bro?" });
    }

    //if exists, validate password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    //if pass wrong, error
    if (!validPass) {
      return res.json({ message: "Nice try, buddy." });
    }
    // if valid, create data objext
    const data = {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    };
    // sign token
    const token = jwt.sign({ data }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    // send resonse
    res.json({ data, token });
  });
} catch (error) {
  console.error(error);
  res.json({ error: error.message });
}

// Log Out
router.post("/logout", async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: `💩🗑️` });
});

module.exports = router;

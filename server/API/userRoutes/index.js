const router = require("express").Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.get("/", (req, res) => {
  res.send("Hello User");
});

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

module.exports = router;

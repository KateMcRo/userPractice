const router = require("express").Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.get("/", (req, res) => {
  res.send("Hello User");
});

// Create a new User
router.post("/create", async (req, res) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
  });

  const data = {
    firstName: newUser.firstName,
    email: newUser.email,
  };

  const token = await jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  console.log({ data, token });
  res.json({ data, token });
});

module.exports = router;

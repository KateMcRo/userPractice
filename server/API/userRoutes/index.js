const router = require("express").Router();
const User = require("../../models/User");

router.get("/", (req, res) => {
  res.send("Hello User");
});

router.post("/create", async (req, res) => {
  const data = await User.create({
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
  });

  const newUser = {
    firstName: data.firstName,
    email: data.email,
  };

  res.json({ newUser });
});

module.exports = router;

const router = require("express").Router();
const userRoutes = require("./userRoutes");

router.use("/user", userRoutes);

router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;

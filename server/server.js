const express = require("express");
const API = require("./API");
const database = require("./config/connection");
const cors = require("cors");

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/", API);

database.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🚀 Listening on port ${PORT}`);
  });
});

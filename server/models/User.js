const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
  } catch (error) {
    console.error(error);
  } finally {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

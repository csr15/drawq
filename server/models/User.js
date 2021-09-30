const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: String,
  mail: { type: String, unique: true },
  password: String,
  avatar: { type: String, default: "" },
  highScore: {
    cracker: {
      score: { type: Number, default: 0 },
      mode: { type: String, default: "hard" },
    },
    replacer: {
      level: { type: Number, default: 0 },
      mode: { type: String, default: "hard" },
    },
  },
});

module.exports =
  mongoose.models.UserSchema || mongoose.model("User", UserSchema);

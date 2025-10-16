const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, default: null, index: true },
    password: { type: String, default: null },
    auth_token: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = UserSchema;

const mongoose = require("mongoose");
const gender = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name."],
    },

    email: {
      type: String,
      required: [true, "Please provide email."],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
    },

    contact: String,

    age: Number,

    gender: {
      type: String,
      enum: Object.values(gender),
      default: "male",
    },

    wallets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

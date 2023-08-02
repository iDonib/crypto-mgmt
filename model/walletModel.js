const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      default: "0",
    },
  },
  {
    timestamps: true, // Enable timestamps
  }
);

module.exports = mongoose.model("Wallet", walletSchema);

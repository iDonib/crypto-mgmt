const mongoose = require("mongoose");

const historicalSchema = new mongoose.Schema({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  numberOfWallets: {
    type: Number,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const historicalModel = mongoose.model("Historical", historicalSchema);

module.exports = historicalModel;

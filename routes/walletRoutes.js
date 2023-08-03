const express = require("express");
const {
  addWallet,
  getUserWallets,
  updateWalletBalance,
  deleteWallet,
  getWalletById,
} = require("../controller/walletController");
const isWalletOwner = require("../middleware/isWalletOwner");

const walletRoute = express.Router();

walletRoute.post("/add", addWallet);
walletRoute.patch(
  "/update-wallet-balance/:id",
  isWalletOwner,
  updateWalletBalance
);
walletRoute.delete("/delete/:id", isWalletOwner, deleteWallet);
walletRoute.get("/get-user-wallets/:id", getUserWallets);
walletRoute.get("/get-wallet/:id", getWalletById);

module.exports = walletRoute;

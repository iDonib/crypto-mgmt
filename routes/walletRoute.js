const express = require("express");
const {
  addWallet,
  getUserWallets,
  updateWalletBalance,
  deleteWallet,
} = require("../controller/walletController");

const walletRoute = express.Router();

walletRoute.post("/add", addWallet);
walletRoute.patch("/update-wallet-balance/:id", updateWalletBalance);
walletRoute.delete("/delete/:id", deleteWallet);
walletRoute.get("/get-user-wallets", getUserWallets);

module.exports = walletRoute;

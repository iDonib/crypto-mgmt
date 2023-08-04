const express = require("express");
const {
  addWallet,
  getUserWallets,
  updateWallet,
  deleteWallet,
  getWalletById,
} = require("../controller/walletController");
const isWalletOwner = require("../middleware/isWalletOwner");
const {
  validateAddWallet,
  validateUpdateWallet,
} = require("../validator/walletValidator");

const walletRoute = express.Router();

walletRoute.post("/add", validateAddWallet, addWallet);

walletRoute.patch(
  "/update-wallet-balance/:id",
  validateUpdateWallet,
  isWalletOwner,
  updateWallet
);
walletRoute.delete("/delete/:id", isWalletOwner, deleteWallet);
walletRoute.get("/get-user-wallets/:id", getUserWallets);
walletRoute.get("/get-wallet/:id", getWalletById);

module.exports = walletRoute;

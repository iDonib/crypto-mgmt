const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");
const walletModel = require("../model/walletModel");

const isWalletOwner = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(404).json({
      status: "failed",
      error: "Token not found!",
    });
  }

  token = token.split(" ")[1];

  console.log(token);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded.id);

  if (!user) {
    return res.status(401).json({ status: "failed", error: "Unauthorized!" });
  }

  const walletId = req.params.id;

  const wallet = await walletModel.findById(walletId);

  if (!wallet) {
    return res
      .status(404)
      .json({ status: "failed", error: "Wallet not found!" });
  }

  if (!user.wallets.includes(walletId)) {
    return res.status(403).json({
      staus: "failed",
      error: "Unauthorized, You are not the owner of this wallet",
    });
  }

  next();
});

module.exports = isWalletOwner;

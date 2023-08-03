const asyncHandler = require("express-async-handler");
const walletModel = require("../model/walletModel");
const userModel = require("../model/userModel");

// POST /api/v1/wallets/add-wallet
const addWallet = asyncHandler(async (req, res) => {
  const { userId, address, balance } = req.body;

  // Check if wallet already exists
  const wallet = await walletModel.findOne({ address: address });

  if (wallet) {
    res.status(400).json({
      status: "failed",
      error: "Wallet is already added!",
    });
  }

  // Check if user exists and throw error if not
  const user = await userModel.findById(userId);

  if (!user) {
    res.status(400).json({ status: "failed", error: "User not found!" });
  }

  const newWallet = await walletModel.create({
    owner: userId,
    address,
    balance,
  });

  // Push the wallet id to the user's wallets array
  user.wallets.push(newWallet._id);
  await user.save();

  res.status(201).json({
    status: "Wallet added successfully!",
    wallet: newWallet,
  });
});

// POST /api/v1/wallets/get-user-wallets
const getUserWallets = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id).populate({
    path: "wallets",
    model: walletModel,
    select: "address balance",
  });

  if (!user) {
    res.status(400).json({ status: "failed", error: "User not found!" });
  }

  res.status(200).json({
    status: "Wallets fetched successfully!",
    wallets: user.wallets,
  });
});

// GET /api/v1/wallets/get-wallet/:id
const getWalletById = asyncHandler(async (req, res) => {
  const wallet = await walletModel.findById(req.params.id).populate({
    path: "owner",
    model: userModel,
    select: "name email",
  });

  // Check if wallet exists
  if (!wallet) {
    res.status(404).json({
      status: "failed",
      error: "Wallet not found!",
    });
  }

  res.status(200).json({
    status: "Wallet fetched successfully!",
    wallet: wallet,
  });
});

// POST /api/v1/wallets/update-wallet/:id
const updateWalletBalance = asyncHandler(async (req, res) => {
  const { balance } = req.body;

  // Check if wallet exists
  const wallet = await walletModel.findByIdAndUpdate(
    req.params.id,
    {
      balance,
    },
    { new: true }
  );

  res.status(200).json({
    status: "Wallet balance updated successfully!",
    updatedInfo: wallet,
  });

  if (!wallet) {
    res.status(404).json({
      status: "failed",
      error: "Wallet not found",
    });
  }
});

// POST /api/v1/wallets/delete-wallet/:id
const deleteWallet = asyncHandler(async (req, res) => {
  // Check if wallet exists
  const wallet = await walletModel.findByIdAndDelete(req.params.id);

  if (!wallet) {
    res.status(404).json({
      status: "failed",
      error: "Wallet not found",
    });
  }

  res.status(200).json({
    status: "Wallet deleted successfully!",
  });
});
module.exports = {
  addWallet,
  getUserWallets,
  updateWalletBalance,
  deleteWallet,
  getWalletById,
};

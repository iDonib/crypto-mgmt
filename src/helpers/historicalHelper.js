// Helper function to save the historical data recieved from cron
const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");
const historicalModel = require("../model/historicalModel");

const saveHistoricalData = asyncHandler(async (wallet) => {
  const user = await userModel.findById(wallet.owner);

  const historicalData = {
    walletId: wallet._id,
    owner: wallet.owner,
    balance: wallet.balance,
    numberOfWallets: user.wallets.length,
    updatedAt: wallet.updatedAt,
  };
  await historicalModel.create(historicalData);
});

module.exports = saveHistoricalData;

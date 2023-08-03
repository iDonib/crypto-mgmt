// Helper function to save the historical data recieved from cron
const asyncHandler = require("express-async-handler");
const historicalModel = require("../model/historicalModel");

const saveHistoricalData = asyncHandler(async (wallet) => {
  const historicalData = {
    walletId: wallet._id,
    owner: wallet.owner,
    balance: wallet.balance,
    updatedAt: wallet.updatedAt,
  };
  await historicalModel.create(historicalData);
});

module.exports = saveHistoricalData;

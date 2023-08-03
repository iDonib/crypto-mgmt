const historicalModel = require("../model/historicalModel");
const userModel = require("../model/userModel");
const asyncHandler = require("express-async-handler");

// Function to get balance change for a specific time period
const getBalanceChangeForTimePeriod = async (startDate, endDate, ownerId) => {
  // Check if user exists
  const user = await userModel.findById(ownerId);

  if (!user) {
    res.status(400).json({ status: "failed", error: "User not found!" });
  }

  const historicalData = await historicalModel
    .find({
      owner: ownerId,
      updatedAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
    .sort({ updatedAt: -1 });

  if (historicalData.length < 1) {
    return {
      ownerName: user.name,
      balanceChange: 0,
      balanceChangePercentage: 0,
    };
  }

  const initialBalance = historicalData[0].balance;
  const finalBalance = historicalData[historicalData.length - 1].balance;

  const balanceChange = finalBalance - initialBalance;
  const balanceChangePercentage = (
    (balanceChange / initialBalance) *
    100
  ).toFixed(2);

  return {
    ownerName: user.name,
    balanceChange,
    balanceChangePercentage,
  };
};

// Get total balance change by day
const getBalanceChangesByDay = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const currentDate = date ? new Date(date) : new Date(); // Use current date if date is not provided
  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 1);

  const balanceChanges = await getBalanceChangeForTimePeriod(
    startDate,
    endDate,
    req.params.userId
  );

  res.status(200).json({
    message: `Total balance change by day on ${currentDate}`,
    ...balanceChanges,
  });
});

module.exports = { getBalanceChangesByDay };

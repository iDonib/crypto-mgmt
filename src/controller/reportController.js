const historicalModel = require("../model/historicalModel");
const userModel = require("../model/userModel");
const asyncHandler = require("express-async-handler");

// Function to get balance change for a specific time period
const getBalanceChangeForTimePeriod = asyncHandler(
  async (startDate, endDate, ownerId) => {
    // Check if user exists
    const user = await userModel.findById(ownerId);

    if (!user) {
      throw new Error("User not found!");
    }

    const historicalData = await historicalModel
      .find({
        owner: ownerId,
        updatedAt: {
          $gte: startDate,
          $lt: endDate,
        },
      })
      .lean();

    if (historicalData.length <= user.wallets.length) {
      return {
        ownerName: user.name,
        balanceChange: 0,
        balanceChangePercentage: 0,
      };
    }

    // console.log(historicalData);

    let initialBalance = 0;
    let finalBalance = 0;

    for (let i = 0; i < historicalData[0].numberOfWallets; i++) {
      initialBalance += historicalData[i].balance;
    }

    let finalData = historicalData[historicalData.length - 1];
    for (let i = 0; i < finalData.numberOfWallets; i++) {
      finalBalance +=
        historicalData[historicalData.length - finalData.numberOfWallets + i]
          .balance;
    }

    // console.log("historicalData: ", historicalData);
    console.log(
      "initialBalance: ",
      initialBalance,
      "finalBalance: ",
      finalBalance
    );

    const balanceChange = finalBalance - initialBalance;
    const balanceChangePercentage = (
      (balanceChange / initialBalance) *
      100
    ).toFixed(4);

    return {
      ownerName: user.name,
      balanceChange,
      balanceChangePercentage,
    };
  }
);

// Get total balance change by day
// GET /api/v1/reports/get-report-by-day/:userId
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

// Get total balance change by week
// GET /api/v1/reports/get-report-by-week/:userId
const getBalanceChangesByWeek = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const currentDate = date ? new Date(date) : new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);

  const balanceChanges = await getBalanceChangeForTimePeriod(
    startDate,
    endDate,
    req.params.userId
  );

  res.status(200).json({
    message: `Total balance change by week from ${startDate} to ${endDate}`,
    ...balanceChanges,
  });
});

// Get total balance change by month
// GET /api/v1/reports/get-report-by-month/:userId
const getBalanceChangesByMonth = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const currentDate = date ? new Date(date) : new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(1);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const balanceChanges = await getBalanceChangeForTimePeriod(
    startDate,
    endDate,
    req.params.userId
  );

  const month = startDate.toLocaleString("default", { month: "long" });

  res.status(200).json({
    message: `Total balance change of ${month} `,
    ...balanceChanges,
  });
});

module.exports = {
  getBalanceChangesByDay,
  getBalanceChangesByWeek,
  getBalanceChangesByMonth,
};

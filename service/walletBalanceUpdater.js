const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();
const fetchWalletBalance = require("../helpers/fetchWalletBalance");
const walletModel = require("../model/walletModel");

const updateWalletBalances = async () => {
  try {
    // Connect to MongoDB
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`MongoDB connected successfully!`);
      })
      .catch((error) => {
        console.log(`MongoDB connection failed! Error: ${error}`);
      });

    // Get all wallet documents from the database
    const wallets = await walletModel.find({});

    // Fetch and update balance for each wallet
    for (const wallet of wallets) {
      const balance = await fetchWalletBalance(wallet.address);
      wallet.balance = balance;

      // Marking the balance field modified even if theres no change in balance
      wallet.markModified("balance");
      await wallet.save();
      console.log(`Updated balance for wallet with address ${wallet.address}`);
    }

    console.log("Wallet balances updated successfully!");
    console.log("Waiting for the next 5-minute interval...");
  } catch (error) {
    console.error("Error updating wallet balances:", error);
  } finally {
    // Disconnect from MongoDB after updating balances
    await mongoose.disconnect();
  }
};

// Schedule the cron job to run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  const currentTime = new Date().toLocaleString();
  console.log(`Scheduled task running at: ${currentTime}`);
  console.log("Updating wallet balances...");
  await updateWalletBalances();
});

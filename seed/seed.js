const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { seedUsers, seedWallets } = require("./seedData");
const walletModel = require("../model/walletModel");
const userModel = require("../model/userModel");

const seedDatabase = async () => {
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

    // Clear existing data
    await Promise.all([userModel.deleteMany(), walletModel.deleteMany()]);

    // Seed users with hashed passwords
    const hashedUsers = await Promise.all(
      seedUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    const users = await userModel.insertMany(hashedUsers);

    // Seed wallets
    const updatedSeedWallets = [];

    for (let i = 0; i < seedWallets.length; i++) {
      const walletData = seedWallets[i];
      const newWallet = await walletModel.create({
        address: walletData.address,
        balance: walletData.balance,
        owner: i < 2 ? users[0]._id : users[1]._id, // Assigning 3 wallets to 2 users randomly
      });

      users[i < 2 ? 0 : 1].wallets.push(newWallet._id);
    }

    // Save the updated user data with the wallets assigned
    await Promise.all(users.map((user) => user.save()));

    await walletModel.insertMany(updatedSeedWallets);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Disconnect from MongoDB after seeding
    await mongoose.disconnect();
  }
};

seedDatabase();

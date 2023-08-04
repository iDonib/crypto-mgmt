const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../src/app");

const walletModel = require("../src//model/walletModel");
const userModel = require("../src//model/userModel");

// Function to clear the database and create a user
beforeAll(async () => {
  await userModel.deleteMany({});
  await walletModel.deleteMany({});

  // Create a user
  const createUserResponse = await request(app)
    .post("/api/v1/users/register")
    .send({
      name: "Test User",
      email: "test@example.com",
      password: "test123",
      contact: "1234567890",
      age: 25,
      gender: "male",
    });

  const loginResponse = await request(app).post("/api/v1/users/login").send({
    email: "test@example.com",
    password: "test123",
  });

  token = loginResponse.body.token; // Use the JWT token from the login response

  userId = createUserResponse.body.newUser._id;

  // Create a wallet
  const createWalletResponse = await request(app)
    .post("/api/v1/wallets/add")
    .send({
      userId: userId,
      address: "testWalletAddress",
      balance: 100,
    });

  walletId = createWalletResponse.body.wallet._id;
}, 1000000);

// Close the server and disconnect from the database after all tests
afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

describe("Test wallet API endpoints", () => {
  it("should add a new wallet on POST /api/v1/wallets/add-wallet", async () => {
    console.log(userId);
    const response = await request(app).post("/api/v1/wallets/add").send({
      userId: userId,
      address: "testWalletAddress123",
      balance: 100,
    });

    // console.log(response.error);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("Wallet added successfully!");
    expect(response.body.wallet).toHaveProperty("_id");
  }, 10000);

  it("should update a wallet on PATCH /api/v1/wallets/update-wallet/:id", async () => {
    console.log(walletId);
    const response = await request(app)
      .patch(`/api/v1/wallets/update-wallet/${walletId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        address: "updatedWalletAddress",
        balance: 200,
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Wallet updated successfully!");
    expect(response.body.updatedInfo.address).toBe("updatedWalletAddress");
    expect(response.body.updatedInfo.balance).toBe("200");
  }, 100000);

  it("should delete a wallet on DELETE /api/v1/wallets/delete/:id", async () => {
    const response = await request(app)
      .delete(`/api/v1/wallets/delete/${walletId}`)
      .set("Authorization", `Bearer ${token}`); // Set JWT token in the headers

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Wallet deleted successfully!");
  }, 100000);
});

const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../src/app");

const userModel = require("../src/model/userModel");

// Function to clear the database
const clearDatabase = async () => {
  await userModel.deleteMany({});
};

// Before all tests, clear the database and create a user
beforeAll(async () => {
  await clearDatabase();

  const createUserResponse = await request(app)
    .post("/api/v1/users/register")
    .send({
      name: "test user",
      email: "test@example.com",
      password: "test123",
      contact: "1234567890",
      age: 25,
      gender: "male",
    });

  // console.log(createUserResponse.body);

  userId = createUserResponse.body.newUser._id; // Assign userId here
}, 100000);

// Close the server and disconnect from the database after all tests
afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

describe("Test user API endpoints", () => {
  it("should create a new user on POST /api/v1/users/register", async () => {
    const response = await request(app).post("/api/v1/users/register").send({
      name: "Man City",
      email: "club@mancity.com",
      password: "test123",
      contact: "1234567890",
      age: 25,
      gender: "male",
    });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("User created successfully!");
    expect(response.body.newUser).toHaveProperty("_id");
    expect(response.body.token).toBeDefined();
  }, 6000000);

  it("should log in a user on POST /api/v1/users/login", async () => {
    const response = await request(app).post("/api/v1/users/login").send({
      email: "test@example.com",
      password: "test123",
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("User logged in successfully!");
    expect(response.body.user).toHaveProperty("_id");
    expect(response.body.token).toBeDefined();
  }, 6000000);

  it("should update a user on PATCH /api/v1/users/update/:id", async () => {
    console.log(userId);
    const response = await request(app)
      .patch(`/api/v1/users/update/${userId}`)
      .send({
        name: "Updated User",
        email: "updated@example.com",
        password: "updated123",
        contact: "9876543210",
        age: 30,
        gender: "female",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("User updated successfully!");
    expect(response.body.updatedInfo.name).toBe("Updated User");
    expect(response.body.updatedInfo.email).toBe("updated@example.com");
  }, 6000000);

  it("should get a user by ID on GET /api/v1/users/get-user/:id", async () => {
    const response = await request(app).get(`/api/v1/users/get-user/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("User fetched successfully!");
    expect(response.body.user).toHaveProperty("_id");
    expect(response.body.user._id).toBe(userId);
  });

  it("should get all users on GET /api/v1/users/get-all-users", async () => {
    const response = await request(app).get("/api/v1/users/get-all-users");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("User fetched successfully!");
    expect(response.body.users).toBeDefined();
    expect(response.body.users.length).toBeGreaterThan(0);
  });

  it("should delete a user on DELETE /api/v1/users/delete/:id", async () => {
    const response = await request(app).delete(
      `/api/v1/users/delete/${userId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("User deleted successfully!");
  });
});

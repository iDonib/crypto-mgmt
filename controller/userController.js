const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const walletModel = require("../model/walletModel");

// POST /api/v1/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, contact, age, gender } = req.body;

  // Check if email is already used
  const userExists = await userModel.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({
      status: "failed",
      error: "Email is already in use!",
    });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a user
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    contact,
    age,
    gender,
  });

  // Generating JWT Token
  const token = jwt.sign(
    { email: email, id: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(201).json({
    status: "User created successfully!",
    newUser: newUser,
    token: token,
  });
});

// POST /api/v1/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists or not
  const userExists = await userModel.findOne({ email: email });

  if (!userExists) {
    res.status(404).json({
      status: "failed",
      error: "User not found with this email!",
    });
  }

  // Check if passwords match or not
  const matchPassword = await bcrypt.compare(password, userExists.password);

  // console.log("reached here", matchPassword);

  if (!matchPassword) {
    res.status(400).json({
      status: "failed",
      error: "Invalid Credentials!",
    });
  }

  // Generating JWT Token
  const token = jwt.sign(
    { email: email, id: userExists._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    status: "User logged in successfully!",
    user: userExists,
    token: token,
  });
});

// POST /api/v1/users/update/:id
const updateUserById = asyncHandler(async (req, res) => {
  const { name, email, password, contact, age, gender } = req.body;

  const updatePayload = {
    name: name,
    email: email,
    contact: contact,
    age: age,
    gender: gender,
  };

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
    updatePayload.password = hashedPassword;
  }

  // Check if email is already in use
  const emailUsed = await userModel.findOne({ email: email });
  if (emailUsed) {
    return res.status(400).json({
      status: "failed",
      error: "Email is already in use or you are using the same email!",
    });
  }

  // Check if user exists or not and update if there is
  const user = await userModel.findByIdAndUpdate(req.params.id, updatePayload, {
    new: true,
  });

  if (!user) {
    return res.status(404).json({ status: "failed", error: "User not found!" });
  }

  res
    .status(200)
    .json({ status: "User updated successfully!", updatedInfo: user });
});

// POST /api/v1/users/update/:id
const deleteUserById = asyncHandler(async (req, res) => {
  // Check if user exists and delete if exists
  const user = await userModel.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(400).json({ status: "failed", error: "User not found!" });
  }

  res.status(200).json({ status: "User deleted successfully!" });
});

// GET /api/v1/users/get-user/:id
const getUserById = asyncHandler(async (req, res) => {
  // Check if user exists and delete if exists
  const user = await userModel.findById(req.params.id).populate({
    path: "wallets",
    model: walletModel,
    select: "address balance",
  });

  if (!user) {
    res.status(400).json({ status: "failed", error: "User not found!" });
  }

  res.status(200).json({ status: "User fetched successfully!", user: user });
});

// GET /api/v1/users/get-all-users
const getAllUsers = asyncHandler(async (req, res) => {
  // Check if user exists and delete if exists
  const users = await userModel.find().populate({
    path: "wallets",
    model: walletModel,
    select: "address balance",
  });

  if (!users) {
    res.status(400).json({ status: "failed", error: "User not found!" });
  }

  res.status(200).json({ status: "User fetched successfully!", users: users });
});
module.exports = {
  registerUser,
  loginUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getAllUsers,
};

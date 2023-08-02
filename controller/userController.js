const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");

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

  res.status(201).json({
    status: "User created successfully!",
    newUser: newUser,
  });
});

module.exports = { registerUser };

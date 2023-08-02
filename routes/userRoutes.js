const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getAllUsers,
} = require("../controller/userController");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.patch("/update/:id", updateUserById);
userRoute.delete("/delete/:id", deleteUserById);
userRoute.get("/get-user/:id", getUserById);
userRoute.get("/get-all-users", getAllUsers);

module.exports = userRoute;

const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getAllUsers,
} = require("../controller/userController");
const {
  validateRegisterUser,
  validateUpdateUser,
  validateLoginUser,
} = require("../validator/userValidator");

const userRoute = express.Router();

userRoute.post("/register", validateRegisterUser, registerUser);
userRoute.post("/login", validateLoginUser, loginUser);
userRoute.patch("/update/:id", validateUpdateUser, updateUserById);
userRoute.delete("/delete/:id", deleteUserById);
userRoute.get("/get-user/:id", getUserById);
userRoute.get("/get-all-users", getAllUsers);

module.exports = userRoute;

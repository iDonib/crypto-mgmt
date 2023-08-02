const express = require("express");
const { registerUser } = require("../controller/userController");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login");
userRoute.patch("/update/:id");
userRoute.delete("/delete/:id");
userRoute.get("/:id");

module.exports = userRoute;

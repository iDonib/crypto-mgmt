const express = require("express");
const passport = require("passport");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../controller/userController");

const router = express.Router();

// Google OAuth callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Handle successful authentication
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ user, token });
  }
);

// Google OAuth route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// POST /api/v1/users/register
router.post("/register", registerUser);

// POST /api/v1/users/login
router.post("/login", loginUser);

module.exports = router;

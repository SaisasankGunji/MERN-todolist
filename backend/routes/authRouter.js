const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isAuth = require("../middleware/isAuth");

// Input validation middleware
const validateRegisterInput = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      status: 400,
      error: "All fields are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: 400,
      error: "Password must be at least 6 characters long",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      status: 400,
      error: "Please enter a valid email address",
    });
  }

  next();
};

// Register
router.post("/register", validateRegisterInput, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        error: "User already exists with this email",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      status: 500,
      error: "Registration failed. Please try again.",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        error: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({
        status: 401,
        error: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        error: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "saisasankKey",
      {
        expiresIn: "7d",
      }
    );

    // Set cookie and respond
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        status: 200,
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: 500,
      error: "Login failed. Please try again.",
    });
  }
});

// Logout
router.get("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      status: 200,
      message: "Logged out successfully",
    });
});

// Verify authentication
router.get("/verify", isAuth, (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Authenticated",
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  });
});

module.exports = router;

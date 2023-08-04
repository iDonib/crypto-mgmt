const rateLimit = require("express-rate-limit");

// Global rate limiting middleware
const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 min
  max: 100, //  100 requests per 5 min
});

// Rate limiting middleware for specific routes
const routeLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50, // 50 requests per 5 min
});

module.exports = { globalLimiter, routeLimiter };

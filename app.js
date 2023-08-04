const express = require("express");
require("express-async-errors");
const morgan = require("morgan");

require("dotenv").config();

const connectDb = require("./config/dbConnection");
const userRoute = require("./routes/userRoutes");
const walletRoute = require("./routes/walletRoutes");
const reportRoute = require("./routes/reportRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/wallets", walletRoute);
app.use("/api/v1/reports", reportRoute);

// Error handler to avoid try..catch
app.use(errorHandler);

const port = process.env.NODE_ENV === "test" ? 9000 : process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

module.exports = { app, server };

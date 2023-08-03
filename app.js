const express = require("express");
require("express-async-errors");
const morgan = require("morgan");

require("dotenv").config();

const connectDb = require("./config/dbConnection");
const userRoute = require("./routes/userRoutes");
const walletRoute = require("./routes/walletRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();

// Connect db
connectDb();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/wallets", walletRoute);

// Error handler to avoid try..catch
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

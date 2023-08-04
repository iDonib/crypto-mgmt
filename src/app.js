const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

require("dotenv").config();

require("./config/dbConnection");
const userRoute = require("./routes/userRoutes");
const walletRoute = require("./routes/walletRoutes");
const reportRoute = require("./routes/reportRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/wallets", walletRoute);
app.use("/api/v1/reports", reportRoute);

// Swagger API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler to avoid try..catch
app.use(errorHandler);

const port = process.env.NODE_ENV === "test" ? 9000 : process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

module.exports = { app, server };

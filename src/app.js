const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const markdownIt = require("markdown-it");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

require("dotenv").config();

require("./config/dbConnection");
const userRoute = require("./routes/userRoutes");
const walletRoute = require("./routes/walletRoutes");
const reportRoute = require("./routes/reportRoutes");
const errorHandler = require("./utils/errorHandler");
const { globalLimiter, routeLimiter } = require("./utils/rateLimiter");
const router = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(globalLimiter);

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/wallets", routeLimiter, walletRoute);
app.use("/api/v1/reports", reportRoute);
app.use("/", router);

// Swagger API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rendering the homepage with README.md
app.get("/", (req, res) => {
  fs.readFile("README.md", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading the README.md file");
    } else {
      const md = new markdownIt();
      const html = md.render(data);
      res.send(html);
    }
  });
});

// Error handler to avoid try..catch
app.use(errorHandler);

const port = process.env.NODE_ENV === "test" ? 9000 : process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

module.exports = { app, server };

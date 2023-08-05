const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Crypto Management",
    description:
      "This project is a backend application built with Node.js, Express and MongoDB. It provides APIs for handling users and crypto wallets and provides the reports based on wallet.",
  },
  host: "localhost:8000",
  schemes: ["http"],
};
const outputFile = "./swagger-output.json";

const endpoints = ["./app.js"];

swaggerAutogen(outputFile, endpoints, doc)
  .then(() => {
    console.log("Swagger-output generated.");
  })
  .catch((err) => {
    console.error(err);
  });

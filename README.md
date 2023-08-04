# Project Documentation

## Overview

This project is a backend application built with Node.js, Express, and MongoDB. It provides APIs for handling users and crypto wallets and provides reports based on wallets.

## Prerequisites

Before running the project, make sure you have the following installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

1. Clone the repository: `git clone https://github.com/donib-irakihda/crypto-mgmt.git`
2. Change the directory to project directory: `cd crypto-mgmt`
3. Install dependencies: `npm install`
4. Create an `.env` file in the root of the project based on the provided env.example file. Fill in the following values:  
   `PORT=8000`  
   `MONGO_URI="YOUR_MONGO_URI"`  
   `JWT_SECRET="YOUR_JWT_SECRET"`  
   `BSCSCAN_API_KEY="YOUR_BSCSCAN_API_KEY"`
5. Run the seed: `npm run seed`
6. Start the server: `npm run dev`
7. Run the cron service separately: `npm run cron`
8. The server will be running on `http://localhost:8000`.
9. Run `node src/swagger.js` to get the `swagger-output.json` file.
10. Go to browser and hit this url: `http://localhost:8000/api-docs/` and you will see all the APIs of this project.
11. Or, you can simply import the APIs in Postman by importing that `swagger-output.json`.

## Project Structure

- `src`: Contains the source code of the application.
  - `app.js`: Main application file.
  - `controllers`: Contains the controller functions for handling API requests.
  - `models`: Contains the MongoDB models for user and wallet.
  - `routes`: Contains the route definitions for the API endpoints.
  - `config`: Contains configuration files, such as database connection.
  - `middlewares`: Contains custom middlewares, such as authentication middleware.
  - `helpers`: Contains various helper functions.
  - `seed`: Contains seed data and seeding functions.
  - `service`: Contains the service that fetches the balance changes periodically.
  - `validator`: Contains the input validations
  - `utils`: Contains necessary utilities
- `test`: Contains Jest test files.
  - `users.test.js`: Tests for user-related APIs.
  - `wallets.test.js`: Tests for wallet-related APIs.

## API Endpoints

### Users

- `POST /api/v1/users/register`: Create a new user.
- `POST /api/v1/users/login`: Log in a user and receive a JWT token.
- `GET /api/v1/users/get-user/{id}`: Get a user by ID.
- `GET /api/v1/users/get-all-users`: Get all users
- `PUT /api/v1/users/update/{id}`: Update a user's information.
- `DELETE /api/v1/users/delete/{id}`: Delete a user.

### Wallets

- `POST /api/v1/wallets/add`: Create a new wallet for an existing user.
- `POST /api/v1/wallets/get-user-wallets/:id`: Get all wallets of a user.
- `GET /api/v1/wallets/get-wallet/{id}`: Get a wallet by ID.
- `PUT /api/v1/wallets/update-wallet/{id}`: Update a wallet's information.
- `DELETE /api/v1/wallets/delete-wallet/{id}`: Delete a wallet.

### Reports

- `GET /api/v1/reports/get-report-by-day/:userId`: Get total balance change by day for a specific user.
- `GET /api/v1/reports/get-report-by-week/:userId`: Get total balance change by week for a specific user.
- `GET /api/v1/reports/get-report-by-month/:userId`: Get total balance change by month for a specific user.

## Testing

To run tests, use the command: `npm test`.

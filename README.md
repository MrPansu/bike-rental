# Bike Rental Application

This is a Bike Rental Application built with Node.js, Express, and MongoDB. The application allows users to manage bikes, customers, and transactions.

## Features

- Manage bikes (CRUD operations)
- Manage customers (CRUD operations)
- Manage transactions (CRUD operations)
- Calculate total fine and total payment for transactions

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bike-rental.git
```

2. Navigate to the project directory:

```bash
cd bike-rental
```

3. Install the dependecies:

```bash
npm install
```

4. Create a .env file in the root directory and add your MongoDB URI and port:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1/bikerental_db
```

## Running the Application

1. Start the MongoDB server

2. Start the application:

```bash
npm run dev
```

3. The server will be running at

```http
http://localhost:5000
```

## API Reference

#### Bikes

- `GET /api/bikes` - Get all bikes
- `GET /api/bikes/:id` - Get a bike by ID
- `POST /api/bikes` - Create a new bike
- `PUT /api/bikes/:id` - Update a bike by ID
- `DELETE /api/bikes/:id` - Delete a bike by ID

#### Customers

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get a customer by ID
- `POST /api/customers` - Create a new customer
- `PUT /api/customers/:id` - Update a customer by ID
- `DELETE /api/customers/:id` - Delete a customer by ID

#### Transactions

- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get a transaction by ID
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction by ID
- `DELETE /api/transactions/:id` - Delete a transaction by ID

## Project Structures

```
bike-rental/
├── controllers/
│   ├── bike.controller.js
│   ├── customer.controller.js
│   └── transaction.controller.js
├── models/
│   ├── bike.model.js
│   ├── customer.model.js
│   └── transaction.model.js
├── routes/
│   ├── bike.routes.js
│   ├── customer.routes.js
│   └── transaction.routes.js
├── config/
│   └── db.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

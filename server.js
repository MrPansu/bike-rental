import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import bikeRoutes from "./routes/bike.routes.js";
import customerRoute from "./routes/customer.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/bikes", bikeRoutes);
app.use("/api/customers", customerRoute);
app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  connectDB();
  console.info(`Server listening on http://localhost:${PORT}`);
});

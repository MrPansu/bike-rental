import express from "express";

import {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  deleteCustomerById,
  updateCustomerById,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.post("/", createCustomer);
router.delete("/:id", deleteCustomerById);
router.put("/:id", updateCustomerById);

export default router;

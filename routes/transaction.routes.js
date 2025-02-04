import e from "express";

import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  deleteTransactionById,
  updateTransactionById,
} from "../controllers/transaction.controller.js";

const router = e.Router();

router.post("/", createTransaction);
router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.put("/:id", updateTransactionById);
router.delete("/:id", deleteTransactionById);

export default router;

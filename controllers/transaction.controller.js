import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error("Error getting transactions", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }
    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    console.error("Error getting transaction", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  const { customer, bike, rentalDate, dueDate, assurance } = req.body;

  if (!customer || !bike || !rentalDate || !dueDate || !assurance) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required data" });
  }

  const newTransaction = new Transaction({
    customer,
    bike,
    rentalDate: new Date(rentalDate),
    dueDate: new Date(dueDate),
    assurance,
  });

  try {
    await newTransaction.save();
    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    console.error("Error creating transaction:", error.message);
    res
      .status(409)
      .json({ success: false, message: "Error creating transaction" });
  }
};

export const updateTransactionById = async (req, res) => {
  const { id } = req.params;
  const { ...transaction } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    const existingTransaction = await Transaction.findById(id);
    if (!existingTransaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    Object.assign(existingTransaction, transaction);
    await existingTransaction.save();

    res.status(200).json({ success: true, data: existingTransaction });
  } catch (error) {
    console.error("Error updating transaction", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTransactionById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    if (!(await Transaction.findById(id))) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }
    await Transaction.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

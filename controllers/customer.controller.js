import mongoose from "mongoose";
import Customer from "../models/customer.model.js";

export const getAllCustomers = async (req, res) => {
  try {
    const customer = await Customer.find({});
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error("error in fetching customers", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error("error in fetching customers", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createCustomer = async (req, res) => {
  const customer = req.body;

  if (!customer.name || !customer.address || !customer.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all data" });
  }

  const newCustomer = new Customer(customer);

  try {
    await newCustomer.save();
    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    console.error("Error creating customer:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    if (!(await Customer.findById(id))) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    await Customer.findByIdAndDelete(id);
    res.status(200);
  } catch (error) {
    console.error("Error deleting customer:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateCustomerById = async (req, res) => {
  const { id } = req.params;
  const customer = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    if (!(await Customer.findById(id))) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    await Customer.findByIdAndUpdate(id, customer, { new: true });
    res
      .status(200)
      .json({ success: true, message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error updating customer:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

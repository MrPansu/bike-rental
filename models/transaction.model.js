import mongoose from "mongoose";
import Bike from "./bike.model.js";

const transactionSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Customer is required"],
  },
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike",
    required: [true, "Bike is required"],
  },
  rentalDate: {
    type: Date,
    required: [true, "Rental Date is required"],
  },
  dueDate: {
    type: Date,
    required: [true, "due Date is required"],
  },
  returnDate: {
    type: Date,
    default: null,
  },
  fine: {
    type: Number,
    default: 5000,
  },
  totalFine: {
    type: Number,
    default: 0,
  },
  totalPayment: {
    type: Number,
    default: 0,
  },
  assurance: {
    type: Number,
    required: [true, "Assurance is required"],
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

// Pre-save hook to calculate total fine
transactionSchema.pre("save", async function (next) {
  if (this.returnDate && this.dueDate) {
    const returnDate = new Date(this.returnDate);
    const dueDate = new Date(this.dueDate);
    const daysLate = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24)); // Calculate days late
    this.totalFine = daysLate > 0 ? daysLate * this.fine : 0; // Calculate total fine
  }

  if (this.dueDate && this.rentalDate) {
    const dueDate = new Date(this.dueDate);
    const rentalDate = new Date(this.rentalDate);
    const rentalDays = Math.ceil(
      (dueDate - rentalDate) / (1000 * 60 * 60 * 24)
    ); // Calculate rental days

    const bike = await Bike.findById(this.bike);
    if (bike) {
      const bikePrice = parseFloat(bike.price);
      this.totalPayment = rentalDays * bikePrice + this.totalFine; // Calculate total payment
    }
  }

  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

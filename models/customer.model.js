import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;

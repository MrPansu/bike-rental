import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  price: {
    type: String,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

export default Bike;

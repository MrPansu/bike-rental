import mongoose from "mongoose";
import Bike from "../models/bike.model.js";

export const getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({});
    res.status(200).json({ success: true, data: bikes });
  } catch (error) {
    console.error("Error getting bikes", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBikeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    const bike = await Bike.findById(id);
    if (!bike) {
      return res
        .status(404)
        .json({ success: false, message: "Bike not found" });
    }
    res.status(200).json({ success: true, data: bike });
  } catch (error) {
    console.error("Error getting bike", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBike = async (req, res) => {
  const bike = req.body;

  if (!bike.brand || !bike.price || !bike.quantity || !bike.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all data" });
  }

  const newBike = new Bike(bike);

  try {
    await newBike.save();
    res.status(201).json({ success: true, data: newBike });
  } catch (error) {
    console.error("Error creating bike", error.message);
    res.status(500).json({ success: false, message: "Error creating bike" });
  }
};

export const deleteBikeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    if (!(await Bike.findById(id))) {
      return res
        .status(404)
        .json({ success: false, message: "Bike not found" });
    }
    await Bike.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Bike deleted successfully" });
  } catch (error) {
    console.error("Error deleting bike", error.message);
    res.status(500).json({ success: false, message: "Error deleting bike" });
  }
};

export const updateBikeById = async (req, res) => {
  const { id } = req.params;
  const bike = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    if (!(await Bike.findById(id))) {
      return res
        .status(404)
        .json({ success: false, message: "Bike not found" });
    }
    const updatedBike = await Bike.findByIdAndUpdate(id, bike, { new: true });
    res.status(200).json({ success: true, data: updatedBike });
  } catch (error) {
    console.error("Error updating bike", error.message);
    res.status(500).json({ success: false, message: "Error updating bike" });
  }
};

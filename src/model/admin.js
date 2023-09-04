import mongoose from "mongoose";

// Admin model schema
const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

export const AdminModel = new mongoose.model("admin",adminSchema);

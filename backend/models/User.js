const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: [true, "Google ID is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    profilePicture: {
      type: String,
      trim: true,
      default: "",
    },
    preferredCurrency: {
      type: String,
      trim: true,
      uppercase: true,
      default: "AED",
      minlength: [3, "Currency code must be 3 characters"],
      maxlength: [3, "Currency code must be 3 characters"],
    },
    monthlyBudget: {
      type: Number,
      default: 0,
      min: [0, "Monthly budget cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

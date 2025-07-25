const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: String,
      default: () => new Date().toLocaleString(),
    },
    updatedAt: {
      type: String,
      default: () => new Date().toLocaleString(),
    },
  },
  {
    timestamps: false, // We're handling timestamps manually
  }
);

// Add index for better query performance
taskSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Task", taskSchema);

const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("task", taskSchema);

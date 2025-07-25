const taskModel = require("../models/taskModel");

const insertTask = async (req, res) => {
  try {
    const { task, description } = req.body;

    // Validate required fields
    if (!task || task.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Task name is required",
      });
    }

    const newTask = new taskModel({
      task: task.trim(),
      description: description ? description.trim() : "",
      createdAt: new Date().toLocaleString(),
      userId: req.user._id, // Associate task with authenticated user
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      status: 201,
      message: "Task inserted successfully",
      task: savedTask,
    });
  } catch (err) {
    console.error("Insert task error:", err);
    res.status(500).json({
      status: 500,
      message: "Error while inserting task",
      error: err.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    // Only get tasks for the authenticated user
    const tasks = await taskModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 200,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({
      status: 500,
      message: "Error while retrieving tasks",
      error: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "Task ID is required",
      });
    }

    // Only delete task if it belongs to the authenticated user
    const deleteResponse = await taskModel.deleteOne({
      _id: id,
      userId: req.user._id,
    });

    if (deleteResponse.deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Task not found or unauthorized",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Task deleted successfully",
      deleteResponse,
    });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({
      status: 500,
      message: "Error while deleting task",
      error: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { task, description } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "Task ID is required",
      });
    }

    if (!task || task.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Task name is required",
      });
    }

    // Only update task if it belongs to the authenticated user
    const updateResponse = await taskModel.updateOne(
      { _id: id, userId: req.user._id },
      {
        task: task.trim(),
        description: description ? description.trim() : "",
        updatedAt: new Date().toLocaleString(),
      }
    );

    if (updateResponse.matchedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Task not found or unauthorized",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Task updated successfully",
      updateResponse,
    });
  } catch (err) {
    console.error("Update task error:", err);
    res.status(500).json({
      status: 500,
      message: "Error while updating task",
      error: err.message,
    });
  }
};

const getSpecificTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "Task ID is required",
      });
    }

    // Only get task if it belongs to the authenticated user
    const task = await taskModel.findOne({ _id: id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({
        status: 404,
        message: "Task not found or unauthorized",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Task retrieved successfully",
      task,
    });
  } catch (err) {
    console.error("Get specific task error:", err);
    res.status(500).json({
      status: 500,
      message: "Error while retrieving task",
      error: err.message,
    });
  }
};

module.exports = {
  insertTask,
  getTasks,
  deleteTask,
  updateTask,
  getSpecificTask,
};

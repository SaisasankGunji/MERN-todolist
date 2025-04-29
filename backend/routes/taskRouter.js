const express = require("express");
const {
  insertTask,
  getTasks,
  deleteTask,
  updateTask,
  getSpecificTask,
} = require("../controllers/taskController");
const taskRouter = express.Router();

taskRouter.post("/insert-task", insertTask);
taskRouter.get("/tasks", getTasks);
taskRouter.delete("/delete-task/:id", deleteTask);
taskRouter.put("/update-task/:id", updateTask);
taskRouter.get("/get-specifictask/:id", getSpecificTask);
module.exports = { taskRouter };

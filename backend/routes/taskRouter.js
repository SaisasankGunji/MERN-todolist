const express = require("express");
const {
  insertTask,
  getTasks,
  deleteTask,
  updateTask,
  getSpecificTask,
} = require("../controllers/taskController");
const taskRouter = express.Router();

taskRouter.post("/api/v1/insert-task", insertTask);
taskRouter.get("/api/v1/tasks", getTasks);
taskRouter.delete("/api/v1/delete-task/:id", deleteTask);
taskRouter.put("/api/v1/update-task/:id", updateTask);
taskRouter.get("/api/v1/get-specifictask/:id", getSpecificTask);
module.exports = { taskRouter };

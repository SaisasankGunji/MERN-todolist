const taskModel = require("../models/taskModel");

const insertTask = (req, res) => {
  const { task, description, createdAt } = req.body;
  const newTask = new taskModel({
    task,
    description,
    createdAt,
  });
  newTask
    .save()
    .then(() =>
      res.status(201).json({
        status: 201,
        message: "Task inserted",
        newTask,
      })
    )
    .catch((err) =>
      res.status(401).json({
        status: 401,
        message: "Error while inserting task",
        errResponse: err,
      })
    );
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json({
      status: 200,
      message: "Retrieved Tasks are: ",
      tasks,
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Error while retrieving tasks",
      err,
    });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteResponse = await taskModel.deleteOne({ _id: id });
    res.status(200).json({
      status: 200,
      message: "Task successfully Deleted",
      deleteResponse,
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Error while deleting task",
      err,
    });
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  try {
    const { task, description, createdAt } = req.body;
    const updateResponse = await taskModel.updateOne(
      { _id: id },
      { task, description, createdAt }
    );
    res.status(200).json({
      status: 200,
      message: "Task successfully Updated",
      updateResponse,
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Error while deleting task",
      err,
    });
  }
};

const getSpecificTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskModel.findOne({ _id: id });
    res.status(200).json({
      status: 200,
      message: "Task retrieved successfully.",
      task,
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Error while retrieving task.",
      err,
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

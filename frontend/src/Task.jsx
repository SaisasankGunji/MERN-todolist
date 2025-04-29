import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

const Task = () => {
  const [taskData, setTaskData] = useState({
    task: "",
    description: "",
    createdAt: new Date().toLocaleString(),
    _id: "",
  });
  const [taskList, setTaskList] = useState([]);
  function saveTask(e) {
    e.preventDefault();
    if (taskData._id) {
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/update-task/${
            taskData._id
          }`,
          taskData
        )
        .then((res) => {
          setTaskData({
            task: "",
            description: "",
            _id: "",
          });
          getAllTasks();
          toast.success("Task updated successfully");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/insert-task`,
          taskData
        )
        .then((res) => {
          toast.success("Task added successfully");
          setTaskData({ task: "", description: "" });
          getAllTasks();
        });
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((t) => ({ ...t, [name]: value }));
  };

  const getAllTasks = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/tasks`)
      .then((res) => {
        setTaskList(res.data.tasks);
      });
  };
  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <div className="mainContainer">
      <ToastContainer />
      <h1>Todo List</h1>
      <div className="taskFormContainer">
        <form onSubmit={saveTask} id="taskForm">
          <div className="taskContainer">
            <input
              type="text"
              value={taskData.task}
              name="task"
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label value="taskName" htmlFor="task">
              Task
            </label>
          </div>
          <div className="descContainer">
            <input
              type="text"
              value={taskData.description}
              name="description"
              id="desc"
              placeholder=" "
              onChange={handleChange}
            />
            <label value="taskDescription" htmlFor="desc">
              Description
            </label>
          </div>
          <button id="submitBtn" type="submit">
            {taskData._id ? "Update" : "Save"}
          </button>
        </form>
      </div>
      <TaskList
        data={taskList}
        getAllTasks={getAllTasks}
        setTaskData={setTaskData}
      />
    </div>
  );
};

const TaskList = ({ data, getAllTasks, setTaskData }) => {
  function handleUpdate(id) {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/api/v1/get-specifictask/${id}`
      )
      .then((res) => {
        setTaskData(res.data.task);
      });
  }
  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_URL
            }/api/v1/delete-task/${id}`
          )
          .then((res) => {
            toast.success("Task deleted successfully");
            getAllTasks();
          })
          .catch((err) => console.log(err));
      }
    });
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>Task</th>
          <th>Task description</th>
          <th>Task Created At</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((task, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.task}</td>
                <td>{task.description}</td>
                <td>{task.createdAt}</td>
                <td>
                  <button
                    className="list-btns"
                    onClick={() => handleUpdate(task._id)}
                  >
                    <MdEdit />
                  </button>
                </td>
                <td>
                  <button
                    className="list-btns"
                    onClick={() => handleDelete(task._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr className="noTasksAdded">
            <td colSpan={6}>Add a Task to see here</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default Task;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit, MdLogout } from "react-icons/md";
import { useAlert } from "./AlertMessage";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const [taskData, setTaskData] = useState({
    task: "",
    description: "",
    _id: "",
  });
  const [taskList, setTaskList] = useState([]);
  const { showAlert, AlertContainer } = useAlert();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  function saveTask(e) {
    e.preventDefault();
    if (!taskData.task.trim()) {
      showAlert("Task name is required", "error");
      return;
    }

    if (taskData._id) {
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/v1/update-task/${
            taskData._id
          }`,
          taskData
        )
        .then(() => {
          setTaskData({ task: "", description: "", _id: "" });
          getAllTasks();
          showAlert("Task updated successfully", "success");
        })
        .catch((err) => {
          showAlert("Error updating task", "error");
          console.error(err);
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/v1/insert-task`,
          taskData
        )
        .then(() => {
          showAlert("Task added successfully", "success");
          setTaskData({ task: "", description: "" });
          getAllTasks();
        })
        .catch((err) => {
          showAlert("Error adding task", "error");
          console.error(err);
        });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((t) => ({ ...t, [name]: value }));
  };

  const getAllTasks = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/v1/tasks`)
      .then((res) => {
        setTaskList(res.data.tasks || []);
      })
      .catch((err) => {
        showAlert("Error fetching tasks", "error");
        console.error(err);
      });
  };

  const handleLogout = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/v1/auth/logout`)
      .then(() => {
        showAlert("Logged out successfully", "success");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => {
        showAlert("Error logging out", "error");
        console.error(err);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <AlertContainer />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">TaskMaster</h1>
              <p className="text-gray-600">Manage your tasks efficiently</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              <MdLogout />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Task Form */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {taskData._id ? "Update Task" : "Add New Task"}
          </h2>
          <form onSubmit={saveTask} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="task"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Name *
                </label>
                <input
                  type="text"
                  id="task"
                  value={taskData.task}
                  name="task"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={taskData.description}
                  name="description"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {taskData._id ? "Update Task" : "Add Task"}
              </button>
              {taskData._id && (
                <button
                  type="button"
                  onClick={() =>
                    setTaskData({ task: "", description: "", _id: "" })
                  }
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Task List */}
      <div className="max-w-6xl mx-auto">
        <TaskList
          data={taskList}
          getAllTasks={getAllTasks}
          setTaskData={setTaskData}
          showAlert={showAlert}
        />
      </div>
    </div>
  );
};

const TaskList = ({ data, getAllTasks, setTaskData, showAlert }) => {
  function handleUpdate(id) {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }api/v1/get-specifictask/${id}`
      )
      .then((res) => {
        setTaskData(res.data.task);
        showAlert("Task loaded for editing", "info");
      })
      .catch((err) => {
        showAlert("Error loading task", "error");
        console.error(err);
      });
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_URL
          }api/v1/delete-task/${id}`
        )
        .then(() => {
          showAlert("Task deleted successfully", "success");
          getAllTasks();
        })
        .catch((err) => {
          showAlert("Error deleting task", "error");
          console.error(err);
        });
    }
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <div className="text-4xl mb-3">📝</div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">No tasks yet</h3>
        <p className="text-gray-500">Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Your Tasks</h2>
        <p className="text-gray-600 text-sm">
          {data.length} task{data.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((task, index) => (
              <tr key={task._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {task.task}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-500 max-w-xs truncate">
                    {task.description || "-"}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {task.createdAt}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <MdEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;

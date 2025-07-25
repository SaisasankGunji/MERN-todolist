import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Users/Login";
import Signup from "./components/Users/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Task from "./components/Task";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/tasks" element={<Task />} />
        </Route>

        {/* Add more protected routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

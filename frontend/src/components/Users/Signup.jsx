import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../AlertMessage";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    cnfPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showAlert, AlertContainer } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [cnfPasswordType, setCnfPasswordType] = useState("password");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.cnfPassword) {
      showAlert("Passwords don't match!", "error");
      return;
    }

    if (form.password.length < 6) {
      showAlert("Password must be at least 6 characters", "error");
      return;
    }

    setIsLoading(true);

    try {
      const { username, email, password } = form;
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/v1/auth/register`,
        { username, email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showAlert("Registration successful! Please login.", "success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Registration failed";
      showAlert(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (!showPassword) {
      setPasswordType("text");
      setShowPassword(true);
    } else {
      setPasswordType("password");
      setShowPassword(false);
    }
  };
  const handleClick2 = () => {
    if (!showCnfPassword) {
      setCnfPasswordType("text");
      setShowCnfPassword(true);
    } else {
      setCnfPasswordType("password");
      setShowCnfPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <AlertContainer />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Join TaskMaster
            </h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username *
              </label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password *
              </label>
              <input
                name="password"
                type={passwordType}
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {showPassword ? (
                <FaEye
                  className="absolute top-[40px] right-[10px]"
                  onClick={handleClick}
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-[40px] right-[10px]"
                  onClick={handleClick}
                />
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="cnfPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password *
              </label>
              <input
                name="cnfPassword"
                type={cnfPasswordType}
                value={form.cnfPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {showCnfPassword ? (
                <FaEye
                  className="absolute top-[40px] right-[10px]"
                  onClick={handleClick2}
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-[40px] right-[10px]"
                  onClick={handleClick2}
                />
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded font-medium text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

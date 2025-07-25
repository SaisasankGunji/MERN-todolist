import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Welcome to{" "}
            <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskMaster
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tired of forgetting your daily goals?{" "}
            <span className="font-semibold text-gray-800">TaskMaster</span> is
            your personal task manager to help you stay focused, organized, and
            productive.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Quick Planning
              </h3>
              <p className="text-gray-600">
                Plan your daily to-dos in seconds with our intuitive interface
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Progress Tracking
              </h3>
              <p className="text-gray-600">
                Track your progress and update tasks anytime, anywhere
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Secure Access
              </h3>
              <p className="text-gray-600">
                Access anywhere with secure login and data protection
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of users who have transformed their productivity with
            TaskMaster
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/login"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Login to Your Account
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-105"
            >
              Create New Account
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">100K+</div>
            <div className="text-gray-600">Tasks Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

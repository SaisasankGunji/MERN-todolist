import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("/api/v1/auth/logout", { withCredentials: true })
      .then(() => navigate("/"));
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "./AlertMessage";

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("checking"); // 'checking', 'authenticated', 'unauthenticated'
  const { showAlert } = useAlert();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Ensure proper URL construction
        const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
        const apiUrl = `${backendUrl}${
          backendUrl.endsWith("/") ? "" : "/"
        }api/v1/auth/verify`;

        const response = await axios.get(apiUrl, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 && response.data?.user) {
          setAuthStatus("authenticated");
        } else {
          throw new Error("Authentication failed");
        }
      } catch (err) {
        console.error("Auth verification error:", err);
        setAuthStatus("unauthenticated");
        showAlert("Please login to continue", "error");
        navigate("/login", {
          replace: true,
          state: { from: location.pathname },
        });
      }
    };

    checkAuth();
  }, [navigate, showAlert]);

  if (authStatus === "checking") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (authStatus === "authenticated") {
    return children;
  }

  return null;
};

export default AuthRoute;

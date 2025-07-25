import { Outlet } from "react-router-dom";
import AuthRoute from "./AuthRoute";

const PrivateRoute = () => {
  return (
    <AuthRoute>
      <Outlet />
    </AuthRoute>
  );
};

export default PrivateRoute;

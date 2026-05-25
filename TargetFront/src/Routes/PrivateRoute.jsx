import { Navigate } from "react-router-dom";
import { getRoleFromToken, getToken, isTokenExpired } from "../utils/auth";

export default function PrivateRoute({ children, role }) {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    const userRole = getRoleFromToken(token);
    if (userRole !== role) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

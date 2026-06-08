import { Navigate } from "react-router-dom";
import Login from "../Login";
import { getRoleFromToken, getToken, isTokenExpired, ROLES } from "../../utils/auth";

export default function SuperAdminLogin() {
  const token = getToken();
  if (token && !isTokenExpired(token) && getRoleFromToken(token) === ROLES.SUPER_ADMIN) {
    return <Navigate to="/super-admin" replace />;
  }

  return <Login mode="super-admin" />;
}

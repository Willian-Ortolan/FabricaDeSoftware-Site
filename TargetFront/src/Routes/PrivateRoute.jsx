import { Alert } from "antd";
import { Navigate, useParams } from "react-router-dom";
import {
  getEmpresaSlugFromToken,
  getRoleFromToken,
  getToken,
  isTokenExpired,
  normalizeRole,
  roleMatches,
  ROLES,
} from "../utils/auth";
import { loginPathForRole } from "../utils/tenantPaths";

export default function PrivateRoute({
  children,
  role,
  roles,
  requireSlugMatch = false,
}) {
  const { slug: urlSlug } = useParams();
  const token = getToken();
  const requiredRoles = roles ?? (role ? [role] : null);

  if (!token || isTokenExpired(token)) {
    const loginTo = urlSlug
      ? `/e/${urlSlug}/login`
      : "/";
    return <Navigate to={loginTo} replace />;
  }

  const userRole = getRoleFromToken(token);

  if (requiredRoles?.length && !requiredRoles.some((r) => roleMatches(r, userRole))) {
    const loginTo = loginPathForRole(userRole, getEmpresaSlugFromToken(token) ?? urlSlug);
    return <Navigate to={loginTo} replace />;
  }

  if (requireSlugMatch && userRole !== ROLES.SUPER_ADMIN) {
    const tokenSlug = getEmpresaSlugFromToken(token);
    if (!urlSlug || !tokenSlug || urlSlug !== tokenSlug) {
      return (
        <div style={{ padding: 40 }}>
          <Alert
            type="warning"
            showIcon
            message="Acesso negado"
            description="O slug da URL não corresponde à empresa do seu usuário."
          />
        </div>
      );
    }
  }

  return children;
}

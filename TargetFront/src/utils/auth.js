const ROLE_CLAIM_URI =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const ROLE_CLAIM_KEYS = [
  "role",
  ROLE_CLAIM_URI,
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role",
  "perfil",
];

const EMPRESA_ID_CLAIM_KEYS = [
  "empresaId",
  "EmpresaId",
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
];

const EMPRESA_SLUG_CLAIM_KEYS = ["empresaSlug", "EmpresaSlug"];

export const ROLES = {
  SUPER_ADMIN: "SuperAdmin",
  ADMIN_EMPRESA: "AdminEmpresa",
  CLIENTE: "Cliente",
};

/** @deprecated use ROLES.ADMIN_EMPRESA */
export const LEGACY_ADMIN_ROLE = "AdminSystem";

function decodeBase64Url(segment) {
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(decodeBase64Url(payload));
  } catch {
    return null;
  }
}

function getClaimFromPayload(payload, keys) {
  if (!payload) return null;
  for (const key of keys) {
    const value = payload[key];
    if (value != null && value !== "") {
      return Array.isArray(value) ? value[0] : value;
    }
  }
  return null;
}

export function normalizeRole(role) {
  if (!role) return null;
  if (role === LEGACY_ADMIN_ROLE) return ROLES.ADMIN_EMPRESA;
  return role;
}

export function getRoleFromToken(token = getToken()) {
  const raw = getClaimFromPayload(decodeToken(token), ROLE_CLAIM_KEYS);
  return normalizeRole(raw);
}

export function getEmpresaIdFromToken(token = getToken()) {
  const value = getClaimFromPayload(decodeToken(token), EMPRESA_ID_CLAIM_KEYS);
  if (value == null || value === "") return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? value : parsed;
}

export function getEmpresaSlugFromToken(token = getToken()) {
  return getClaimFromPayload(decodeToken(token), EMPRESA_SLUG_CLAIM_KEYS);
}

export function isSuperAdmin(token = getToken()) {
  return getRoleFromToken(token) === ROLES.SUPER_ADMIN;
}

export function isAdminEmpresa(token = getToken()) {
  return getRoleFromToken(token) === ROLES.ADMIN_EMPRESA;
}

export function isCliente(token = getToken()) {
  return getRoleFromToken(token) === ROLES.CLIENTE;
}

export function isTokenExpired(token = getToken()) {
  if (!token) return true;
  const payload = decodeToken(token);
  if (!payload?.exp) return false;
  return payload.exp * 1000 < Date.now();
}

export function roleMatches(requiredRole, userRole) {
  const normalized = normalizeRole(userRole);
  const required = normalizeRole(requiredRole);
  if (!required) return true;
  if (Array.isArray(requiredRole)) {
    return requiredRole.some((r) => normalizeRole(r) === normalized);
  }
  return normalized === required;
}

const ROLE_CLAIM_URI =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const ROLE_CLAIM_KEYS = [
  "role", // JwtSecurityTokenHandler mapeia ClaimTypes.Role para "role" no payload
  ROLE_CLAIM_URI,
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role",
  "perfil",
];

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

export function getRoleFromToken(token = getToken()) {
  if (!token) return null;
  const payload = decodeToken(token);
  if (!payload) return null;

  for (const key of ROLE_CLAIM_KEYS) {
    const value = payload[key];
    if (value) return Array.isArray(value) ? value[0] : value;
  }

  return null;
}

export function isTokenExpired(token = getToken()) {
  if (!token) return true;
  const payload = decodeToken(token);
  if (!payload?.exp) return false;
  return payload.exp * 1000 < Date.now();
}

export function tenantBase(slug) {
  if (!slug) return "";
  return `/e/${slug}`;
}

export function tenantPath(slug, segment = "") {
  const base = tenantBase(slug);
  if (!segment) return base || "/";
  const path = segment.startsWith("/") ? segment : `/${segment}`;
  return `${base}${path}`;
}

export function loginPathForRole(role, slug) {
  if (role === "SuperAdmin") return "/";
  if (slug) return tenantPath(slug, "login");
  return "/";
}

export function homePathAfterLogin(role, slug) {
  if (role === "SuperAdmin") return "/super-admin";
  if (role === "AdminEmpresa" && slug) return tenantPath(slug, "admin");
  if (role === "Cliente" && slug) return tenantPath(slug, "cliente");
  return "/";
}

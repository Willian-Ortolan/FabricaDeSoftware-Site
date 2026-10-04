export const DEFAULT_EMPRESA_SLUG = "target";
export const DEFAULT_ERP_URL = "https://erp.targetpulverizacao.com.br";

export const PUBLIC_ROUTE_PATHS = {
  home: "/",
  servicos: "/servicos",
  sobreNos: "/SobreNos",
  mapeamento: "/mapeamento",
  pulverizacao: "/pulverizacao",
  contratar: "/contratar",
};

export const PUBLIC_ROUTES = Object.values(PUBLIC_ROUTE_PATHS);

export function resolvePublicConfig(env = {}) {
  const empresaSlug = env.VITE_EMPRESA_SLUG?.trim() || DEFAULT_EMPRESA_SLUG;
  const erpUrl = (env.VITE_ERP_URL?.trim() || DEFAULT_ERP_URL).replace(/\/+$/, "");

  return {
    empresaSlug,
    erpUrl,
    erpLoginUrl: `${erpUrl}/login`,
  };
}

export const publicConfig = resolvePublicConfig(import.meta.env);

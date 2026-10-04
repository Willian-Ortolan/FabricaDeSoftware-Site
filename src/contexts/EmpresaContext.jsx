import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Alert, Spin } from "antd";
import { getEmpresaPublica } from "../services/publicEmpresa.service";
import { publicConfig } from "../config";

const EmpresaContext = createContext(null);

export function useEmpresa() {
  const ctx = useContext(EmpresaContext);
  if (!ctx) {
    throw new Error("useEmpresa deve ser usado dentro de EmpresaProvider");
  }
  return ctx;
}

export function useEmpresaOptional() {
  return useContext(EmpresaContext);
}

export function EmpresaProvider({ children }) {
  const slug = publicConfig.empresaSlug;
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getEmpresaPublica(slug);
        if (!cancelled) setEmpresa(data);
      } catch (err) {
        if (!cancelled) {
          let mensagem =
            err.response?.data?.mensagem ||
            err.response?.data?.message ||
            err.message;

          if (!err.response) {
            mensagem =
              `Não foi possível conectar à API (${import.meta.env.VITE_API_URL || "https://localhost:7289/api"}). Verifique se o serviço está disponível.`;
          } else if (err.response.status === 404) {
            mensagem =
              mensagem ||
              "Empresa não encontrada ou indisponível.";
          }

          setError(mensagem || "Empresa não encontrada ou indisponível.");
          setEmpresa({
            nome: "Target Pulverização",
            slug,
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const value = useMemo(() => {
    const nome =
      empresa?.nome ?? empresa?.Nome ?? empresa?.empresaNome ?? "AgroDrones";
    const logoUrl = empresa?.logoUrl ?? empresa?.LogoUrl ?? null;
    const corPrimaria =
      empresa?.corPrimaria ?? empresa?.CorPrimaria ?? "#1d4ed8";
    const corSecundaria =
      empresa?.corSecundaria ?? empresa?.CorSecundaria ?? "#0f172a";
    const precos = empresa?.precos ?? empresa?.Precos ?? null;

    return {
      slug,
      empresa,
      nome,
      logoUrl,
      corPrimaria,
      corSecundaria,
      precos,
      loading,
      error,
      path: (segment = "") => {
        if (!segment) return "/";
        return segment.startsWith("/") ? segment : `/${segment}`;
      },
    };
  }, [slug, empresa, loading, error]);

  if (loading) {
    return (
      <div style={{ padding: 80, textAlign: "center" }}>
        <Spin size="large" tip="Carregando empresa..." />
      </div>
    );
  }

  return (
    <EmpresaContext.Provider value={value}>
      {error ? (
        <div style={{ padding: "16px 16px 0", maxWidth: 960, margin: "0 auto" }}>
          <Alert
            type="warning"
            showIcon
            message="Dados da empresa indisponíveis"
            description={`${error} O site institucional continua disponível.`}
          />
        </div>
      ) : null}
      {children}
    </EmpresaContext.Provider>
  );
}

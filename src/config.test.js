import { describe, expect, it } from "vitest";
import {
  DEFAULT_EMPRESA_SLUG,
  DEFAULT_ERP_URL,
  PUBLIC_ROUTES,
  resolvePublicConfig,
} from "./config";

describe("resolvePublicConfig", () => {
  it("uses production-safe defaults when variables are absent", () => {
    expect(resolvePublicConfig({})).toEqual({
      empresaSlug: DEFAULT_EMPRESA_SLUG,
      erpUrl: DEFAULT_ERP_URL,
      erpLoginUrl: `${DEFAULT_ERP_URL}/login`,
    });
  });

  it("uses configured values and removes a trailing slash from the ERP URL", () => {
    expect(
      resolvePublicConfig({
        VITE_EMPRESA_SLUG: "outra-empresa",
        VITE_ERP_URL: "https://erp.example.com/",
      }),
    ).toEqual({
      empresaSlug: "outra-empresa",
      erpUrl: "https://erp.example.com",
      erpLoginUrl: "https://erp.example.com/login",
    });
  });
});

describe("PUBLIC_ROUTES", () => {
  it("contains only the institutional routes", () => {
    expect(PUBLIC_ROUTES).toEqual([
      "/",
      "/servicos",
      "/SobreNos",
      "/mapeamento",
      "/pulverizacao",
      "/contratar",
    ]);
  });
});

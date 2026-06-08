import api from "./api";

/** @deprecated Prefer solicitarOrcamentoPublico com slug em rotas /e/:slug */
export async function solicitarOrcamento(payload) {
  const { data } = await api.post("/contato", payload);
  return data;
}

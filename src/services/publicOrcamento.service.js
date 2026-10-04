import api from "./api";

export async function solicitarOrcamentoPublico(slug, payload) {
  const { data } = await api.post(`/public/empresa/${slug}/orcamento`, payload);
  return data;
}

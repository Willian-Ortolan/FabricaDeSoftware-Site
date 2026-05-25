import api from "./api";

export async function getResumo() {
  const { data } = await api.get("/cliente/resumo");
  return data;
}

export async function getPropriedades() {
  const { data } = await api.get("/cliente/propriedades");
  return data;
}

export function buildPropriedadeFormData(values, imagemFile) {
  const formData = new FormData();
  formData.append("nome", values.nome);
  formData.append("cidade", values.cidade);
  formData.append("area", String(values.area));
  if (values.cultura) formData.append("cultura", values.cultura);
  if (values.observacoes) formData.append("observacoes", values.observacoes);
  if (imagemFile) formData.append("imagem", imagemFile);
  return formData;
}

export async function getPropriedade(id) {
  const { data } = await api.get(`/cliente/propriedades/${id}`);
  return data;
}

export async function criarPropriedade(formData) {
  const { data } = await api.post("/cliente/propriedades", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function atualizarPropriedade(id, formData) {
  const { data } = await api.put(`/cliente/propriedades/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function getSolicitacoes() {
  const { data } = await api.get("/cliente/solicitacoes");
  return data;
}

export async function criarSolicitacao(payload) {
  const { data } = await api.post("/cliente/solicitacoes", payload);
  return data;
}

export async function atualizarSolicitacao(id, payload) {
  const { data } = await api.put(`/cliente/solicitacoes/${id}`, payload);
  return data;
}

export async function excluirSolicitacao(id) {
  const { data } = await api.delete(`/cliente/solicitacoes/${id}`);
  return data;
}

export async function aprovarSolicitacaoCliente(id) {
  const { data } = await api.patch(`/cliente/solicitacoes/${id}/aprovar`);
  return data;
}

export async function getHistoricoOrcamentos() {
  const { data } = await api.get("/cliente/historico-orcamentos");
  return data;
}

export async function getHistoricoOperacoes(tipo) {
  const { data } = await api.get("/cliente/historico-operacoes", {
    params: { tipo },
  });
  return data;
}

export async function getProximasOperacoes() {
  const { data } = await api.get("/cliente/proximas-operacoes");
  return data;
}

import api from "./api";

export async function getDashboard() {
  const { data } = await api.get("/admin/dashboard");
  return data;
}

export async function getOrcamentos(status) {
  const { data } = await api.get("/admin/orcamentos", {
    params: status ? { status } : undefined,
  });
  return data;
}

export async function getOrcamentosAgendados(mes, ano) {
  const params = {};
  if (mes != null && ano != null) {
    params.mes = mes;
    params.ano = ano;
  }
  const { data } = await api.get("/admin/orcamentos/agendados", { params });
  return data;
}

export async function aprovarOrcamento(id) {
  const { data } = await api.patch(`/admin/orcamentos/${id}/aprovar`);
  return data;
}

export async function rejeitarOrcamento(id) {
  const { data } = await api.patch(`/admin/orcamentos/${id}/rejeitar`);
  return data;
}

export async function getGraficos() {
  const { data } = await api.get("/admin/dashboard/graficos");
  return data;
}

export async function ajustarOrcamento(id, payload) {
  const { data } = await api.put(`/admin/orcamentos/${id}/ajustar`, payload);
  return data;
}

export async function reagendarOrcamento(id, dataAgendada) {
  const { data } = await api.patch(`/admin/orcamentos/${id}/reagendar`, {
    dataAgendada,
  });
  return data;
}

export async function getUsuarios() {
  const { data } = await api.get("/admin/usuarios");
  return data;
}

export async function criarUsuario(payload) {
  const { data } = await api.post("/admin/usuarios", payload);
  return data;
}

export async function ativarUsuario(id) {
  const { data } = await api.patch(`/admin/usuarios/${id}/ativar`);
  return data;
}

export async function desativarUsuario(id) {
  const { data } = await api.patch(`/admin/usuarios/${id}/desativar`);
  return data;
}

export async function alterarSenhaUsuario(id, novaSenha) {
  const { data } = await api.put(`/admin/usuarios/${id}/senha`, { novaSenha });
  return data;
}

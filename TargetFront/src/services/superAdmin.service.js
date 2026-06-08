import api from "./api";

export async function listEmpresas() {
  const { data } = await api.get("/super-admin/empresas");
  return data;
}

export async function criarEmpresa(payload) {
  const { data } = await api.post("/super-admin/empresas", payload);
  return data;
}

export async function ativarEmpresa(id) {
  const { data } = await api.patch(`/super-admin/empresas/${id}/ativar`);
  return data;
}

export async function desativarEmpresa(id) {
  const { data } = await api.patch(`/super-admin/empresas/${id}/desativar`);
  return data;
}

export async function criarAdminEmpresa(empresaId, payload) {
  const { data } = await api.post(
    `/super-admin/empresas/${empresaId}/admins`,
    payload,
  );
  return data;
}

export async function listAdminsEmpresa(empresaId) {
  const { data } = await api.get(`/super-admin/empresas/${empresaId}/admins`);
  return data;
}

export async function resetSenhaUsuario(usuarioId, novaSenha) {
  const { data } = await api.put(`/super-admin/usuarios/${usuarioId}/senha`, {
    novaSenha,
  });
  return data;
}

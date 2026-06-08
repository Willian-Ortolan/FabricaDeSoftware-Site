import api from "./api";

export async function getEmpresaAdmin() {
  const { data } = await api.get("/admin/empresa");
  return data;
}

export async function updateEmpresaAdmin(payload) {
  const { data } = await api.put("/admin/empresa", payload);
  return data;
}

export async function getPrecosAdmin() {
  const { data } = await api.get("/admin/precos");
  return data;
}

export async function updatePrecosAdmin(payload) {
  const { data } = await api.put("/admin/precos", payload);
  return data;
}

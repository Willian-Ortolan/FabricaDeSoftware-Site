import api from "./api";

export async function getEmpresaPublica(slug) {
  const { data } = await api.get(`/public/empresa/${slug}`);
  return data;
}

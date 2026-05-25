import api from "./api";

export async function enviarContato(payload) {
  const { data } = await api.post("/contato", payload);
  return data;
}

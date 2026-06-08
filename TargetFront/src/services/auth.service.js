import api from "./api";
import { setToken } from "../utils/auth";

export async function login(email, senha, empresaSlug) {
  const body = { email, senha };
  if (empresaSlug) {
    body.empresaSlug = empresaSlug;
  }
  const { data } = await api.post("/auth/login", body);
  const token = data.token ?? data.Token;
  if (!token) {
    throw new Error("Token não retornado pela API.");
  }
  setToken(token);
  return { token, ...data };
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

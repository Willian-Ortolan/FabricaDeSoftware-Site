import api from "./api";
import { setToken } from "../utils/auth";

export async function login(email, senha) {
  const { data } = await api.post("/auth/login", { email, senha });
  const token = data.token ?? data.Token;
  if (!token) {
    throw new Error("Token não retornado pela API.");
  }
  setToken(token);
  return { token };
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

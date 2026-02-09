import api from "./client";

export const login = async (payload) => {
  const { data } = await api.post("/users/login", payload);
  return data; // { token, user, restricted, ... }
};

export async function register(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function logout() {
  const { data } = await api.post("/auth/logout");
  return data;
}

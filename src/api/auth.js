import api from "./client";

export const login = async (payload) => {
  const { data } = await api.post("/users/login", payload);
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/users/logout");
  return data;
};

import api from "./client";

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data; // { message, count, products }
};

import api from "./client";

export async function getProducts() {
  const { data } = await api.get("/products");
  return data; // { message, count, products }
}

export async function addProduct(payload) {
  const { data } = await api.post("/products", payload);
  return data; // { message, product }
}

export async function setProductAvailability(key, availability) {
  const { data } = await api.put(`/products/${key}/availability`, { availability });
  return data;
}

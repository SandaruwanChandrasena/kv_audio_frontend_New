import api from "./axios.js";

export const registerApi = (payload) => api.post("/auth/register", payload);
export const loginApi = (payload) => api.post("/auth/login", payload);
export const logoutApi = () => api.post("/auth/logout");
export const meApi = () => api.get("/profile/me"); // change if your endpoint differs

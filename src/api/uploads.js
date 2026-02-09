import api from "./client";

export async function uploadImage(file) {
  const form = new FormData();
  form.append("image", file); // must match multer field name

  const { data } = await api.post("/uploads/image", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data; // { url, path, message }
}

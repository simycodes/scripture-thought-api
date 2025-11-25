import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1/scripture-thoughts",
});

export const getThoughts = () => API.get("/get-all-thoughts");
export const createThought = (thought) => API.post("/create-thought", thought);
export const likeThought = (id, user) => API.post(`/like-thought/${id}`, { user });
export const unlikeThought = (id, user) => API.post(`/unlike-thought/${id}`, { user });
export const deleteThought = (id, user) => API.delete(`/delete-thought/${id}?user=${user}`);

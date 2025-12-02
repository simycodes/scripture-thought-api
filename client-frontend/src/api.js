import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1/scripture-thoughts",
});

export const getThoughts = () => API.get("/get-all-thoughts");
export const getSingleThought = (id) => API.get(`/get-thought/${id}`);
export const getUserThoughts = () => API.get("/get-all-thoughts-user");
export const createThought = (thought) => API.post("/create-thought", thought);
export const likeThought = (id) => API.post(`/like-thought/${id}`);
export const unlikeThought = (id) => API.post(`/unlike-thought/${id}`);
export const deleteThought = (id) => API.delete(`/delete-thought/${id}`);
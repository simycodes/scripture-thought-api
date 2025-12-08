import customFetch from "../utils/customFetch";

export { default as DashboardLayout } from "./DashboardLayout";
export { default as Landing } from "./Landing";
export { default as HomeLayout } from "./HomeLayout";
export { default as Register } from "./Register";
export { default as Login } from "./Login";
export { default as Error } from "./Error";
export { default as AddScriptureThought } from "./AddScriptureThought";
export { default as EditScriptureThought } from "./EditScriptureThought";
export { default as AllScriptureThoughts } from "./AllScriptureThoughts";
export { default as MyScriptureThoughts } from "./MyScriptureThoughts";
export { default as Profile } from "./Profile";
export { default as EditProfile } from "./EditProfile";
export { default as ViewAndAddComments } from "./ViewAndAddComments";
export { default as EditComment } from "./EditComment";

export const getCurrentUser = () => customFetch.get("/users/current-user");
export const logout = () => customFetch.get("/auth/logout");

export const createThought = (data) => customFetch.post("/scripture-thoughts/create-thought", data);
export const getThought = (id) => customFetch.get(`/scripture-thoughts/get-thought/${id}`);
export const updateThought = (id, data) => customFetch.patch(`/scripture-thoughts/update-thought/${id}`, data);
export const deleteThought = (id) => customFetch.delete(`/scripture-thoughts/delete-thought/${id}`);
export const getUserThoughts = () => customFetch.get("/scripture-thoughts/get-user-thoughts");
export const getAllThoughts = () => customFetch.get("/scripture-thoughts/get-all-scripture-thoughts");

export const getCommentsForThought = (thoughtId) => customFetch.get(`/comments/${thoughtId}`);
export const createComment = (data) => customFetch.post("/comments", data);
export const updateComment = (id, data) => customFetch.patch(`/comments/${id}`, data);
export const getSingleComment = (id) => customFetch.get(`/comments/get-single-comment/${id}`);
export const deleteComment = (id) => customFetch.delete(`/comments/${id}`);

export const getUsersForThoughts = () => customFetch.get("/users/get-users-for-scripture-thoughts");
export const getUserForSingleThought = (id) => customFetch.get(`/users/get-user-for-single-scripture-thought/${id}`);

export const updateProfile = (data) => customFetch.patch("/users/update-user", data);

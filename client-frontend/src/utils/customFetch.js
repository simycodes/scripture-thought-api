import axios from "axios";

// This is a Axios Custom Instance
const customFetch = axios.create({
  baseURL: "/api/v1",
});

export default customFetch;

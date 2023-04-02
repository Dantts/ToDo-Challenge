import axios from "axios";

let tokenStorage = sessionStorage.getItem("token");

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    Authorization: `Bearer ${tokenStorage}`,
  },
});

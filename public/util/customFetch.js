import axios from "axios";

export const customFetch = axios.create({
  baseURL: "http://192.168.1.7:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

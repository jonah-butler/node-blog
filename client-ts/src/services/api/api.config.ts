import axios from "axios";

const api = axios.create({
  baseURL: "https://api.com",
});

export { api };

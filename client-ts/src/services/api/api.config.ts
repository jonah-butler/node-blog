import axios from "axios";

const api = axios.create({
  baseURL: 'https://jonahbutler-dev.herokuapp.com'
});

export { api };

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jonahbutler.dev',
  // baseURL: 'http://localhost:8080', // new local
  // baseURL: 'https://jonahbutler-dev.herokuapp.com', // old prod
  // baseURL: 'http://localhost:4000', // old local
});

export { api };

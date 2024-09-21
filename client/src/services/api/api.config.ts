import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jonahbutler-dev.herokuapp.com',
  // baseURL: 'http://localhost:4000',
});

export { api };

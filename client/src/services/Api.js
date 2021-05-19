import axios from 'axios';

export default () => axios.create({ baseURL: 'https://jonahbutler-dev.herokuapp.com/' });

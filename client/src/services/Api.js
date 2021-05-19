import axios from 'axios';

export default () => axios.create({ baseURL: 'https://www.jonahbutler.dev/' });

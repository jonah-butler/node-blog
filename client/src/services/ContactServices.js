import Api from '@/services/Api';

export default {
  send(body) {
    return Api().post('email', body);
  },
};

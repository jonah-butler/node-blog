import Api from '@/services/Api';

export default {
  register(credentials) {
    return Api().post('register', credentials);
  },
  registerGet() {
    return Api().get('register');
  },
};

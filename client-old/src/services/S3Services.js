import Api from '@/services/Api';
import store from '@/store/store';

const config = {
  headers: {
    token: store.state.token,
  },
};

export default {
  async deleteImg(s3uri) {
    return Api().post('s3/delete', s3uri, config);
  },
};

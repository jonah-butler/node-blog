import Api from '@/services/Api';

export default {
  deleteImg(s3uri) {
    return Api().post('s3/delete', s3uri);
  },
};

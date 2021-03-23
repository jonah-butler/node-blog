import Api from '@/services/Api';

export default {
  show(slug) {
    return Api().post('blog', slug);
  },
  like(data) {
    return Api().post('blog/like', data);
  },
  delete(slug) {
    return Api().delete(`blog/delete/${slug.slug}`, slug);
  },
};

import Api from '@/services/Api';
import store from '@/store/store';

export default {
  draft(slug) {
    return Api().post(`/drafts/${slug}`, slug);
  },
  drafts(user) {
    return Api().post('/drafts', user);
  },
  show(slug) {
    return Api().post('blog', slug);
  },
  like(data) {
    return Api().post('blog/like', data);
  },
  validation(creds) {
    return Api().post('/validation', creds);
  },
  delete(slug) {
    return Api().delete(`blog/delete/${slug.slug}`, slug);
  },
  new(blog) {
    return Api().post('/', blog);
  },
  search(query) {
    return Api().post('search', query);
  },
  uploadImage(file) {
    const config = {
      headers: {
        Authorization: `Bearer ${store.state.token}`,
      },
    };
    const formData = new FormData();
    formData.append('image', file);
    return Api().post(`/blog/image/${store.state.user._id}`, formData, config);
  },
};

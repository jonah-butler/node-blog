import Api from '@/services/Api';

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
};

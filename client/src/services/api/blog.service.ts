import { useUserStore } from '@/stores/user';
import {
  type AffectedResponse,
  type Blog,
  type BlogResponse,
  type GetEditBlogPayload,
  type NewBlogPayload,
  type NewBlogPayloadWithUser,
  type SingleBlog,
} from '@/types/services';
import { ServiceError } from '@/utilities/error';
import { storeToRefs } from 'pinia';
import { packageRecordIntoFormData, serviceErrorHandler } from '../utilities';
import { api } from './api.config';
import { getBearerTokenHeader } from './headers.config';

const BLOG_SERVICE_ERRORS = {
  GET_BLOGS: 'failed to get blogs',
  GET_BLOG: 'failed to get blog',
  GET_DRAFT: 'failed to get draft',
  GET_DRAFTS: 'failed to get drafts',
  GET_EDIT_BLOG: 'failed to get blog for editing',
  LIKE_BLOG: 'failed to like blog',
  CREATE_BLOG: 'failed to create a new blog',
  UPLOAD_IMAGE: 'failed to upload image',
  UPDATE_BLOG: 'failed to update blog',
  DELETE_IMAGE: 'failed to delete blog image',
  DELETE_BLOG: 'failed to delete blog',
  GET_RANDOM_BLOG: 'failed to get a random blog',
  SEARCH_BLOGS: 'failed to search blogs',
  GET_CATEGORIES: 'failed to get categories',
};

type BlogErrors = keyof typeof BLOG_SERVICE_ERRORS;
export class BlogServiceError extends ServiceError<BlogErrors> {}

// strongly type this service eventually
// each service method should pass in a corresponding interface/typed value
// and any payload requiring formData should be setup with a helper in this function
// also create error class so the return types are not the generic AxiosResponse, but
// rather the exact type needed.
const BlogService = {
  async getBlogs(offset = 0): Promise<BlogResponse> {
    try {
      const response = await api.get(`/blog?offset=${offset}`);
      return response.data as BlogResponse;
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.GET_BLOGS);
      throw new BlogServiceError({ name: 'GET_BLOGS', message });
    }
  },

  async getBlog(slug: string): Promise<SingleBlog> {
    try {
      const response = await api.get(`/blog/${slug}`);
      return response.data as SingleBlog;
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.GET_BLOG);
      throw new BlogServiceError({ name: 'GET_BLOG', message });
    }
  },

  // fis this garbage
  async getDraft(slug: string): Promise<SingleBlog> {
    try {
      const response = await api.get(
        `blog/drafts/${slug}`,
        getBearerTokenHeader(),
      );
      return response.data as SingleBlog;
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.GET_DRAFT);
      throw new BlogServiceError({ name: 'GET_DRAFT', message });
    }
  },

  // fis this garbage
  async getDrafts(offset: number): Promise<BlogResponse> {
    try {
      const response = await api.get(
        `/blog/drafts?offset=${offset}`,
        getBearerTokenHeader(),
      );
      return response.data as BlogResponse;
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.GET_DRAFTS);
      throw new BlogServiceError({ name: 'GET_DRAFTS', message });
    }
  },

  async newBlog(payload: NewBlogPayload): Promise<Blog> {
    const userStore = useUserStore();
    const { getUser } = storeToRefs(userStore);

    const payladWithUser: NewBlogPayloadWithUser = {
      ...structuredClone(payload),
      user: getUser.value,
    };

    const data = packageRecordIntoFormData(payladWithUser);

    try {
      const response = await api.post('/blog', data, getBearerTokenHeader());
      if (response.data.blog._id) {
        return response.data.blog as Blog;
      }
      throw new BlogServiceError({
        name: 'CREATE_BLOG',
        message: BLOG_SERVICE_ERRORS.CREATE_BLOG,
      });
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.CREATE_BLOG);
      throw new BlogServiceError({ name: 'CREATE_BLOG', message });
    }
  },

  async getEditBlog(payload: GetEditBlogPayload): Promise<Blog> {
    try {
      const response = await api.post('/blog/edit', payload);
      if (response.data) {
        return response.data as Blog;
      }
      throw new BlogServiceError({
        name: 'GET_EDIT_BLOG',
        message: BLOG_SERVICE_ERRORS.GET_EDIT_BLOG,
      });
    } catch (err) {
      const message = serviceErrorHandler(
        err,
        BLOG_SERVICE_ERRORS.GET_EDIT_BLOG,
      );
      throw new BlogServiceError({ name: 'GET_EDIT_BLOG', message });
    }
  },

  // update eventually
  async updateBlog(payload: NewBlogPayload, blogID: string): Promise<Blog> {
    payload.id = blogID;

    const payloadClone: NewBlogPayload = {
      ...structuredClone(payload),
    };

    const data = packageRecordIntoFormData(payloadClone);

    try {
      const response = await api.put(
        `/blog/${blogID}/edit`,
        data,
        getBearerTokenHeader(),
      );

      if ('blog' in response.data) {
        return response.data.blog as Blog;
      }

      throw new BlogServiceError({
        name: 'UPDATE_BLOG',
        message: BLOG_SERVICE_ERRORS.UPDATE_BLOG,
      });
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.UPDATE_BLOG);
      throw new BlogServiceError({ name: 'UPDATE_BLOG', message });
    }
  },

  async likeBlog(blogID: string): Promise<SingleBlog> {
    try {
      const response = await api.post(`/blog/${blogID}/like`);
      return response.data as SingleBlog;
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.LIKE_BLOG);
      throw new BlogServiceError({ name: 'LIKE_BLOG', message });
    }
  },

  async uploadImage(file: File): Promise<string> {
    const userStore = useUserStore();
    const { getUserId } = storeToRefs(userStore);

    const data = {
      image: file,
    };
    const payload = packageRecordIntoFormData(data);
    try {
      const response = await api.post(
        `/blog/image/${getUserId.value}`,
        payload,
        getBearerTokenHeader(),
      );
      return response.data.location;
    } catch (err) {
      const message = serviceErrorHandler(
        err,
        BLOG_SERVICE_ERRORS.UPLOAD_IMAGE,
      );
      throw new BlogServiceError({ name: 'UPLOAD_IMAGE', message });
    }
  },

  async deleteFeaturedImage(blogID: string): Promise<AffectedResponse> {
    try {
      const response = await api.delete(
        `/blog/featured-image/${blogID}`,
        getBearerTokenHeader(),
      );
      return response.data as AffectedResponse;
    } catch (err) {
      const message = serviceErrorHandler(
        err,
        BLOG_SERVICE_ERRORS.DELETE_IMAGE,
      );
      throw new BlogServiceError({ name: 'DELETE_IMAGE', message });
    }
  },

  async getRandomBlog(): Promise<SingleBlog> {
    try {
      const response = await api.get('/blog/random');
      return response.data as SingleBlog;
    } catch (err) {
      const message = serviceErrorHandler(
        err,
        BLOG_SERVICE_ERRORS.GET_RANDOM_BLOG,
      );
      throw new BlogServiceError({
        name: 'GET_RANDOM_BLOG',
        message,
      });
    }
  },

  async searchBlogs(query: string, offset: number): Promise<BlogResponse> {
    try {
      const response = await api.get(`/blog/search/${query}?offset=${offset}`);
      return response.data as BlogResponse;
    } catch (err) {
      const message = serviceErrorHandler(
        err,
        BLOG_SERVICE_ERRORS.SEARCH_BLOGS,
      );
      throw new BlogServiceError({
        name: 'SEARCH_BLOGS',
        message,
      });
    }
  },

  async getCategories(category: string, offset: number): Promise<BlogResponse> {
    try {
      const response = await api.get(
        `/blog/category/${category}?offset=${offset}`,
      );
      return response.data as BlogResponse;
    } catch (err) {
      const message = serviceErrorHandler(
        err,
        BLOG_SERVICE_ERRORS.GET_CATEGORIES,
      );
      throw new BlogServiceError({
        name: 'GET_CATEGORIES',
        message,
      });
    }
  },

  async deleteBlog(id: string): Promise<boolean> {
    try {
      const response = await api.delete(`/blog/${id}`, getBearerTokenHeader());
      return response.data.affected > 0;
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.DELETE_BLOG);
      throw new BlogServiceError({
        name: 'DELETE_BLOG',
        message,
      });
    }
  },

  async getUserBlogs(id: string, offset = 0): Promise<BlogResponse> {
    try {
      const response = await api.get(`/blog/user/${id}?offset=${offset}`);
      return response.data;
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.GET_BLOGS);
      throw new BlogServiceError({
        message,
        name: 'GET_BLOGS',
      });
    }
  },
};

export { BLOG_SERVICE_ERRORS, BlogService };

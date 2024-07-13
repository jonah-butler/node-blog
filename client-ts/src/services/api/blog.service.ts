import {
  type NewBlogPayload,
  type NewBlogPayloadWithUser,
  type Blog,
  type SingleBlog,
  type LikedBlogPayload,
  type GetEditBlogPayload,
  type DeleteImagePayload,
} from '@/types/services';
import { serviceErrorHandler, packageRecordIntoFormData } from '../utilities';
import { api } from './api.config';
import { HEADERS, TOKEN_HEADER } from './headers.config';
import { ServiceError } from '@/utilities/error';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { getUserId, getUser } = storeToRefs(userStore);

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
  GET_RANDOM_BLOG: 'failed to get a random blog',
};

type BlogErrors = keyof typeof BLOG_SERVICE_ERRORS;
export class BlogServiceError extends ServiceError<BlogErrors> {}

// strongly type this service eventually
// each service method should pass in a corresponding interface/typed value
// and any payload requiring formData should be setup with a helper in this function
// also create error class so the return types are not the generic AxiosResponse, but
// rather the exact type needed.
const BlogService = {
  async getBlogs(): Promise<Blog[]> {
    try {
      const response = await api.get('/');
      return response.data as Blog[];
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.GET_BLOGS);
      throw new BlogServiceError({ name: 'GET_BLOGS', message });
    }
  },

  async getBlog(slug: string): Promise<SingleBlog> {
    try {
      const response = await api.post('/blog', { slug });
      return response.data as SingleBlog;
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.GET_BLOG);
      throw new BlogServiceError({ name: 'GET_BLOG', message });
    }
  },

  // fis this garbage
  async getDraft(slug: string): Promise<SingleBlog> {
    try {
      const response = await api.post(`/drafts/${slug}`, { slug });
      return response.data as SingleBlog;
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.GET_DRAFT);
      throw new BlogServiceError({ name: 'GET_DRAFT', message });
    }
  },

  // fis this garbage
  async getDrafts(): Promise<Blog[]> {
    try {
      const response = await api.post(`/drafts`, { user: getUser.value });
      return response.data as Blog[];
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.GET_DRAFTS);
      throw new BlogServiceError({ name: 'GET_DRAFTS', message });
    }
  },

  async newBlog(payload: NewBlogPayload): Promise<Blog> {
    const payladWithUser: NewBlogPayloadWithUser = {
      ...structuredClone(payload),
      user: getUser.value,
    };

    const data = packageRecordIntoFormData(payladWithUser);

    try {
      const response = await api.post('/', data);
      if (response.data._id) {
        return response.data as Blog;
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
  async updateBlog(payload: NewBlogPayload): Promise<Blog> {
    const payloadClone: NewBlogPayload = {
      ...structuredClone(payload),
    };

    const data = packageRecordIntoFormData(payloadClone);

    try {
      const response = await api.put('/blog/edit', data);

      if ('updatedBlog' in response.data) {
        return response.data.updatedBlog as Blog;
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

  async likeBlog(payload: LikedBlogPayload): Promise<Blog> {
    try {
      const response = await api.post('/blog/like', payload);
      return response.data as Blog;
    } catch (err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.LIKE_BLOG);
      throw new BlogServiceError({ name: 'LIKE_BLOG', message });
    }
  },

  async uploadImage(file: File): Promise<string> {
    const data = {
      image: file,
    };
    const payload = packageRecordIntoFormData(data);
    try {
      const response = await api.post(
        `/blog/image/${getUserId.value}`,
        payload,
        HEADERS,
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

  async deleteFeaturedImage(payload: DeleteImagePayload): Promise<Blog> {
    try {
      const response = await api.post('/s3/delete', payload, TOKEN_HEADER);
      return response.data as Blog;
    } catch (err) {
      const message = serviceErrorHandler(
        err,
        BLOG_SERVICE_ERRORS.DELETE_IMAGE,
      );
      throw new BlogServiceError({ name: 'DELETE_IMAGE', message });
    }
  },

  async getRandomBlog(): Promise<Blog> {
    try {
      const response = await api.get('/random');
      console.log(response);
      return response.data as Blog;
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
};

export { BlogService, BLOG_SERVICE_ERRORS };

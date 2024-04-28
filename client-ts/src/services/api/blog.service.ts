import { type AxiosResponse } from "axios";
import { type NewBlogPayload } from "@/types/services";
import { serviceErrorHandler, packageRecordIntoFormData } from "../utilities";
import { api } from "./api.config";
import { HEADERS } from "./headers.config";
import { ServiceError } from "@/utilities/error";

const BLOG_SERVICE_ERRORS = {
  CREATE_BLOG: "failed to create a new blog",
};

type BlogErrors = keyof typeof BLOG_SERVICE_ERRORS;
export class BlogServiceError extends ServiceError<BlogErrors> {}

// strongly type this service eventually
// each service method should pass in a corresponding interface/typed value
// and any payload requiring formData should be setup with a helper in this function
// also create error class so the return types are not the generic AxiosResponse, but
// rather the exact type needed.
const BlogService = {

  async newBlog(payload: NewBlogPayload): Promise<AxiosResponse> {
    // package form-data from payload
    const data = packageRecordIntoFormData(payload);
    try {
      return await api.post(`/blog/:userId`, data, HEADERS);
    } catch(err) {
      const message = serviceErrorHandler(err, BLOG_SERVICE_ERRORS.CREATE_BLOG);
      throw new BlogServiceError({name: "CREATE_BLOG", message});
    }
  },

}

export {
  BlogService,
  BLOG_SERVICE_ERRORS,
};
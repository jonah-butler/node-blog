import { type User } from '@/types/user';

export interface Blog {
  categories: string[];
  createdAt: string;
  featuredImageKey: string;
  featuredImageLocation: string;
  featuredImageTag: string;
  published: boolean;
  rating: number;
  sanitizedHTML: string;
  slug: string;
  text: string;
  title: string;
  updatedAt: string;
  views: number;
  _id: string;
}

export interface SingleBlog {
  nextPost: Blog | null;
  post1: Blog;
  previousPost: Blog | null;
  [key: string]: Blog | null;
}

export interface LikedBlogPayload {
  liked: boolean;
  rating: number;
  slug: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface NewBlogPayload {
  published: boolean;
  text: string;
  image: File | null;
  categories: string | string[];
  title: string;
  id?: string;
}

export interface NewBlogPayloadWithUser extends NewBlogPayload {
  user: User;
}

export interface GetEditBlogPayload {
  _id: string;
  user: User;
}

export interface DeleteImagePayload {
  blogId: string;
  uri: string;
}

export interface EmailBody {
  email: string;
  name: string;
  message: string;
}

export interface SearchQuery {
  query: string;
}

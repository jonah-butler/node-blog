import { type User } from '@/types/user';

export interface BlogResponse {
  blogs: Blog[];
  hasMore: boolean;
}

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
  author: BlogAuthor;
  _id: string;
}

export interface UserProfileResponse extends BlogAuthor {
  _id: string;
}

export interface BlogAuthor {
  email: string;
  username: string;
  profileImageLocation: string;
}

export interface AffectedResponse {
  affected: number;
}

export interface SingleBlog {
  blog: Blog;
  next: Blog | null;
  previous: Blog | null;
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
  slug?: string;
  generateSlug?: boolean;
  id?: string;
}

export interface NewBlogPayloadWithUser extends NewBlogPayload {
  user: User;
}

export interface GetEditBlogPayload {
  _id: string;
  user: User;
}

export interface EmailBody {
  from: string;
  message: string;
  subject: string;
  to: string;
}

export interface SearchQuery {
  query: string;
}

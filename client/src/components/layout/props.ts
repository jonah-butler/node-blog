import type { BlogAuthor } from '@/types/services';

export interface BlogShowImageHeaderProps {
  url: string;
  title: string;
  createdAt: string;
  rating: number;
  views: number;
  readTime: number;
  author: BlogAuthor;
}

export interface BlogShowImageHeader {
  data: BlogShowImageHeaderProps;
}

export interface LikeCount {
  rating: number;
  interactive: boolean;
}

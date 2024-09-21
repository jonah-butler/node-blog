export interface BlogShowImageHeaderProps {
  url: string;
  title: string;
  createdAt: string;
  rating: number;
  views: number;
  readTime: number;
}

export interface BlogShowImageHeader {
  data: BlogShowImageHeaderProps;
}

export interface LikeCount {
  rating: number;
  interactive: boolean;
}

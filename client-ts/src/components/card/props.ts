import { type Blog } from '@/types/services';

export interface ContentCardProps {
  blog: Blog;
}

export interface SecondaryContentCardProps extends ContentCardProps {
  index: number;
}

export interface AdminActionCardProps{
  route: string;
  title: string;
  description: string;
}

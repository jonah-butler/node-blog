export interface BlogLikeInjector {
  updateBlogRating: (liked: boolean) => Promise<boolean>;
}

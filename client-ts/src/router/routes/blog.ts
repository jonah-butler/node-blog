import { type RouteRecordRaw } from 'vue-router';

const blog_routes: RouteRecordRaw[] = [
  {
    // home view
    path: '/blog',
    alias: '/',
    name: 'home',
    component: () => import('../../views/BlogHome.vue'),
  },
  {
    // single blog view
    path: '/blog/:slug',
    name: 'blog',
    props: true,
    component: () => import('../../views/BlogView.vue'),
  },
  {
    path: '/random',
    name: 'random',
    component: () => import('../../views/RandomView.vue'),
  },
  {
    path: '/blog/category/:category',
    name: 'category',
    props: true,
    component: () => import('../../views/CategoryView.vue'),
  },
];
export { blog_routes };

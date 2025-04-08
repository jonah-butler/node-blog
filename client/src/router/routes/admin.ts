import { type RouteRecordRaw } from 'vue-router';

const admin_routes: RouteRecordRaw[] = [
  {
    // admin panel
    path: '/admin/:userId',
    name: 'admin home',
    meta: {
      auth: true,
      admin: true,
    },
    component: () => import('../../views/AdminHomeView.vue'),
  },
  {
    // new blog form
    path: '/admin/:userId/create/blog',
    name: 'admin new blog',
    meta: {
      auth: true,
      admin: true,
    },
    component: () => import('../../views/AdminBlogCreate.vue'),
  },
  {
    // admin drafts
    path: '/admin/:userId/drafts',
    name: 'admin drafts',
    meta: {
      auth: true,
      admin: true,
    },
    component: () => import('../../views/AdminDraftsView.vue'),
  },
  {
    // admin drafts
    path: '/admin/:userId/drafts/:slug',
    name: 'admin single draft view',
    props: true,
    meta: {
      auth: true,
      admin: true,
    },
    component: () => import('../../views/AdminDraftView.vue'),
  },
  {
    // admin posts
    path: '/admin/:userId/blog',
    name: 'admin posts',
    meta: {
      auth: true,
      admin: true,
    },
    component: () => import('../../views/AdminPostsView.vue'),
  },
  {
    // admin edit single blog
    path: '/admin/:userId/blog/edit/:slug',
    name: 'admin edit blog',
    props: true,
    meta: {
      auth: true,
      admin: true,
    },
    component: () => import('../../views/AdminBlogEditView.vue'),
  },
  {
    // admin edit single draft
    path: '/admin/:userId/drafts/edit/:slug',
    name: 'admin edit drafts',
    props: true,
    meta: {
      auth: true,
      admin: true,
    },
    component: () => import('../../views/AdminDraftEditView.vue'),
  },
];
export { admin_routes };

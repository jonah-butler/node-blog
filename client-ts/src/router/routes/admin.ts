import { type RouteRecordRaw } from 'vue-router';

const admin_routes: RouteRecordRaw[] = [
  {
    // admin panel
    path: '/admin/:userId',
    name: 'admin home',
    meta: {
      auth: true,
    },
    component: () => import('../../views/AdminHomeView.vue'),
  },
  // { // admin profile
  //   path: "/admin/:userId/profile",
  //   name: "admin profile",
  //   meta: {
  //     auth: true,
  //   },
  //   component: () => import("../../views/AboutView.vue"),
  // },
  {
    // new blog form
    path: '/admin/:userId/create/blog',
    name: 'admin new blog',
    meta: {
      auth: true,
    },
    component: () => import('../../views/AdminBlogCreate.vue'),
  },
  {
    // admin drafts
    path: '/admin/:userId/drafts',
    name: 'admin drafts',
    meta: {
      auth: true,
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
    },
    component: () => import('../../views/AdminDraftView.vue'),
  },
  {
    // admin posts
    path: '/admin/:userId/blog',
    name: 'admin posts',
    meta: {
      auth: true,
    },
    component: () => import('../../views/AdminPostsView.vue'),
  },
  {
    // admin edit single blog
    path: '/admin/:userId/edit/blog/:id',
    name: 'admin edit blog',
    props: true,
    meta: {
      auth: true,
    },
    component: () => import('../../views/AdminBlogEditView.vue'),
  },
  // { // admin profile
  //   path: "/admin/:userId/blog/:slug",
  //   name: "admin single blog",
  //   meta: {
  //     auth: true,
  //   },
  //   component: () => import("../../views/AboutView.vue"),
  // },
];
export { admin_routes };

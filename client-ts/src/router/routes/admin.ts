import { type RouteRecordRaw } from "vue-router"; 

 const admin_routes: RouteRecordRaw[] = [
  { // admin panel
    path: "/admin/:userId",
    name: "admin home",
    meta: {
      auth: true,
    },
    component: () => import("../../views/AboutView.vue"),
  },
  { // admin profile
    path: "/admin/:userId/profile",
    name: "admin profile",
    meta: {
      auth: true,
    },
    component: () => import("../../views/AboutView.vue"),
  },
  { // new blog form
    path: "/admin/:userId/create",
    name: "admin new blog",
    meta: {
      auth: true,
    },
    component: () => import("../../views/AboutView.vue"),
  },
  { // admin drafts
    path: "/admin/:userId/drafts",
    name: "admin drafts",
    meta: {
      auth: true,
    },
    component: () => import("../../views/AboutView.vue"),
  },
  { // admin posts
    path: "/admin/:userId/blog",
    name: "admin posts",
    meta: {
      auth: true,
    },
    component: () => import("../../views/AboutView.vue"),
  },
  { // admin edit single blog
    path: "/admin/:userId/edit/:slug",
    name: "admin edit blog",
    meta: {
      auth: true,
    },
    component: () => import("../../views/AboutView.vue"),
  },
  { // admin profile
    path: "/admin/:userId/blog/:slug",
    name: "admin single blog",
    meta: {
      auth: true,
    },
    component: () => import("../../views/AboutView.vue"),
  },
];
export { admin_routes };
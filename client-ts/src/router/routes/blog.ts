import { type RouteRecordRaw } from "vue-router"; 

 const blog_routes: RouteRecordRaw[] = [
  { // home view
    path: "/blog",
    alias: "/",
    name: "home",
    component: () => import("../../views/BlogHome.vue"),
  },
  // { // single blog view
  //   path: '/blog/:slug',
  //   name: 'blog',
  //   props: true,
  //   component: () => import("../../views/AboutView.vue"),
  // },
];
export { blog_routes };
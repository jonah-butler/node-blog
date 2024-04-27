import { type RouteRecordRaw } from "vue-router"; 

const category_routes: RouteRecordRaw[] = [
  { // all categories
    path: "/category",
    name: "category home",
    component: () => import("../../views/AboutView.vue"),
  },
  { // category slug view
    path: "/category/:slug",
    name: "category single",
    component: () => import("../../views/AboutView.vue"),
  },
];
export { category_routes };
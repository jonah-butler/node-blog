import { type RouteRecordRaw } from "vue-router"; 

 const authentication_routes: RouteRecordRaw[] = [
  { // login view
    path: "/login",
    name: "login",
    component: () => import("../../views/AboutView.vue"),
  },
  { // logout view
    path: "/logout",
    name: "logout",
    component: () => import("../../views/AboutView.vue"),
  },
  { //reset password request form
    path: "/reset-password",
    name: "reset password request",
    component: () => import("../../views/AboutView.vue"),
  },
  { // request password form
    path: "/reset-password/:hash",
    name: "reset password",
    component: () => import("../../views/AboutView.vue"),
  },
];
export { authentication_routes };
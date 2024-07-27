import { type RouteRecordRaw } from 'vue-router';

const general_routes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../../views/AboutView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../../views/ContactView.vue'),
  },
];

export { general_routes };

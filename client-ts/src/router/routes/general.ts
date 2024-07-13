import { type RouteRecordRaw } from 'vue-router';

const general_routes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../../views/AboutView.vue'),
  },
];

export { general_routes };

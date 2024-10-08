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
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../../views/ProjectsView.vue'),
  },
];

export { general_routes };

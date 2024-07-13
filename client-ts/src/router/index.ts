import { createRouter, createWebHistory } from 'vue-router';

// beforeEach route protection
import routeProtection from './protect';

// grouped routes
import { admin_routes } from './routes/admin';
import { authentication_routes } from './routes/authentication';
import { blog_routes } from './routes/blog';
import { category_routes } from './routes/category';
import { register_routes } from './routes/register';
import { general_routes } from './routes/general';

const routes = [
  ...admin_routes,
  ...authentication_routes,
  ...blog_routes,
  ...category_routes,
  ...register_routes,
  ...general_routes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
    };
  },
});

router.beforeEach(routeProtection);

export default router;

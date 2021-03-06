import Vue from 'vue';
import store from '@/store/store';
import VueRouter from 'vue-router';
import Blog from '../views/Home.vue';
import ImageUpload from '../views/upload.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Logout from '../views/Logout.vue';

// Vue.component('test-component', TestComponent);

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Projects" */ '../views/Projects.vue'),
  },
  {
    path: '/random',
    name: 'Random',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Random" */ '../views/Random.vue'),
  },
  {
    path: '/upload',
    name: 'Upload',
    component: ImageUpload,
  },
  {
    path: '/blog/:slug',
    name: 'BlogShow',
    component: () => import(/* webpackChunkName: "Random" */ '../views/BlogShow.vue'),
    props: true,
  },
  {
    path: '/blog/edit/:id',
    name: 'BlogEdit',
    component: () => import(/* webpackChunkName: "Random" */ '../views/Edit.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      try {
        const hasPermission = store.state.isUserLoggedIn;
        console.log(hasPermission);
        if (hasPermission) {
          next();
        } else {
          next({
            name: 'About', // back to safety route //
            query: { redirectFrom: to.fullPath },
          });
        }
      } catch (e) {
        next({
          name: 'About', // back to safety route //
          query: { redirectFrom: to.fullPath },
        });
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    props: true,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  linkExactActiveClass: 'active-nav',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;

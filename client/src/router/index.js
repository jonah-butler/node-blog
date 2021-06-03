/* eslint-disable */
import Vue from 'vue';
import store from '@/store/store';
import VueRouter from 'vue-router';
import Blog from '../views/Home.vue';
import ImageUpload from '../views/upload.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Logout from '../views/Logout.vue';
// import Contact from '../views/Contact.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Blog',
    component: Blog,
    meta: {
      title: 'Jonah Butler Dev',
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
    meta: {
      title: 'About',
    },
  },
  {
    path: '/projects',
    name: 'Projects',
    meta: {
      title: 'Projects',
    },
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
    meta: {
      title: 'New Blog',
    },
    component: ImageUpload,
    props: true,
    beforeEnter: (to, from, next) => {
      try {
        const hasPermission = store.state.isUserLoggedIn;
        if (hasPermission) {
          next();
        } else {
          next({
            name: 'Blog', // back to safety route //
            query: { redirectFrom: to.fullPath },
          });
        }
      } catch (e) {
        next({
          name: 'Blog', // back to safety route //
          query: { redirectFrom: to.fullPath },
        });
      }
    },
  },
  {
    path: '/blog/:slug',
    name: 'BlogShow',
    component: () => import(/* webpackChunkName: "Random" */ '../views/BlogShow.vue'),
    props: true,
    meta: {
      title: 'Blog',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "Random" */ '../views/Contact.vue'),
    props: false,
    meta: {
      title: 'Contact',
    },
  },
  {
    path: '/blog/edit/:id',
    meta: {
      title: 'Edit Blog',
    },
    name: 'BlogEdit',
    component: () => import(/* webpackChunkName: "Random" */ '../views/Edit.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      try {
        const hasPermission = store.state.isUserLoggedIn;
        if (hasPermission) {
          next();
        } else {
          next({
            name: 'Blog', // back to safety route //
            query: { redirectFrom: to.fullPath },
          });
        }
      } catch (e) {
        next({
          name: 'Blog', // back to safety route //
          query: { redirectFrom: to.fullPath },
        });
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login',
    },
    component: Login,
    props: true,
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: 'Register',
    },
    component: Register,
    props: true,
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: {
      title: 'Logout',
    },
    component: Logout,
  },
  {
    path: '*',
    redirect: '/',
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

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map((tagDef) => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach((key) => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  return next();
});

export default router;

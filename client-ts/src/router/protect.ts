import {
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const routeProtection = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void => {
  /**
   * Route guard logic will go here...
   */
  const userStore = useUserStore();
  const { getUserToken, isAuthenticated } = storeToRefs(userStore);

  // check if an authenticated routed
  if (to.meta.auth) {
    // if user is not authenticated return to root
    if (!isAuthenticated.value) {
      next({
        path: '/',
      });
    }

    // extract expiration from jwt
    const expiration = parseJwtExp(getUserToken.value);

    // if expired, return to root
    if (expiration < new Date()) {
      userStore.logoutUser();

      next({
        path: '/',
      });
    }
  }

  console.log('to: ', to);
  console.log('from: ', from);
  console.log('next: ', next);
  return next();
};

const parseJwtExp = (jwt: string): Date => {
  const b64 = jwt.split('.')[1];
  // jwt is base64 url, so replacement accounting for:
  // + ---> -
  // / ---> _
  const expiration = JSON.parse(
    atob(b64.replace(/_/g, '/').replace(/-/g, '+')),
  ).exp;
  return new Date(expiration * 1000);
};

export default routeProtection;

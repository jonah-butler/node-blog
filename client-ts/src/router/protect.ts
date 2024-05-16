import {type RouteLocationNormalized, type NavigationGuardNext} from "vue-router";

const routeProtection = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {
  /**
   * Route guard logic will go here...
   */
  console.log("to: ",to);
  console.log("from: ", from);
  console.log("next: ", next);
  return next();
};

export default routeProtection;
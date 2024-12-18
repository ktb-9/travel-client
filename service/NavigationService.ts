import { router, Href } from "expo-router";

export const NavigationService = {
  reset(routeName: string | Href<string>) {
    router.replace(routeName as Href<string>);
  },

  getCurrentRoute() {
    return undefined;
  },

  navigate(routeName: string | Href<string>, params?: object) {
    router.push(routeName as Href<string>);
  },
};

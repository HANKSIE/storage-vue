import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import DashboardTemplate from "@/layout/Dashboard.vue";
import NormalTemplate from "@/layout/Normal.vue";
import FileManager from "@/views/Dashboard/FileManager.vue";

import authApi from "@/utils/api/auth";
import apiToken from "@/utils/localstorage/apiToken";
import { useStore } from "@/store";

const routes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: DashboardTemplate,
    meta: { requireAuth: true },
    children: [
      {
        path: "file",
        name: "user_file",
        component: FileManager,
      },
    ]
  },
  {
    path: "/",
    component: NormalTemplate,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
      },
      {
        path: "login",
        name: "login",
        component: Login,
      },
      {
        path: "register",
        name: "register",
        component: Register,
      },
    ]
  },
  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const redirectPageNames = ["login", "register"];

router.beforeEach(async (to, from, next) => {

  const requireAuth = to.matched[0].meta.requireAuth;
  const { auth } = useStore();

  if(apiToken.value && !auth.state.user){
    //load user
    try {
      const res = await authApi.loadUser();
      const { user } = res.data;
      auth.setUser(user);

    } catch (err) {
      console.error(err);
    }
  }

  if ((redirectPageNames.includes(to.name as string)) && auth.state.user) {
    //有權限卻進入登入/註冊頁面
    return next({ name: "user_file" });
  }

  if (requireAuth) {
    if(!apiToken.value && !auth.state.user){
      console.log('unauthorization');
      return next({ name: "login" });
    }
    return next();
  }

  return next();
});

export default router;

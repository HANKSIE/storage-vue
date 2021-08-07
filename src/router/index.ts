import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import DashboardTemplate from "@/layout/Dashboard.vue";
import NormalTemplate from "@/layout/Normal.vue";
import FileManager from "@/views/Dashboard/FileManager.vue";
import Setting from "@/views/Dashboard/Setting.vue";

import authApi from "@/utils/api/auth";
import { AxiosError } from "axios";
import apiToken from "@/utils/token/apiToken";
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
        component: FileManager
      },
      {
        path: "setting",
        name: "user_setting",
        component: Setting
      },
    ]
  },
  {
    path: "/",
    component: NormalTemplate,
    children: [
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

router.beforeEach(async (to, from, next) => {

  const { auth } = useStore();
  if (to.matched[0].meta.requireAuth && apiToken.value && !auth.state.user) {
    try {
      const res = await authApi.loadUser();
      const { user } = res.data;
      auth.setUser(user);

      if (to.name == "login") {
        //已登入卻進入登入頁面
        next({ name: "user_file" });
      } else {
        next();
      }
    } catch (err) {
      console.error(err);

      const httpError = err as AxiosError;
      
      if (httpError.response?.status == 401) {
        //沒有登入
        next({ name: "login" });
      } else {
        //其他錯誤
        next();
      }
    }
  }else {
    next();
  }
});

export default router;

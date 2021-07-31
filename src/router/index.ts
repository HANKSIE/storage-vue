import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import DashboardTemplate from "@/layout/Dashboard.vue";
import NormalTemplate from "@/layout/Normal.vue";
import FileManager from "@/views/Auth/FileManager.vue";
import Setting from "@/views/Auth/Setting.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    component: DashboardTemplate,
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

export default router;

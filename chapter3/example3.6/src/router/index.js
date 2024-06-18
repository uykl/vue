import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import UserCenter from "@/views/user-center/index.vue";
const UserProfile = () => import("@/views/user-center/Profile.vue");
const UserSettings = () => import("@/views/user-center/Settings.vue");
const NotFound = () => import("@/views/404.vue");

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: "/user",
    name: "UserCenter",
    component: UserCenter,
    redirect: '/user/profile',
    children: [
      {
        name: "profile",
        path: "profile",
        component: UserProfile,
      },
      {
        name: "settings",
        path: "settings",
        component: UserSettings,
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

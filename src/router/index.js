import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/control",
    name: "control",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "control" */ "../views/control.vue")
  },
  {
    path: "/login",
    name: "login",

    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue")
  },
  {
    path: "/socket",
    name: "socket",

    component: () => import("../views/socket.vue")
  },
  {
    path: "/rebuild",
    name: "rebuild",

    component: () => import("../views/rebuild/index"),
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'main',
        component: () => import("../views/rebuild/main")
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'resultDati',
        component: () => import("../views/rebuild/resultDati")
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'resultHuanjie',
        component: () => import("../views/rebuild/resultHuanjie")
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'resultPaiming',
        component: () => import("../views/rebuild/resultPaiming")
      }
    ]
  },
  {
    path: "/result",
    name: "result",

    component: () =>
      import(/* webpackChunkName: "result" */ "../views/result.vue")
  },
  {
    path: "/dafen",
    name: "dafen",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dafen" */ "../views/dafen.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

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
    component: () => import(/* webpackChunkName: "control" */ "../views/control.vue")
  },
  {
    path: "/login",
    name: "login",

    component: () => import(/* webpackChunkName: "login" */ "../views/login.vue")
  },
  {
    path: "/socket",
    name: "socket",

    component: () => import(/* webpackChunkName: "socket" */ "../views/socket.vue")
  },
  {
    path: "/result",
    name: "result",

    component: () => import(/* webpackChunkName: "result" */ "../views/result.vue")
  },
  {
    path: "/dafen",
    name: "dafen",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dafen" */ "../views/dafen.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

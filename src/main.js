import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import axios from "axios";
let mainUrl =
  process.env.NODE_ENV === "production"
    ? "https://talatan.com:3007/"
    : // ? "http://129.211.54.162:3006/"
      // "https://localhost:3007/";
      "http://localhost:3006/";
axios.defaults.baseURL = mainUrl;
Vue.prototype.$imgServer = mainUrl;
// var token = window.localStorage.getItem("token");
//请求拦截。所有http请求增加token
axios.interceptors.request.use(
  config => {
    config.headers = {
      "Content-Type": " application/json"
    };
    if (store.state.token) {
      config.headers.Authorization = `${store.state.token}`;
    }
    // config.headers[] = localStorage.token;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  function(response) {
    // 用户信息是否超时，重定向到登录页面
    // console.log(response);
    // if (response.status != 200) {
    //   localStorage.clear();
    //   router.replace({
    //     path: "/login",
    //     query: {
    //       redirect: router.currentRoute.fullPath
    //     }
    //   });
    //   Vant.Toast("请登录后操作");
    // }
    return response;
  },
  function(error) {
    // console.log("res error", error);
    // Do something with response error
    store.commit("logout_delToken");
    router.replace({ name: "login" });
    // router.replace({
    //   path: "/login",
    //   query: {
    //     redirect: router.currentRoute.fullPath
    //   }
    // });

    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

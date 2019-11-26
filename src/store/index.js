import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userid: "",
    pingweiname: "",
    username: ""
  },
  mutations: {
    login_saveToken(state, token) {
      let userinfo = setUserIdAndNameFormToken(token.split(" ")[1]);
      state.userid = userinfo.userid;
      state.pingweiname = userinfo.name;
      // state.token = 'Bearer ' + token
      state.token = token;
      window.localStorage.setItem("token", state.token);
      function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = decodeURIComponent(
          atob(base64Url)
            .split("")
            .map(function(c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(base64);
      }
      function setUserIdAndNameFormToken(token) {
        let payloadInfo = parseJwt(token);
        let result = {
          userid: payloadInfo.userid,
          name: payloadInfo.name
        };
        return result;
      }
    },

    logout_delToken(state) {
      state.token = "";
      window.localStorage.removeItem("token");

      // console.log(dd);
      state.userid = "";
      state.username = "";
      state.pingweiname = "";
    }
  },
  actions: {},
  modules: {}
});

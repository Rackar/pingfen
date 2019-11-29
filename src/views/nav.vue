<template>
  <div>
    <div id="nav">
      <router-link to="/">录入页</router-link>
      &nbsp;|
      <router-link to="/control">比赛控制页</router-link>
      &nbsp;|
      <router-link to="/socket">打分结果页</router-link>
      &nbsp;|
      <router-link to="/dafen">评委打分页</router-link>
      &nbsp;|
      <router-link to="/login">评委登录页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("logout_delToken");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped></style>

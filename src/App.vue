<template>
  <div id="app">
    <el-col
      :xs="{ span: 24, offset: 0 }"
      :sm="{ span: 18, offset: 3 }"
      :md="{ span: 12, offset: 6 }"
    >
      <!-- <div id="nav">
        <router-link to="/">录入页</router-link>&nbsp;|
        <router-link to="/control">比赛控制页</router-link>&nbsp;|
        <router-link to="/socket">打分结果页</router-link>&nbsp;|
        <router-link to="/result">最终排名页</router-link>&nbsp;|
        <router-link to="/dafen">评委打分页</router-link>&nbsp;|
        <router-link to="/login">评委登录页</router-link>&nbsp;|
        <span class="linkspan" @click="logout">评委注销</span>
      </div> -->
      
    </el-col>
    <router-view />
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

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.linkspan{
  cursor:pointer;
  &:hover{
    color:blue;
  }

}
</style>

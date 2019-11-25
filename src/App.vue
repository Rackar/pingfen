<template>
  <div id="app">
    <el-col
      :xs="{ span: 24, offset: 0 }"
      :sm="{ span: 18, offset: 3 }"
      :md="{ span: 10, offset: 7 }"
    >
      <div id="nav">
        <router-link to="/">录入页</router-link>|
        <router-link to="/control">比赛控制页</router-link>|
        <router-link to="/dafen">评委打分页</router-link>
      </div>
      <router-view />
    </el-col>
  </div>
</template>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

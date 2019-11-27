<template>
  <div>
    <div>{{ msg }}</div>

    <el-button @click="sendData">发送数据</el-button>
  </div>
</template>

<script>
export default {
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    getMsg: function(value) {
      console.log(value);
      this.msg = value;
    }
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    sendData() {
      this.$socket.emit("pingfen", { fenshu: 5 });
    }
  }
};
</script>

<style></style>

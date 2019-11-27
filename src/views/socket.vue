<template>
  <div>
    <!-- <div>收到的打分成绩{{ msg }}</div> -->
    <div>环节为：{{ huanjie.name }}</div>
    <div>当前选手为：{{ cansai.name }}</div>
    <div v-for="item in results" :key="item.id">
      评委 {{ item.pingweiName }}的打分为{{ item.fenshu }}
    </div>

    <!-- <el-button @click="sendData">发送数据</el-button> -->
  </div>
</template>

<script>
import getArrObjNameFromId from "../utils/tools";
export default {
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    getMsg: function(value) {
      console.log(value);
    },
    pingfenResult(value) {
      this.msg = value;
      if (
        value.cansaiId == this.cansai.id &&
        value.huanjieId == this.huanjie.id
      ) {
        //评委id不在result中
        let exist = this.results.some(res => {
          return res.pingweiId == value.pingweiId;
        });
        debugger;
        if (!exist) {
          this.results.push({
            pingweiId: value.pingweiId,
            pingweiName: getArrObjNameFromId(this.member.pw, value.pingweiId),
            fenshu: value.fenshu
          });
        } else {
          this.results.forEach(element => {
            if (element.pingweiId == value.pingweiId) {
              element.fenshu = value.fenshu;
            }
          });
        }
      }
    },
    huanjieChange(value) {
      this.huanjie.id = value.huanjieId;
      this.cansai.id = value.cansaiId;
      this.huanjie.name = getArrObjNameFromId(this.member.hj, value.huanjieId);
      this.cansai.name = getArrObjNameFromId(this.member.cs, value.cansaiId);
      this.results = [];
    }
  },
  created() {
    this.getMemberData();
  },
  data() {
    return {
      msg: {},
      huanjie: { name: "", id: "" },
      cansai: { name: "", id: "" },
      member: {},
      results: []
    };
  },
  methods: {
    getMemberData() {
      //axios
      this.$axios.get("/noauth/pingfen/all").then(res => {
        console.log(res.data.data);
        let data = res.data.data;
        if (res.status == 200 && res.data.status == 1) {
          // this.$router.push("/list");
          this.member = data;
          // this.table.cansai.push(obj);
        } else {
          this.$message.error("保存出现问题，请重试");
        }
      });
    },
    sendData() {
      // this.$socket.emit("pingfen", { fenshu: 5 });
    }
  }
};
</script>

<style></style>

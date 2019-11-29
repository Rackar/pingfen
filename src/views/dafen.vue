<template>
  <div class="dafen">
    <h3>评委打分</h3>
    <el-button @click="goCheck" type="primary">去打分</el-button>
    <div class="maintable">
      <div style="margin-top:20px;">我的打分记录</div>
      <el-table :data="table" style="width: 100%;">
        <el-table-column type="index" label="序号"></el-table-column>

        <!-- <el-table-column prop="huanjie" label="环节"></el-table-column> -->
        <el-table-column prop="cansai" label="参赛者"></el-table-column>
        <el-table-column prop="fenshu" label="分数"></el-table-column>
        <!-- <el-table-column prop="time" label="时间"></el-table-column> -->
      </el-table>
    </div>

    <div class="tail">
      <el-button @click="logout" type="">退出登录</el-button>
    </div>
    <el-dialog title="打分" :visible.sync="dialogVisible" width="100%" :before-close="handleClose">
      <div>
        <h1>
          <!-- 当前环节{{ huanjie }}， -->
          为参赛者
          <span style="color:red;">{{ cansai }}</span>
          打分
        </h1>
        <div>分数下限：0 ，分数上限：100</div>

        <el-input-number v-model="dafen.fenshu" @change="handleChange" :min="0" :max="100" label="描述文字"></el-input-number>
        <!-- <button @click="sumitScore">提交分数</button> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sumitScore">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import getArrObjNameFromId from "../utils/tools";

export default {
  data() {
    return {
      num: 1,
      dialogVisible: false,
      table: [],
      huanjie: "",
      cansai: "",
      dafen: {
        fenshu: 70,
        cansaiId: "",
        huanjieId: "",
        pingweiId: ""
      },
      alldata: {},
      myPingweiId: "pingweiid"
    };
  },
  computed: {
    pingweiname() {
      return this.$store.state.pingweiname;
    },
    pingweiid() {
      return this.$store.state.userid;
    }
  },

  created() {
    if (this.pingweiname === "") {
      this.$router.push("/login");
    }
    this.getTableData();
  },
  methods: {
    logout() {
      this.$store.commit("logout_delToken");
      this.$router.push("/login");
    },
    getTableData() {
      //axios
      this.$axios.get("/noauth/pingfen/all").then(res => {
        console.log(res);
        let data = res.data.data;
        if (res.status == 200 && res.data.status == 1) {
          // this.$router.push("/list");
          this.alldata = data;
          let list = data.record.filter(element => {
            return element.pingweiId == this.pingweiid;
          });
          this.table = [];
          list.forEach(element => {
            let cansaiName = getArrObjNameFromId(data.cs, element.cansaiId);
            let huanjieName = getArrObjNameFromId(data.hj, element.huanjieId);
            let obj = {
              huanjie: huanjieName,
              cansai: cansaiName,
              fenshu: element.fenshu,
              time: element.updatedAt
            };
            this.table.push(obj);
          });
          console.log(list);
          // this.table.cansai.push(obj);
        } else {
          this.$message.error("保存出现问题，请重试");
        }
      });

      //axios
      let obj = {
        huanjie: "第一节",
        cansai: "张三",
        fenshu: 90,
        time: "2019-11-14 18:00:00"
      };
      this.table.push(obj);
    },
    handleChange(value) {
      console.log(value);
    },
    goCheck() {
      //axios
      this.$axios.get("/noauth/pingfen/all").then(res => {
        console.log(res);
        let data = res.data.data;
        let flow = data.flow[0];
        if (res.status == 200 && res.data.status == 1) {
          if (flow.cansaiId !== "" && flow.huanjieId !== "") {
            this.dafen.cansaiId = flow.cansaiId;
            this.dafen.huanjieId = flow.huanjieId;
            this.dafen.pingweiId = this.pingweiid;
            this.dialogVisible = true;
            this.cansai = getArrObjNameFromId(this.alldata.cs, flow.cansaiId);
            this.huanjie = getArrObjNameFromId(this.alldata.hj, flow.huanjieId);
          } else {
            this.$message.error("打分还未开始");
          }
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
    sumitScore() {
      this.$confirm("确认提交本分数？", "打分", {
        customClass: "message-logout"
      })
        .then(() => {
          this.dialogVisible = false;
          let { cansaiId, huanjieId, pingweiId, fenshu } = this.dafen;
          this.$socket.emit("pingfen", {
            fenshu,
            cansaiId,
            huanjieId,
            pingweiId
          });
          let obj = {
            cansaiId,
            huanjieId,
            pingweiId,
            fenshu
          };

          this.$axios.post("/noauth/pingfen/add", obj).then(res => {
            console.log(res);
            if (res.status == 200 && res.data.status == 1) {
              // this.$router.push("/list");
              this.$message.success("成功");
              // this.table.pingwei.push(obj);
              this.getTableData();
            } else {
              this.$message.error("保存出现问题，请重试");
            }
          });
        })
        .catch(() => {
          //   this.dialogVisible = false;
        });
    },
    handleClose(done) {
      this.$confirm("未提交分数，确认关闭？", "取消打分", {
        customClass: "message-logout"
      })
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
.maintable {
  overflow-y: auto;

  height: 60vh;
}
.message-logout {
  width: 220px !important;
}
.tail {
  position: fixed;
  z-index: 2;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 20px;
}
</style>

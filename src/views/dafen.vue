<template>
  <div>
    <h3>打分页</h3>
    <el-button @click="goCheck">去打分</el-button>
    <el-table :data="table" style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>

      <el-table-column prop="huanjie" label="环节"></el-table-column>
      <el-table-column prop="cansai" label="参赛者"></el-table-column>
      <el-table-column prop="fenshu" label="分数"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div>
        <h3>现在在给环节1的张三打分</h3>
        <div>分数上限：100，分数下限：1</div>

        <el-input-number
          v-model="dafen.fenshu"
          @change="handleChange"
          :min="1"
          :max="100"
          label="描述文字"
        ></el-input-number>
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
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      //axios
      this.$axios.get("/noauth/pingfen/all").then(res => {
        console.log(res);
        let data = res.data.data;
        if (res.status == 200 && res.data.status == 1) {
          // this.$router.push("/list");
          this.alldata = data;
          let list = data.record.filter(element => {
            return element.pingweiId == this.myPingweiId;
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
            this.dafen.pingweiId = "pingweiid";
            this.dialogVisible = true;
          } else {
            this.$message.error("打分还未开始");
          }
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
    sumitScore() {
      this.$confirm("确认提交本分数？")
        .then(() => {
          this.dialogVisible = false;
          let { cansaiId, huanjieId, pingweiId, fenshu } = this.dafen;
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
      this.$confirm("未提交分数，确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>

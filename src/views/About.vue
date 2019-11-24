<template>
  <div class="about">
    <h1>比赛环节控制器，只有在评分环节才可以打分</h1>
    <div class="aboutstep">
      <el-steps :active="active" finish-status="success" direction="vertical">
        <el-step
          :space="200"
          v-for="hj in huanjie"
          :title="hj.title"
          :description="hj.description"
          :key="hj.key"
        ></el-step>
      </el-steps>
    </div>

    <el-button style="margin-top: 12px;" @click="last">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    <el-button style="margin-top: 12px;" @click="showResult"
      >展示汇总结果</el-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      huanjie: [
        { title: "环节1进行", description: "完成时间：未完成", status: false },
        { title: "环节1评分", description: "完成时间：未完成", status: false },
        { title: "环节2进行", description: "完成时间：未完成", status: false },
        { title: "环节2评分", description: "完成时间：未完成", status: false },
        { title: "环节3进行", description: "完成时间：未完成", status: false },
        { title: "环节3评分", description: "完成时间：未完成", status: false },
        { title: "环节4进行", description: "完成时间：未完成", status: false },
        { title: "环节4评分", description: "完成时间：未完成", status: false }
      ]
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
          this.huanjie = [];
          data.hj.map(hj => {
            this.huanjie.push({
              title: hj.name + "进行",
              description: "完成时间：未完成",
              status: false
            });
            this.huanjie.push({
              title: hj.name + "评分",
              description: "完成时间：未完成",
              status: false
            });
          });
        } else {
          this.$message.error("保存出现问题，请重试");
        }
      });
    },
    showResult() {},
    getHuanjieData() {},
    last() {
      if (this.active - 1 >= 0) {
        this.huanjie[this.active - 1].description = "完成时间：未完成";
        this.active--;
      }

      // if (this.active-- < 0) this.active = this.length;
    },
    next() {
      if (this.active - 1 < this.length) {
        this.huanjie[this.active].description =
          "完成时间：" + new Date().toLocaleString();
        this.active++;
      } else {
        this.active = 0;
        this.huanjie.forEach(element => {
          element.description = "完成时间：未完成";
        });
      }
    }
  },
  computed: {
    length() {
      return this.huanjie.length - 1;
    }
  }
};
</script>
<style>
.aboutstep {
  height: 500px;
  padding-bottom: 30px;
  margin-bottom: 30px;
}
</style>

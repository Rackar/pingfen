<template>
  <div class="about">
    <h1>比赛环节控制器，只有在评分环节才可以打分</h1>
    <div>
      <h3>环节：{{ huanjieSelect }} ， 选手：{{ cansaiSelect }}</h3>
      <el-button type="primary" style="margin-top: 12px;" @click="last"
        >上一步</el-button
      >
      <el-button type="primary" style="margin-top: 12px;" @click="next"
        >下一步</el-button
      >
      <el-button type="primary" style="margin-top: 12px;" @click="showResult"
        >展示汇总结果</el-button
      >
    </div>
    <el-row>
      <el-col :xs="12" :md="12">
        <div class="aboutstep">
          <el-steps
            :active="active"
            finish-status="success"
            direction="vertical"
          >
            <el-step
              :space="200"
              v-for="hj in huanjie"
              :title="hj.title"
              :description="hj.description"
              :key="hj.key"
            ></el-step>
          </el-steps>
        </div>
      </el-col>
      <el-col :xs="12" :md="12" v-show="this.active % 2 != 0">
        <el-button type="success" style="margin-top: 12px;" @click="setActive"
          >开始评分</el-button
        >
        <el-button
          type="success"
          style="margin-top: 12px;"
          @click="setNotActive"
          >停止评分</el-button
        >
        <template v-for="cs in cansai">
          <el-card
            @click.native="selectCS(cs)"
            :key="cs._id"
            shadow="hover"
            class="cansai"
            :class="{ cansaiClass: cs._id == selectId }"
            :body-style="{ padding: '10px 0 0 0', margin: '0' }"
          >
            <img :src="$imgServer + cs.avatar" class="image" />
            <div style="padding: 14px;">
              <span>{{ cs.name }}</span>
            </div>
          </el-card>
        </template>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      huanjie: [
        { title: "环节1进行", description: "完成时间：未完成", active: false }
      ],
      cansai: [],
      cansaiClass: "",
      selectId: "",
      cansaiSelect: "",
      huanjieSelect: "",
      huanjieSelectid: ""
    };
  },
  created() {
    this.getTableData();
  },

  methods: {
    selectCS(cs) {
      console.log(cs);
      this.selectId = cs._id;
      this.cansaiSelect = cs.name;
    },
    endSelectCS() {},
    getTableData() {
      //axios
      this.$axios.get("/noauth/pingfen/all").then(res => {
        console.log(res);
        let data = res.data.data;
        this.cansai = data.cs;
        if (res.status == 200 && res.data.status == 1) {
          this.huanjie = [];
          data.hj.map(hj => {
            this.huanjie.push({
              _id: hj._id,
              title: hj.name + "进行",
              description: "完成时间：未完成",
              active: false
            });
            this.huanjie.push({
              _id: hj._id,
              title: hj.name + "评分",
              description: "完成时间：未完成",
              active: false
            });
          });
        } else {
          this.$message.error("保存出现问题，请重试");
        }
      });
    },
    showResult() {},
    getHuanjieData() {},
    setActive() {
      this.changeHuanjie(this.selectId, this.huanjieSelectid);
    },
    setNotActive() {
      this.changeHuanjie("", "");
      this.selectId = "";
      this.cansaiSelect = "";
    },
    last() {
      if (this.active - 1 >= 0) {
        if (this.active % 2 === 0) {
          // this.changeHuanjie(this.huanjie[this.active - 1]._id, true);

          this.huanjieSelect = this.huanjie[this.active - 1].title;
          this.huanjieSelectid = this.huanjie[this.active - 1]._id;
        } else {
          // this.changeHuanjie(this.huanjie[this.active]._id, false);
          this.huanjieSelect = this.huanjie[this.active].title;
          this.huanjieSelectid = this.huanjie[this.active]._id;
        }
        this.huanjie[this.active - 1].description = "完成时间：未完成";
        this.active--;
      }
    },
    next() {
      if (this.active - 1 < this.length) {
        if (this.active % 2 === 0) {
          this.huanjieSelect = this.huanjie[this.active + 1].title;
          this.huanjieSelectid = this.huanjie[this.active + 1]._id;
          // this.changeHuanjie(this.huanjie[this.active + 1]._id, true);
        } else {
          this.huanjieSelect = this.huanjie[this.active].title;
          this.huanjieSelectid = this.huanjie[this.active]._id;
          // this.changeHuanjie(this.huanjie[this.active]._id, false);
        }
        this.huanjie[this.active].description =
          "完成时间：" + new Date().toLocaleString();
        this.active++;
      } else {
        this.active = 0;
        this.huanjie.forEach(element => {
          element.description = "完成时间：未完成";
        });
      }
    },
    changeHuanjie(cansaiId, huanjieId) {
      let obj = {
        cansaiId: cansaiId,
        huanjieId: huanjieId
      };
      console.log(obj);
      this.$axios.post("/noauth/pingfen/changehuanjie", obj).then(res => {
        console.log(res.data.data);
        if (res.status == 200 && res.data.status == 1) {
          // this.$router.push("/list");
          this.$message.success("成功");
        } else {
          this.$message.error("保存出现问题，请重试");
        }
      });
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
.image {
  width: 140px;
  height: 140px;
}
.aboutstep {
  /* width: 400px; */
  height: 500px;
  padding-bottom: 30px;
  margin-bottom: 30px;
}
.cansai {
  margin: 5px;
}
.cansai :hover {
}
.cansaiClass {
  background-color: aqua;
}
</style>

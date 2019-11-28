<template>
  <div class="home" v-loading="loading">
    <Nav></Nav>
    <div class="card">
      <h3>新增评委</h3>
      <el-upload
        class="avatar-uploader"
        :action="uploadActionUrl"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUploadUpload"
        :on-remove="handleRemove"
      >
        <div slot="tip" class="el-upload__tip">点击上传评委头像</div>
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-form
        ref="formPingwei"
        :rules="rulesPw"
        :inline="true"
        :model="formPingwei"
        class="demo-form-inline"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formPingwei.name" placeholder="评委"></el-input>
        </el-form-item>
        <el-form-item label="评委类型" prop="pwtype">
          <el-radio v-model="formPingwei.pwtype" label="评委">评委</el-radio>
          <el-radio v-model="formPingwei.pwtype" label="嘉宾">嘉宾</el-radio>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formPingwei.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formPingwei.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addPingwei">新增</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="center">评委列表</el-divider>
      <el-table :data="table.pingwei" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>

        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="pwtype" label="类型"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img
              style="height:80px;width:80px;"
              :src="$imgServer + scope.row.avatar"
              alt
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="deleteRes(scope.row, 'pw')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card">
      <h3>新增参赛者</h3>
      <el-upload
        class="avatar-uploader"
        :action="uploadActionUrl"
        :show-file-list="false"
        :on-success="handleUploadCansaiSuccess"
        :before-upload="beforeUploadUpload"
      >
        <div slot="tip" class="el-upload__tip">点击上传参赛者头像</div>
        <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form
        ref="formCansai"
        :rules="rulesCs"
        :inline="true"
        :model="formCansai"
        class="demo-form-inline"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="formCansai.name" placeholder="名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addCansai">新增</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="center">参赛者列表</el-divider>
      <el-table :data="table.cansai" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>

        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img
              style="height:80px;width:80px;"
              :src="$imgServer + scope.row.avatar"
              alt
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="deleteRes(scope.row, 'cs')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card">
      <h3>新增比赛环节</h3>

      <el-form
        ref="formHuanjie"
        :rules="rulesHj"
        :inline="true"
        :model="formHuanjie"
        class="demo-form-inline"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="formHuanjie.name" placeholder="名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addHuanjie">新增</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="center">比赛环节列表</el-divider>
      <el-table :data="table.huanjie" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>

        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="deleteRes(scope.row, 'hj')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Nav from "./nav";
export default {
  components: {
    Nav
  },
  data() {
    return {
      rulesPw: {
        name: [{ required: true, message: "请输入评委姓名", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      rulesCs: {
        name: [{ required: true, message: "请输入队伍名", trigger: "blur" }]
      },
      rulesHj: {
        name: [{ required: true, message: "请输入环节名", trigger: "blur" }]
      },
      loading: false,
      formInline: {
        user: "",
        region: ""
      },
      imageUrl: "",
      imageUrl2: "",
      tableData: [],
      formPingwei: {
        name: "",
        username: "",
        password: "",
        avatar: "",
        pwtype: "评委"
      },
      formCansai: {
        name: "",
        avatar: ""
      },
      formHuanjie: {
        name: ""
      },
      table: {
        pingwei: [],
        cansai: [],
        huanjie: []
      }
    };
  },
  computed: {
    uploadActionUrl() {
      return this.$imgServer + "noauth/upload/image";
    }
  },
  created() {
    this.getTableData();
  },
  methods: {
    deleteRes(data, type) {
      data.type = type;
      this.$axios.post("/noauth/pingfen/delete", data).then(
        res => {
          console.log(res);
          // let data = res.data.data;
          if (res.status == 200 && res.data.status == 1) {
            if (type == "pw") {
              this.table.pingwei.splice(
                this.table.pingwei.findIndex(pw => {
                  return pw._id == data._id;
                }),
                1
              );
            } else if (type == "cs") {
              this.table.cansai.splice(
                this.table.cansai.findIndex(pw => {
                  return pw._id == data._id;
                }),
                1
              );
            } else if (type == "hj") {
              this.table.huanjie.splice(
                this.table.huanjie.findIndex(pw => {
                  return pw._id == data._id;
                }),
                1
              );
            }
          } else {
            this.$message.error("保存出现问题，请重试");
          }
        },
        err => {
          this.$message.error("出现问题");
          console.log(err);
        }
      );
    },

    getTableData() {
      //axios
      this.$axios.get("/noauth/pingfen/all").then(res => {
        console.log(res);
        let data = res.data.data;
        if (res.status == 200 && res.data.status == 1) {
          // this.$router.push("/list");
          this.table.cansai = data.cs;
          this.table.pingwei = data.pw;
          this.table.huanjie = data.hj;
          // this.table.cansai.push(obj);
        } else {
          this.$message.error("保存出现问题，请重试");
        }
      });
    },
    addPingwei() {
      this.$refs["formPingwei"].validate(valid => {
        if (valid) {
          let obj = {
            name: this.formPingwei.name,
            username: this.formPingwei.username,
            password: this.formPingwei.password,
            avatar: this.formPingwei.avatar,
            pwtype: this.formPingwei.pwtype
          };

          this.$axios.post("/noauth/pingfen/addpingwei", obj).then(
            res => {
              console.log(res);
              if (res.status == 200 && res.data.status == 1) {
                // this.$router.push("/list");
                this.$message.success("成功");
                if (!obj.avatar) obj.avatar = "person.png";
                this.table.pingwei.push(obj);
              } else {
                this.$message.error("保存出现问题，请重试");
              }
            },
            err => {
              // debugger;
              this.$message.error(err.response.data.msg);
            }
          );
          // this.$refs.newupload.submit();
        }
      });
    },
    addCansai() {
      this.$refs["formCansai"].validate(valid => {
        if (valid) {
          let obj = {
            name: this.formCansai.name,
            avatar: this.formCansai.avatar
          };

          this.$axios.post("/noauth/pingfen/addcansai", obj).then(res => {
            console.log(res);
            if (res.status == 200 && res.data.status == 1) {
              // this.$router.push("/list");
              this.$message.success("成功");
              if (!obj.avatar) obj.avatar = "person.png";
              this.table.cansai.push(obj);
            } else {
              this.$message.error("保存出现问题，请重试");
            }
          });
        }
      });
    },
    addHuanjie() {
      this.$refs["formHuanjie"].validate(valid => {
        if (valid) {
          let obj = { name: this.formHuanjie.name };

          this.$axios.post("/noauth/pingfen/addhuanjie", obj).then(res => {
            console.log(res);
            if (res.status == 200 && res.data.status == 1) {
              // this.$router.push("/list");
              this.$message.success("成功");
              this.table.huanjie.push(obj);
            } else {
              this.$message.error("保存出现问题，请重试");
            }
          });
        }
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file) {
      console.log(file);
    },
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    handleUploadSuccess(res, file) {
      console.log(res);
      this.loading = false;
      this.formPingwei.avatar = res.data.filename;
      this.$message.success("上传头像成功");
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleUploadCansaiSuccess(res, file) {
      console.log(res);
      this.loading = false;
      this.formCansai.avatar = res.data.filename;
      this.$message.success("上传头像成功");
      this.imageUrl2 = URL.createObjectURL(file.raw);
    },
    beforeUploadUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";

      const isLt2M = file.size / 1024 / 1024 < 2;
      this.loading = true;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.home {
}
.card {
  border: #409eff 3px solid;
  margin: 40px 0;
  border-radius: 15px;
  padding: 20px;
}
.home h3 {
  margin-top: 5px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.el-upload__tip {
  margin-bottom: 5px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.demo-form-inline {
  text-align: left;
}
</style>

<template>
  <div class="home">
    <div class="card">
      <h3>新增评委</h3>
      <el-upload
        class="avatar-uploader"
        action="/noauth/upload/image"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUploadUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-form :inline="true" :model="formPingwei" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formPingwei.name" placeholder="评委"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="formPingwei.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
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
        <el-table-column type="index" label="序号" width="80"></el-table-column>

        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img style="height:80px;width:80px;" :src="scope.row.avatar" alt />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card">
      <h3>新增参赛者</h3>
      <el-upload
        class="avatar-uploader"
        action="/noauth/upload/image"
        :show-file-list="false"
        :on-success="handleUploadCansaiSuccess"
        :before-upload="beforeUploadUpload"
      >
        <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form :inline="true" :model="formCansai" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formCansai.name" placeholder="名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addCansai">新增</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="center">参赛者列表</el-divider>
      <el-table :data="table.cansai" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>

        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img style="height:80px;width:80px;" :src="scope.row.avatar" alt />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card">
      <h3>新增比赛环节</h3>

      <el-form :inline="true" :model="formHuanjie" class="demo-form-inline">
        <el-form-item label="名称">
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
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        avatar: ""
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
      let obj = this.formPingwei;

      this.$axios.post("/noauth/pingfen/addpingwei", obj).then(res => {
        console.log(res);
        if (res.status == 200 && res.data.status == 1) {
          // this.$router.push("/list");
          this.$message.success("成功");
          this.table.pingwei.push(obj);
        } else {
          this.$message.error("保存出现问题，请重试");
        }
      });
      // this.$refs.newupload.submit();
    },
    addCansai() {
      let obj = this.formCansai;

      this.$axios.post("/noauth/pingfen/addcansai", obj).then(res => {
        console.log(res);
        if (res.status == 200 && res.data.status == 1) {
          // this.$router.push("/list");
          this.$message.success("成功");
          this.table.cansai.push(obj);
        } else {
          this.$message.error("保存出现问题，请重试");
        }
      });
    },
    addHuanjie() {
      let obj = this.formHuanjie;

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
    },
    onSubmit() {
      console.log("submit!");
    },
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    handleUploadSuccess(res, file) {
      console.log(res);
      this.formPingwei.avatar = this.$imgServer + res.data.filename;
      this.$message.success("上传头像成功");
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleUploadCansaiSuccess(res, file) {
      console.log(res);
      this.formCansai.avatar = this.$imgServer + res.data.filename;
      this.$message.success("上传头像成功");
      this.imageUrl2 = URL.createObjectURL(file.raw);
    },
    beforeUploadUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";

      const isLt2M = file.size / 1024 / 1024 < 2;

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
  border: #409eff 1px solid;
  margin: 40px 0;
  border-radius: 10px;
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

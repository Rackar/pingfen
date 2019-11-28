<template>
  <div>
    <h2 style="text-align:center">评委登录</h2>
    <el-row :gutter="10">
      <el-col
        :xs="{ span: 18, offset: 3 }"
        :sm="{ span: 12, offset: 6 }"
        :md="{ span: 10, offset: 7 }"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          status-icon
          v-loading="loading"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>

          <!-- <el-form-item>
      
        <el-button @click="$router.replace('/login')">注册</el-button>
          </el-form-item>-->
        </el-form>
        <el-button type="primary" @click="onSubmit('form')">登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "sighup",
  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
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
    if (this.pingweiname !== "") {
      this.$router.push("/dafen");
    }
  },
  methods: {
    onSubmit(formName) {
      console.log("submit!");

      // this.$emit("refreshID", this.form.user_name);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$axios
            .post("/noauth/pingfen/login", {
              username: this.form.username,
              password: this.form.password
            })
            .then(res => {
              // console.log(res);
              // debugger;
              if (res.data.status == 1) {
                this.loading = false;
                //   this.totalstars -= stars;
                // this.$emit("refreshID", this.form.username);
                console.log(res.data);
                let data = res.data.data;
                this.$store.commit("login_saveToken", data.token);
                this.$router.push("/dafen");
                this.$message({
                  showClose: true,
                  duration: 1500,
                  type: "success",
                  message: res.data && res.data.msg
                });
                // var token = "Bearer " + res.data.data.token;

                // // this.$store.state.token = token;
                // this.$store.commit("login_saveToken", token);

                // console.log(this.$route.query);
                // let previousUrl = "/";
                // if (this.$route.query && this.$route.query.redirect)
                //   previousUrl = this.$route.query.redirect;
                // this.$router.push(previousUrl);
              } else {
                this.loading = false;
                this.$message({
                  showClose: true,
                  duration: 1500,
                  type: "error",
                  message: "错误，请重新输入"
                });
              }
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
              this.$message({
                showClose: true,
                duration: 1500,
                type: "error",
                message: err.response.data.msg
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<template>
<div class="first-login-container">
  <div class="login-container-in">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="left-img">
        <img src="../../assets/login/login-left.png" />
        <img class="system-icon" src="../../assets/login/system.png" />
      </div>
      <div class="right-content">
        <div class="title-container">
          <h3 class="title">修改密码</h3>
          <p class="summary">
            您好，这是您第一次登录上海电信攻击溯源系统，请先重置密码。
          </p>
        </div>

        <el-form-item prop="password1">
          <span class="svg-container">
            <img src="../../assets/login/password.png" />
          </span>
          <el-input v-model="loginForm.password1" :type="passwordType" placeholder="请输入新密码" name="password" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="password2">
          <span class="svg-container">
            <img src="../../assets/login/password.png" />
          </span>
          <el-input v-model="loginForm.password2" :type="passwordType" placeholder="请重新输入密码" name="password" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="
              margin-top: 10px;
              border-radius: 7px;
              width: 100%;
              font-size: 16px;
              margin-bottom: 30px;
              height: 50px;
            " @click.native.prevent="handleLogin">
          确定
        </el-button>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import { resetPassword } from "@/axios";

export default {
  name: "Login",
  components: { LangSelect },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!/^(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W).*$/.test(value)) {
        callback(new Error("密码大于等于8位，必须包含字母、数字和特殊字符"));
      } else {
        if (this.loginForm.password2 !== "") {
          this.$refs.loginForm.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!/^(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W).*$/.test(value)) {
        callback(
          new Error("密码大于等于8位，必须包含大、小写字母、字符和数字")
        );
      } else if (value !== this.loginForm.password1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        password1: "",
        password2: "",
      },
      loginRules: {
        password1: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
      },
      passwordType: "password",
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {},
  destroyed() {},
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let obj = {
            password1: this.loginForm.password1,
            password2: this.loginForm.password2,
          };
          resetPassword(obj).then((response) => {
            if (response.data.errCode == 0) {
              this.$message({
                message: "设置密码成功,请重新登录",
                type: "success",
              });
              setTimeout(() => {
                this.$router.go(-1);
              }, 500);
            } else if (response.data.errCode == 41011) {
              this.loading = false;
              this.$message.error(response.data.errMsg);
            }
          });
          //this.$router.push({ path: this.redirect || '/' })
          // this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
          //   this.loading = false

          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #333;
$cursor: #fff;

.first-login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
  }

  .el-form-item {
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    margin-bottom: 30px;
    color: #454545;
  }

  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #333;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #2296f3;

.first-login-container {
  min-height: 100%;
  width: 100%;
  min-width: 1008px;
  background: linear-gradient(225deg, #5c6572 0%, #3a434d 100%);
  overflow: hidden;

  .login-container-in {
    position: absolute;
    width: 1008px;
    height: 612px;
    top: 50%;
    margin-top: -306px;
    left: 50%;
    margin-left: -504px;
  }

  .login-form {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .left-img {
      width: 488px;
      height: 612px;
      float: left;

      .system-icon {
        position: absolute;
        width: 358px;
        height: 35px;
        left: 36px;
        top: 69px;
      }
    }

    .right-content {
      width: 520px;
      float: left;
      height: 612px;
      border-radius: 0 22px 22px 0;
      background: #fff;
      padding: 0 41px;
    }
  }

  .svg-container {
    padding: 6px 0px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    background: #fff;
    display: inline;

    img {
      margin-top: 10px;
    }
  }

  .title-container {
    position: relative;
    margin-top: 81px;

    .title {
      font-size: 18px;
      color: #333;
      text-align: left;
      font-weight: bold;
    }

    .summary {
      font-size: 14px;
      color: #333;
      margin-top: 18px;
      margin-bottom: 33px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

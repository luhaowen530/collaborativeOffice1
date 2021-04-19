<template>
<div class="login-container">
    <div class="login-container-in">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <div class="left-img">
                <img class="left-img-icon" src="../../assets/login/login_left.png" />
                <img class="left-img-logo" src="../../assets/login/logo.png" />
				<div class="left-img-text">上海电科智能系统股份有限公司管理系统</div>
                <!-- <img class="system-icon" src="../../assets/login/system.png" /> -->
            </div>
            <div class="right-content">
                <div class="title-container">
                    <h3 class="title">用户登录</h3>
                </div>

                <el-form-item prop="username">
                    <span class="svg-container">
                        <img src="../../assets/login/user.png" />
                    </span>
                    <el-input v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text" auto-complete="on" />
                </el-form-item>

                <el-form-item prop="password">
                    <span class="svg-container">
                        <img src="../../assets/login/password.png" />
                    </span>
                    <el-input v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" name="password" auto-complete="on" @keyup.enter.native="handleLogin" />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                    <p style="position:absolute;top: 22px;left:0px;color: #f56c6c" v-if="passwordError">{{errorMessage}}</p>
                </el-form-item>

                <el-form-item prop="code">
                    <span class="svg-container">
                        <img src="../../assets/login/code.png" />
                    </span>
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" type="text" auto-complete="on" maxlength="4" />
                    <div class="code-img-content">
                        <div class="left-content">
                            <img-code :identifyCode="loginForm.identifyCode" />
                        </div>
                        <div class="right-refresh" @click="rotateStateChange">
                            <img src="../../assets/login/refresh.png" :class="rotateState ? 'clickAnimation' : ''" />
                        </div>
                    </div>
                </el-form-item>

                <el-button :loading="loading" type="primary" style="
              border-radius: 7px;
              width: 100%;
              font-size: 16px;
              margin-bottom: 30px;
              height: 50px;
            " @click.native.prevent="handleLogin">
                    {{ $t("login.logIn") }}
                </el-button>
            </div>
        </el-form>
    </div>
</div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import { setUserUrl, setUserToken } from '@/utils/auth'
import { getToken, setUserName } from '@/utils/auth'
import { getRanNum } from "@/utils"
import { userLogin, initAxios } from '@/axios'
import imgCode from "./imgCode";
export default {
    name: "Login",
    components: {
        LangSelect,
        imgCode
    },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (value == '') {
                callback(new Error("请输入正确的用户名"));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error("请输入正确的密码"));
            } else {
                callback();
            }
        };
        const validateCode = (rule, value, callback) => {
            if (value.toUpperCase() != this.loginForm.identifyCode) {
                callback(new Error("请输入正确的验证码"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: "",
                password: "",
                code: "",
                // remPassword: false,
                identifyCode: "",
            },
            passwordError: false,
            errorMessage: '',
            rotateState: false,
            loginRules: {
                username: [{
                    required: true,
                    trigger: "blur",
                    validator: validateUsername
                }, ],
                password: [{
                    required: true,
                    trigger: "blur",
                    validator: validatePassword
                }, ],
                code: [{
                    required: true,
                    trigger: "blur",
                    validator: validateCode
                }],
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
    created() {
        this.loginForm.identifyCode = getRanNum()
    },
    destroyed() {},
    methods: {
        rotateStateChange() {
            this.rotateState = this.rotateState ? false : true;
            if (this.rotateState) {
                setTimeout(() => {
                    this.rotateState = false
                    this.loginForm.identifyCode = getRanNum()
                }, 500);
            }
        },
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
                    // userLogin(this.loginForm).then(response => {
                    //   setUserName(this.loginForm.username)
                    //   if (response.data.data) {
                    //     if (response.data.data.resetPass) {
                    //       if (response.data.data.resetPass == '/pass/reset') {
                    //         setUserToken(response.data.data.token)
                    //         initAxios()
                    //         this.$router.push({
                    //           path: '/first_login'
                    //         })
                    //       }
                    //     } else {
                    //       setUserUrl(response.data.data)
                    //       setUserToken(response.data.data.token)
                    //       initAxios()
                    //       if (!response.data.data.menus || response.data.data.menus.length == 0) {
                    //         this.$message({
                    //           message: '您当前没有任何查看权限，请联系管理员添加后重新登录',
                    //           type: 'warning'
                    //         });
                    //       } else {
                    this.$store.dispatch("LoginByUsername").then(() => {
                            this.loading = false;
                            this.$router.push({
                                path: this.redirect || '/'
                            })
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                }

                //       }
                //     } else if (response.data.errCode == 41001) {
                //       this.$message.error(response.data.errMsg);
                //       this.loading = false;
                //     }
                //   }).catch(error =>{
                //     this.loading = false
                //   })
                // } else {
                //   console.log("error submit!!");
                //   return false;
                // }
            });
        },
    },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #333;
$cursor: #fff;

/* reset element-ui css */
.login-container {
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

.login-container {
    min-height: 100%;
    width: 100%;
    min-width: 1008px;
    background: linear-gradient(225deg, #5C6572 0%, #3A434D 100%);
    overflow: hidden;

    .login-container-in {
        position: absolute;
        width: 1218px;
        height: 602px;
        top: 50%;
        margin-top: -301px;
        left: 50%;
        margin-left: -609px;
    }

    .login-form {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .left-img {
            width: 718px;
            height: 602px;
            float: left;
            position: relative;
			background: #0089FF;

            img.left-img-icon {
                width: 668px;
                height: 361px;
				position: absolute;
				top: 71px;
				left: 49px;
            }
            img.left-img-logo {
                width: 306px;
                height: 119px;
				position: absolute;
				top: 78px;
				left: 178px;
            }
			.left-img-text {
				font-size: 33px;
				color: #fff;
				position: absolute;
				bottom: 65px;
				left: 64px;
			}

            .system-icon {
                position: absolute;
                width: 358px;
                height: 35px;
                left: 36px;
                top: 69px;
            }
        }

        .right-content {
            width: 500px;
            float: left;
            height: 602px;
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
    }

    .code-img-content {
        position: absolute;
        width: 180px;
        top: 0px;
        right: 0px;
        height: 100%;

        .left-content {
            float: left;
            width: 122px;
            height: 100%;

            img {
                width: 100%;
            }
        }

        .right-refresh {
            float: right;
            width: 50px;
            border-radius: 0 5px 5px 0;
            height: 100%;
            background: #f2f2f2;

            img {
                width: 15px;
                height: 15px;
                float: left;
                margin: 16px;
            }

            img.clickAnimation {
                animation: myRotate 0.5s linear infinite;
            }
        }
    }

    @keyframes myRotate {
        0% {
            -webkit-transform: rotate(0deg);
        }

        50% {
            -webkit-transform: rotate(180deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    .title-container {
        position: relative;
        margin-top: 81px;

        .title {
            font-size: 28px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
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

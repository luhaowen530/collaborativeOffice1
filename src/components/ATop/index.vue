<template>
    <el-row class="top-container">
        <el-col :span="8" class="top-left">
            <img class="logo-img" src="@/assets/top/pudong-logo.png" alt="">
            <span class="logo-text">自助收银后台管理系统</span>
        </el-col>
        <!-- <el-col :span="9" class="top-center">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" menu-trigger="click">
                <el-menu-item v-for="(item, index) in menuList" :index="String(index + 1)" :key="index" @click="rouerTo(index)">
                    <template v-if="index == 3 && UnreadNoSys != ''">
                        {{ item }}
                        <span style="color: red;">({{UnreadNoSys}}条未读)</span>
                    </template>
                    <template v-else>{{ item }}</template>
                </el-menu-item>
            </el-menu>
        </el-col> -->
        <el-col :span="5" :offset="11" class="top-right">
            <div class="top-right-userinfo">
                <img class="user-img" src="@/assets/top/headpic.png" alt="">
                <span class="user-name">系统管理员</span>
                <img class="user-more" src="@/assets/top/headmore.jpg" @click="changeloginMsgBtn()" v-show="!loginMsgBtnOnoff" alt="">
                <img class="user-more" src="@/assets/top/headdrop.png" @click="changeloginMsgBtn()" v-show="loginMsgBtnOnoff" alt="">
                <el-collapse-transition>
                    <div class="login-msg" v-show="loginMsgBtnOnoff" @mouseleave="changeloginMsgBtn()">
                        <div class="top-arrow"></div>
                        <el-row :span="24" class="login-msg-row" @click.native="toPersonalMsg">个人信息</el-row>
                        <el-row :span="24" class="login-msg-row" @click.native="toOtherSys">切换系统</el-row>
                        <el-row :span="24" class="login-msg-row" @click.native="QuitSys">退出</el-row>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="top-right-date">
                <div class="date-solar-calendar">{{ nowDate }}</div>
                <div class="date-lunar-calendar">{{ nowLunarCalendar }}</div>
                <div class="date-week-box">
                    <span class="daet-week">{{ nowWeek }}</span>
                    <span class="date-time">{{ nowTime }}</span>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import { getLunarCalendar, weekNum, nowTime } from "@/utils/lunarCalendar"
    export default {
        props:["topHighlightId"],
        data() {
            return {
                activeIndex: "",
                menuList: ["门户", "工作台", "会议", "邮件", "通知", "企业通信录", "文件管理"],
                UnreadNoSys: '',
                nowDate: '',
                nowLunarCalendar: getLunarCalendar(),
                nowWeek: weekNum(),
                nowTime: nowTime(),
                loginMsgBtnOnoff: false,
            }
        },
        watch: {
            'topHighlightId': function(newVal){
                this.activeIndex = newVal
            }
        },
        mounted () {
            this.getDate();
            setInterval(() => {
                this.nowTime = nowTime()
            }, 1000);
        },
        methods: {
            rouerTo(index){
                if(index == "0"){
                    this.$router.push({path: "/gateway"})
                }else if(index == "1"){
                    this.$router.push({path: "/workbench"})
                }else if(index == "2"){
                    this.$router.push({path: "/meeting"})
                }else if(index == "3"){
                    this.$router.push({path: "/mail"})
                }else if(index == "4"){
                    this.$router.push({path: "/notice"})
                }else if(index == "5"){
                    this.$router.push({path: "/addressbook"})
                }else if(index == "6"){
                    this.$router.push({path: "/filemanagement"})
                }
            },
            getDate(){
                let nowDate = new Date()
                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate()
                }
                this.nowDate = date.year + "年" + date.month + "月" + date.date + "日"
            },
            changeloginMsgBtn() {
                this.loginMsgBtnOnoff = !this.loginMsgBtnOnoff;
            },
            toPersonalMsg(){

            },
            toOtherSys(){

            },
            QuitSys(){

            }
        },
    }
</script>

<style lang="scss" scoped>
    .top-container {
        width: 100%;
        height: 98px;
        background: #fff;
        padding: 0 33px 0 28px;
        
        .top-left {
            height: 100%;
            display: flex;
            align-items: center;

            .logo-img {
                width: 201px;
                height: 47px;
            }
            .logo-text {
                font-size: 30px;
                font-weight: bold;
                color: #454545;
                margin-left: 12px;
            }
        }
        .top-center {
            height: 100%;
            position: relative;

            .el-menu-demo {
                border-bottom: none;
                position: absolute;
                bottom: 0;

                .el-menu-item {
                    font-size: 18px;
                    color: #7F7F7F;
                    height: 80px;
                    line-height: 80px;
                }
            }

        }
        .top-right {
            height: 100%;
            display: flex;
            align-items: center;

            .top-right-userinfo {
                width: 60%;
                display: flex;
                align-items: center;
                margin-top: 10px;
                position: relative;

                .user-img {
                    width: 40px;
                    height: 40px;
                }
                .user-name {
                    font-size: 16px;
                    font-weight: bold;
                    color: #2C3E50;
                    margin: 10px 12px 0 16px;
                }
                .user-more {
                    width: 16px;
                    height: 16px;
                    margin-top: 10px;
                    cursor: pointer;
                }
                .login-msg {
                    width: 120px;
                    position: absolute;
                    top: 42px;
                    right: 20px;
                    height: auto;
                    margin-top: 4px;
                    background: white;
                    box-shadow: 4px 4px 10px #9e9e9e;
                    z-index: 1;

                    .top-arrow {
                        width: 0;
                        height: 0;
                        border: 6px solid transparent;
                        border-bottom: 6px solid white;
                        position: absolute;
                        top: -12px;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                    .login-msg-row {
                        height: 37px;
                        color: black;
                        line-height: 37px;
                        text-align: left;
                        padding: 0 10px;
                        font-size: 14px;
                        cursor: pointer;
                    }
                    .login-msg-row:hover {
                        background: #409EFF;
                        color: #fff;
                    }
                }
            }
            .top-right-date {
                width: 40%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: 18px;
                color: #2C3E50;

                .date-lunar-calendar {
                    margin: 5px 0;
                }
            }
        }
    }
</style>
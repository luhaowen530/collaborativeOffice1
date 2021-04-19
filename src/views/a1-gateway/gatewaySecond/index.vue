<template>
    <div class="gateway-second-container">
        <el-row :gutter="30">
            <el-col :span="10">
                <div class="content-workbench">
                    <div class="workbench-left">
                        <img class="workbench-left-img" src="@/assets/container/workbench.png" alt="">
                        <div class="workbench-left-title">工作台</div>
                    </div>
                    <div class="workbench-right">
                        <el-tabs class="workbench-right-tabs" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="待办" name="first">待办</el-tab-pane>
                            <el-tab-pane label="已办" name="second">
                                <div class="completed-list">
                                    <div class="completed-one" v-for="(item, index) in completedList" :key="index">
                                        <div class="completed-one-title">{{ item.title }}</div>
                                        <div class="completed-one-itme">{{ item.time }}</div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我的发起" name="third">我的发起</el-tab-pane>
                        </el-tabs>
                        <div class="look-more">查看更多</div>
                    </div>
                </div>
                <div class="content-mail-list">
                    <div class="mailList-left">
                        <img class="mailList-left-img" src="@/assets/container/mail-list.png" alt="">
                        <div class="mailList-left-title">通讯录</div>
                    </div>
                    <div class="mailList-right">
                        <div class="mailList-right-input">
                            <el-input v-model="mailListInput" placeholder="请输入查询条件"></el-input>
                        </div>
                        <div class="mailList-right-noData" v-if="mailListNoData">暂无数据</div>
                        <div class="mail-right-data" v-if="!mailListNoData">
                            <el-row class="mail-right-list" v-for="(item, index) in mailListData" :key="index">
                                <el-col :span="5">{{ item.jobNum }}</el-col>
                                <el-col :span="7" class="mailList-name-col">{{ item.name }}</el-col>
                                <el-col :span="11">{{ item.phone }}</el-col>
                                <el-col :span="1" class="more-mailList-col">
                                    <img class="more-mailList" src="@/assets/container/morePicture.png" alt="">
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="content-notice">
                    <div class="notice-left">
                        <img class="notice-left-img" src="@/assets/container/notice.png" alt="">
                        <div class="notice-left-title">通讯录</div>
                    </div>
                    <div class="notice-right">
                        <div class="notice-right-list">
                            <div class="notice-right-list-one" v-for="(item, index) in noticeList" :key="index">
                                <div class="notice-right-list-title">{{ item.title }}</div>
                                <div class="notice-right-list-department">{{ item.department }}</div>
                                <div class="notice-right-list-time">{{ item.time }}</div>
                            </div>
                        </div>
                        <div class="look-more">查看更多</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { getGatewayData } from "@/axios/a1-gateway"
    export default {
        data() {
            return {
                activeName: 'second',
                completedList: [],
                mailListInput: '',
                mailListData: [],
                mailListNoData: false,
                noticeList: []
            }
        },
        created(){
            this.getWorkbenchData()
        },
        methods: {
            getWorkbenchData(){
                // 请求接口
                // let obj = {
                //     service: "",
                //     WEEK_NUM: ""
                // }
                // getGatewayData(obj).then(response => {
                //     console.log(response)
                // })
                this.completedList = [
                    { title: "协同办公设计方案沟通会（工会、审计室）", time: "2021-02-24" },
                    { title: "协同办公流程财务条线讨论会接待", time: "2021-02-03" },
                    { title: "机务系统报表相关科目类别沟通会接待", time: "2021-01-13" },
                    { title: "智能动态时刻表方案调研", time: "2020-11-30" },
                    { title: "综合信息平台推进会", time: "2020-09-23" },
                    { title: "讨论可视化平台对接事宜", time: "2020-09-04" },
                ]
                this.mailListData = [
                    { jobNum: "04-012287", name: "赵晓晨", phone: "15000858081" },
                    { jobNum: "04-012287", name: "赵晓晨", phone: "15000858081" },
                    { jobNum: "04-012287", name: "赵晓晨", phone: "15000858081" },
                    { jobNum: "04-012287", name: "赵晓晨", phone: "15000858081" },
                    { jobNum: "04-012287", name: "赵晓晨", phone: "15000858081" },
                    { jobNum: "04-012287", name: "赵晓晨", phone: "15000858081" },
                ]
                this.noticeList = [
                    {
                        title: "浦交【2021】19号关于做好“春节”春运及两会期间浦交【2021】19号关于做好“春节”春运及两会期间",
                        department: "发文部门：安全管理部、人力资源部、机务管理部",
                        time: "2021-02-24"
                    },
                    {
                        title: "浦交【2021】19号关于做好“春节”春运及两会期间浦交【2021】19号关于做好“春节”春运及两会期间",
                        department: "发文部门：安全管理部、人力资源部、机务管理部",
                        time: "2021-02-24"
                    },
                ]
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss" scoped>
.gateway-second-container {
    padding: 0 30px;

    .content-workbench {
        width: 100%;
        height: 470px;
        display: flex;
        border: 1px solid #D3D3D3;
        border-radius: 20px;

        .workbench-left {
            width: 64px;
            height: 100%;
            background: #7E93A4;
            border-radius: 20px 0 0 20px;
            position: relative;

            .workbench-left-img {
                width: 35px;
                height: 35px;
                position: absolute;
                top: 22px;
                left: 14px;
            }
            .workbench-left-title {
                width: 20px;
                color: #fff;
                position: absolute;
                top: 198px;
                left: 24px;
            }
        }
        .workbench-right {
            width: calc(100% - 64px);
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 37px;
            background: #fff;
            border-radius: 0 20px 20px 0;

            .workbench-right-tabs {
                height: calc(100% - 23px);
                overflow: hidden;

                .completed-list {

                    .completed-one {
                        height: 45px;
                        line-height: 45px;
                        font-size: 14px;
                        padding: 0 10px;
                        display: flex;
                        justify-content: space-between;
                        cursor: pointer;
                    }
                    .completed-one:hover {
                        background: #409EFF;
                        color: #fff;
                    }
                }
            }
            .look-more {
                font-size: 12px;
                color: #409EFF;
                cursor: pointer;
                text-align: center;
            }
        }
    }
    .content-mail-list {
        width: 100%;
        height: 322px;
        display: flex;
        border: 1px solid #D3D3D3;
        border-radius: 20px;
        margin-top: 20px;

        .mailList-left {
            width: 64px;
            height: 100%;
            background: #BEC9D1;
            border-radius: 20px 0 0 20px;
            position: relative;

            .mailList-left-img {
                width: 35px;
                height: 35px;
                position: absolute;
                top: 22px;
                left: 14px;
            }
            .mailList-left-title {
                width: 20px;
                color: #fff;
                position: absolute;
                top: 143px;
                left: 24px;
            }
        }
        .mailList-right {
            width: calc(100% - 64px);
            height: 100%;
            overflow: hidden;
            padding: 37px 46px 37px 41px;
            background: #fff;
            border-radius: 0 20px 20px 0;
            position: relative;

            .mailList-right-noData {
                font-size: 14px;
                position: absolute;
                top: 60%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .mail-right-data {
                height: calc(100% - 40px);
                overflow-y: auto;
                overflow-x: hidden;

                .mail-right-list {
                    height: 60px;
                    line-height: 60px;
                    color: #2c3e50;
                    text-align: center;
                    cursor: pointer;
                    
                    .mailList-name-col {
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .more-mailList-col {
                        display: flex;
                        height: 100%;

                        .more-mailList {
                            width: 30px;
                            height: 30px;
                            margin: auto;
                        }
                    }
                }
                .mail-right-list:nth-child(even) {
                    background: #F5F5F5;
                }
                .mail-right-list:hover {
                    background: #409EFF;
                    color: #fff;
                }
            }
        }
    }
    .content-notice {
        width: 100%;
        height: 812px;
        display: flex;
        border: 1px solid #D3D3D3;
        border-radius: 20px;

        .notice-left {
            width: 64px;
            height: 100%;
            background: #73A2C9;
            border-radius: 20px 0 0 20px;
            position: relative;

            .notice-left-img {
                width: 35px;
                height: 35px;
                position: absolute;
                top: 17px;
                left: 16px;
            }
            .notice-left-title {
                width: 20px;
                color: #fff;
                position: absolute;
                top: 392px;
                left: 24px;
            }
        }
        .notice-right {
            width: calc(100% - 64px);
            height: 100%;
            overflow: hidden;
            padding: 37px 35px 27px 23px;
            background: #fff;
            border-radius: 0 20px 20px 0;

            .notice-right-list {
                height: calc(100% - 23px);
                overflow: auto;

                .notice-right-list-one {
                    height: 131px;
                    padding: 20px 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .notice-right-list-title {
                        width: 90%;
                        font-size: 18px;
                        font-weight: bold;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        cursor: pointer;
                    }
                    .notice-right-list-department {
                        width: 90%;
                        font-size: 14px;
                        color: #9E9E9E;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .notice-right-list-time {
                        font-size: 14px;
                        text-align: right;
                    }
                }
                .notice-right-list-one:nth-child(even) {
                    background: #F5F5F5;
                }
            }
            .look-more {
                font-size: 12px;
                color: #409EFF;
                cursor: pointer;
                text-align: center;
                margin-top: 10px;
            }
        }
    }
}
</style>

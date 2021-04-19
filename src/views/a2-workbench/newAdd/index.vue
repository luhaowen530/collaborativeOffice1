<template>
    <div class="a2-newadd">
        <div class="top-title">
            <img src="@/assets/container/menu-logo.png" alt="">
            <span class="top-title-text">新建流程</span>
        </div>
        <div class="a2-newadd-centent">
            <el-row class="content-row">
                <el-col :span="9" class="content-col">
                    <el-row class="centent-title">办公流程</el-row>
                    <div class="lc-list-box work-lc-list-bx">
                        <el-row class="lc-list-row" v-for="(item, index) in workLCData" :key="index">
                            <div class="lc-title">{{ item.title }}</div>
                            <div class="lc-list">
                                <div class="lc-list-one" v-for="(list, index) in item.listArr" :key="index">{{ list.lcTitle}}</div>
                            </div>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="14" class="content-col">
                    <el-row class="centent-title business-department">业务部门相关流程</el-row>
                    <el-row class="content-col-row">
                        <el-col :span="12">
                            <div class="lc-list-box">
                                <el-row class="lc-list-row" v-for="(item, index) in businessLCData1" :key="index">
                                    <div class="lc-title">{{ item.title }}</div>
                                    <div class="lc-list">
                                        <div class="lc-list-one" v-for="(list, index) in item.listArr" :key="index">{{ list.lcTitle}}</div>
                                    </div>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="lc-list-box">
                                <el-row class="lc-list-row" v-for="(item, index) in businessLCData2" :key="index">
                                    <div class="lc-title">{{ item.title }}</div>
                                    <div class="lc-list">
                                        <div class="lc-list-one" v-for="(list, index) in item.listArr" :key="index">{{ list.lcTitle}}</div>
                                    </div>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                workLCData: [
                    {
                        title: "付款立项相关流程",
                        listArr: [
                            { lcTitle: "上会项目立项流程" },
                            { lcTitle: "业务招待申请流程" },
                            { lcTitle: "上会项目立项流程" },
                            { lcTitle: "业务招待申请流程" },
                            { lcTitle: "固定资产、低值易耗品、总务用品、办公用品申购流程" }
                        ]
                    },
                    {
                        title: "其他流程",
                        listArr: [
                            { lcTitle: "上会流程" },
                            { lcTitle: "发文流程" },
                            { lcTitle: "收文流程/文件流转" },
                            { lcTitle: "印章使用申请流程" },
                            { lcTitle: "固定资产、低值易耗品、总务用品、办公用品验收流程" },
                            { lcTitle: "固定资产、低值易耗品报废流程" },
                            { lcTitle: "固定资产调拨流程" }
                        ]
                    },
                ],
                businessLCData1: [
                    {
                        title: "计财部业务流程",
                        listArr: [
                            { lcTitle: "计财部业务流程" },
                        ]
                    },
                    {
                        title: "安全部业务流程",
                        listArr: [
                            { lcTitle: "事故上报流程" },
                            { lcTitle: "事故借款流程" },
                            { lcTitle: "事故退款流程" },
                            { lcTitle: "事故费用赔入流程" },
                            { lcTitle: "事故费用报销流程" },
                            { lcTitle: "事故预结案流程" },
                            { lcTitle: "事故结案流程（四清）" },
                            { lcTitle: "车辆保险购买流程" },
                            { lcTitle: "车辆报销退保流程" },
                            { lcTitle: "车辆保险审核子流程" },
                            { lcTitle: "车辆保险报销子流程" },
                        ]
                    },
                    {
                        title: "工会业务流程",
                        listArr: [
                            { lcTitle: "工会合同审批流程" },
                            { lcTitle: "工会发文流程" },
                        ]
                    },
                ],
                businessLCData2: [
                    {
                        title: "机务部业务流程",
                        listArr: [
                            { lcTitle: "车辆保险购买流程" },
                            { lcTitle: "车辆报销退保流程" },
                            { lcTitle: "车辆保险审核子流程" },
                            { lcTitle: "车辆保险报销子流程" },
                            { lcTitle: "新能源充电服务/电池租赁/冗余资金申请流程" },
                        ]
                    },
                    {
                        title: "人事部业务流程",
                        listArr: [
                            { lcTitle: "招聘流程" },
                            { lcTitle: "人员调动审批流程" },
                            { lcTitle: "安全部业务流程" },
                            { lcTitle: "事故上报流程" },
                            { lcTitle: "辞职、退休审批流程" },
                            { lcTitle: "辞退审批流程" },
                            { lcTitle: "退休返聘流程" },
                            { lcTitle: "退休返聘结束流程" },
                            { lcTitle: "在职死亡流程" },
                            { lcTitle: "工伤上报流程" },
                        ]
                    },
                ],
            }
        },
        created () {
            this.$emit("sidebarActive", "2");     // 向父组件传入当前页面的高亮索引，刷新页面保持当前高亮菜单不变
        },
    }
</script>

<style lang="scss" scoped>
.a2-newadd {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 20px 27px 20px 31px;
    position: relative;

    .top-title {
        display: flex;
        align-items: center;

        img {
            width: 30px;
            height: 30px;
        }
        .top-title-text {
            font-size: 20px;
            font-weight: bold;
            color: #1555A0;
            margin-left: 9px;
        }
    }
    .a2-newadd-centent {
        height: calc(100% - 44px);
        margin-top: 14px;

        .content-row {
            width: 100%;
            height: 100%;
            overflow: hidden;

            .content-col {
                height: 100%;

                .centent-title {
                    width: 80%;
                    padding: 7px 4px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #454545;
                    border-bottom: 1px solid #7E7E7E;
                }
                .business-department {
                    width: 100%;
                }
                .lc-list-box {
                    width: 90%;
                    height: calc(100% - 20px);
                    margin-top: 20px;
                    overflow: auto;

                    .lc-list-row {

                        .lc-title {
                            font-size: 18px;
                            font-weight: bold;
                            color: #0669B2;
                        }
                        .lc-list {

                            .lc-list-one {
                                width: 100%;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                font-size: 16px;
                                font-weight: bold;
                                color: #7E7E7E;
                                margin-top: 19px;
                                cursor: pointer;
                            }
                        }
                    }
                    .lc-list-row + .lc-list-row {
                        margin-top: 56px;
                    }
                }
                .work-lc-list-bx {
                    width: 80%;
                    height: calc(100% - 58px);
                    overflow: auto;
                }
                .content-col-row {
                    height: calc(100% - 38px);

                    .el-col {
                        height: 100%;
                    }
                }
            }
        }
    }
}
</style>
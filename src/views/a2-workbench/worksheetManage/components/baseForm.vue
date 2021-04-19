<template>
    <div class="base-form-container">
        <div class="base-form-bottom">
            <el-form class="business-form" :inline="true" :model="baseFormBottom" label-width="110px">
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="工作单编号">
                            <el-input v-model="baseFormBottom.receptionUnit" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="日期">
                            <el-input v-model="baseFormBottom.visitorsNum" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="姓名">
                            <el-input v-model="baseFormBottom.planReceptionTime" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工号">
                            <el-input v-model="baseFormBottom.planEatTime" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="公司">
                            <el-input v-model="baseFormBottom.meaExpensesBudget" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-input v-model="baseFormBottom.yearBudget" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="换胆总数">
                            <el-input v-model="baseFormBottom.meaExpensesBudget" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="补胆总数">
                            <el-input v-model="baseFormBottom.yearBudget" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="table-box">
                <Table :dataList="dataList" :tableColumn="tableColumn"/>
            </div>
        </div>
    </div>
</template>

<script>
import Table from "./table"
    export default {
        components: {
            Table
        },
        data() {
            return {
                baseFormTop: {
                    processTitle: '',
                    processNum: '',
                    agent: '',
                    department: '',
                    applyTime: '',
                    urgency: '',
                },
                baseFormBottom: {
                    receptionUnit: '',
                    visitorsNum: '',
                    businessReasons: '',
                    planReceptionTime: '',
                    planEatTime: '',
                    estimateEatNum: '',
                    eatPerson: '',
                    meaExpensesBudget: '',
                    yearBudget: '',
                    surplusBudget: '',
                },
                tableColumn: [
                    { name: '场站', prop: 'cz'},
                    { name: '智能柜编号', prop: 'zngbh' },
                    { name: '操作类型', prop: 'czlx' },
                    { name: '数量', prop: 'sl' },
                    { name: '备注', prop: 'bz' },
                ],
                dataList: [
                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },
                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },
                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },
                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },
                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },
                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },
                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },
                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },

                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },
                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },
                    {
                        cz: "xxxxxxxxxxxx",
                        zngbh: "2021-01-01",
                        czlx: "张三",
                        sl: "111111111111",
                        bz: "xxx",
                    },
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
.base-form-container {

    .base-form-bottom {
        
        .business-form-text {
            font-size: 18px;
            font-weight: bold;
            color: #646464;
            margin: 20px 0 8px 4px;
        }
        .business-form {
            background: #fff;
            padding: 20px 30px 20px 20px;

            .business-reasons-input {
                height: 174px;
            }
        }
    }
    .table-box {
        width: 100%;
        height: 490px;
    }
    // 本页面公共表单样式
    .el-form-item {
        width: 100%;

        .el-form-item__label {
            color: #606266;
            font-size: 18px;
        }
    }
}
</style>
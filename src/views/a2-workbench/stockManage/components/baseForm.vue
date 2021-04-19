<template>
    <div class="base-form-container">
        <div class="base-form-top">
            <el-form class="base-form" :inline="true" :model="baseFormTop" label-width="110px">
                <el-row :gutter="50">
                    <el-col :span="6">
                        <el-form-item label="关联工作单号">
                            <el-input class="process-title-input" v-model="data.jobNo" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="操作人">
                            <el-input class="process-num-input" v-model="data.operateName" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="类型">
                            <el-input class="process-num-input" v-model="data.operateType" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="6">
                        <el-form-item label="时间">
                            <el-input class="process-num-input" v-model="data.updateTime" placeholder=""></el-input>
                        </el-form-item>
                    </el-col> -->
                </el-row>  
            </el-form>
        </div>
        <div class="table-box">
            <Table :dataList="data.sonList" :tableColumn="tableColumn"/>
        </div>
    </div>
</template>

<script>
import Table from "./table"
    export default {
        components: {
            Table
        },
        props: {
            data:""
        },
        data() {
            return {
                baseFormTop: {},
                tableColumn: [
                    { name: '票胆编号', prop: 'gallNo'},
                    { name: '扫描时间', prop: 'operateDate' },
                    { name: '备注', prop: 'remarks' },
                ],
                dataList: [
                    {
                        pdbh: "xxxxxxxxxxxx",
                        smsj: "2021-01-01",
                        bz: "xxxxxxxxx",
                    },
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
.base-form-container {

    .base-form-top {
        background: #fff;
        padding: 20px 30px 0 20px;
    }
    .base-form-bottom {

        .business-form-text {
            font-size: 18px;
            font-weight: bold;
            color: #646464;
            margin: 20px 0 8px 4px;
        }
        .business-form {
            background: #fff;
            padding: 20px 30px 76px 20px;

            .business-reasons-input {
                height: 174px;
            }
        }
    }
    .table-box {
        width: 100%;
        height: 680px;
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
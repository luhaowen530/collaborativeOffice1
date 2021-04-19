<template>
    <div class="base-form-container">
        <div class="base-form-top">
            <el-form class="base-form" :inline="true" :model="baseFormTop" label-width="110px">
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="关联工作单号">
                            <el-input class="process-title-input" v-model="baseFormTop.processTitle" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="操作人">
                            <el-input class="process-num-input" v-model="baseFormTop.processNum" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>  
            </el-form>
        </div>
        <div class="btnbox">
            <el-button type="primary" size="mini" @click="addRow">新增</el-button>
        </div>
        <div class="table-box">
            <Table v-if="tableshow"  :dataList="dataList" :tableColumn="tableColumn" @handleEdit="handleEdit" @handleAdd="handleAdd" @handleDelete="handleDelete"/>
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
            state: "",
            tableColumn: {
                type: Array,
            }
        },
        
        data() {
            return {
                tableshow: true,
                baseFormTop: {
                    processTitle: '',
                    processNum: '',
                    agent: '',
                    department: '',
                    applyTime: '',
                    urgency: '',
                },
            
                dataList: [
                    {
                        gallNo: "xxxxxxxxxxxx",
                        czr: "张三",
                        updateTime: "2222222",
                        bz: "xxxxxxxxx",
                    },
                ]
            }
        },
        methods: {
            addRow() {
                this.dataList.push({
                    gallNo: "",
                    czr: "",
                    updateTime: "",
                    bz: "",
                    show: true
                })
            },
            handleEdit(row) {
                this.tableshow = false
                row.show = true
                this.$nextTick(()=>{
                    this.tableshow = true
                })
            },
            handleAdd(row) {
                this.tableshow = false
                row.show = false
                this.$nextTick(()=>{
                    this.tableshow = true
                })
            },
            handleDelete(row) {
                this.dataList.splice(row.index,1)
            }
        }
    }
</script>

<style lang="scss" scoped>
.base-form-container {
    .btnbox {
        margin: 0 0 5px 5px
    }
    .base-form-top {
        background: #fff;
        padding: 20px 30px 0 20px;
    }
    .table-box {
        width: 100%;
        height: 460px;
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
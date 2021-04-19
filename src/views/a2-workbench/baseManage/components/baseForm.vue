<template>
    <div class="base-form-container">
        <div class="base-form-top">
            <el-form class="base-form" :inline="true" :model="baseFormTop" label-width="110px">
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="票胆编号">
                            <el-input class="process-title-input" id="code" v-model="baseFormTop.processTitle" @change="addRow" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="table-box">
            <Table v-if="tableshow" :dataList="dataList" :tableColumn="tableColumn" @handleAdd="handleAdd" @handleNoAdd="handleNoAdd"/>
        </div>
    </div>
</template>

<script>
import Table from "./table"
import { addBathBase } from "@/axios/a2-gateway"
    export default {
        components: {
            Table,
        },
        data() {
            return {
                baseFormTop: {
                    processTitle: '',
                },
                tableColumn: [
                    { name: '票胆编号', prop: 'gallNo'},
                    { name: '所在位置', prop: 'place' },
                    { name: '状态', prop: 'state' },
                    { name: '操作', prop: 'operation-son' }
                ],
                dataList: [],
                tableshow: true
            }
        },
        mounted() {
            document.getElementById('code').focus()
        },
        methods: {
            addRow() {
                this.dataList.push({
                    id: '',
                    gallNo: this.baseFormTop.processTitle,
                    place: "",
                    state: "闲置",
                    createName: JSON.parse(sessionStorage.getItem("user")).userName,
                    createBy:  JSON.parse(sessionStorage.getItem("user")).userId,
                    show: true
                })

                this.baseFormTop.processTitle = ''
            },
            handleAdd(row) {
                this.tableshow = false
                row.show = false
                this.$nextTick(()=>{
                    this.tableshow = true
                })
            },
            handleNoAdd(row) {
                this.dataList.splice(row.index,1)
            },
            //批量新增
            add() {
                let obj = {
                    list: this.dataList
                }
                console.log(obj)
                addBathBase(obj).then(response => {
                    if(response.data.code == 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$emit('refresh')
                    }else {
                        this.$message({
                            message: '添加失败',
                            type: 'error'
                        });
                    }
                })
            }
        }
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
        height: 600px;
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
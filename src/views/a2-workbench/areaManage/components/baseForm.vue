<template>
    <div class="base-form-container">
        <div class="base-form-top">
            <el-form class="base-form" :inline="true" :model="baseFormTop" label-width="110px">
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="区域">
                            <el-input v-model="baseFormTop.area" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区域描述">
                            <el-input v-model="baseFormTop.areaDetail" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="场站">
                            <el-select class="select" v-model="baseFormTop.parking" placeholder="">
                                <el-option
                                    v-for="item in carparkdata"
                                    :key="item.parkingName"
                                    :label="item.parkingName"
                                    :value="item.parkingName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="管理员">
                            <el-select class="select" v-model="baseFormTop.staffName" @change="selectedName" placeholder="">
                                <el-option
                                    v-for="item in persondata"
                                    :key="item.staffNo"
                                    :label="item.staffName"
                                    :value="item.staffName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工号">
                            <el-input v-model="baseFormTop.staffNo" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系方式">
                            <el-input v-model="baseFormTop.telephone" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="baseFormTop.remarks" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="title">
            <span>关联人员&nbsp;</span>
            <el-button type="primary" size="mini" @click="addNewRow">新 增</el-button>
        </div>
        <div class="table-box">
            <Table v-if="tableshow" :dataList="dataList" :persondata="persondata" :tableColumn="tableColumn" @handleAdd="handleAdd" @handleCancle="handleCancle" @handleLook="handleLook" @handleDelete="handleDelete"/>
        </div>


    </div>
</template>

<script>
import { addArea } from "@/axios/a2-gateway"
import Table from "./table"
    export default {
        components: {
            Table
        },
        props: {
            state: "",
            data: "",
            persondata: "",
            carparkdata: ""
        },
        data() {
            return {
                baseFormTop: {
                    id: '',
                    area: '',
                    areaDetail: '',
                    parking: '',
                    remarks: '',
                    staffName: '',
                    staffNo: '',
                    telephone: '',
                    state: '',
                    staffList: []
                },
                tableshow: true,
                tableColumn: [
                    { name: '管理员', prop: 'staffName' },
                    { name: '工号', prop: 'staffNo' },
                    { name: '联系方式', prop: 'telephone' },
                    { name: '操作', prop: 'operation' }
                ],
                dataList: []
            }
        },
        created() {
            console.log(this.carparkdata)
            if(this.state == 1) {
                this.baseFormTop.id = ""
                this.baseFormTop.area = ""
                this.baseFormTop.areaDetail = ""
                this.baseFormTop.parking = ""
                this.baseFormTop.remarks = ""
                this.baseFormTop.staffName = ""
                this.baseFormTop.staffNo = ""
                this.baseFormTop.telephone = ""
                this.baseFormTop.state = ""
                this.baseFormTop.staffList = ""
                this.dataList = []
            }else {
                this.baseFormTop.id = this.data.id
                this.baseFormTop.area = this.data.area
                this.baseFormTop.areaDetail = this.data.areaDetail
                this.baseFormTop.parking = this.data.parking
                this.baseFormTop.remarks = this.data.remarks
                this.baseFormTop.staffName = this.data.staffName
                this.baseFormTop.staffNo = this.data.staffNo
                this.baseFormTop.telephone = this.data.telephone
                this.baseFormTop.state = this.data.state
                this.baseFormTop.staffList = this.data.staffList
                this.dataList = this.data.staffList
            }
            
        },
        watch: {
            data: function(newVal,oldVal){   
                if(this.state == 1) {
                    this.baseFormTop = {
                        id: '',
                        area: '',
                        areaDetail: '',
                        parking: '',
                        remarks: '',
                        staffName: '',
                        staffNo: '',
                        telephone: '',
                        state: '',
                        staffList: []
                    }
                    this.dataList = []
                }
                if(this.state == 2) {
                    this.baseFormTop = {
                        id: newVal.id,
                        area: newVal.area,
                        areaDetail: newVal.areaDetail,
                        parking: newVal.parking,
                        remarks: newVal.remarks,
                        staffName: newVal.staffName,
                        staffNo: newVal.staffNo,
                        telephone: newVal.telephonev,
                        state: newVal.state,
                        staffList: newVal.staffList
                    }
                    this.dataList = newVal.staffList
                }
            }
        },
        
        methods: {
            addNewRow() {
                this.dataList.push({
                    area: "",
                    staffName: "",
                    staffNo: "",
                    telephone: "",
                    show: true
                })
            },
            add(){
                let obj = {
                    id: this.baseFormTop.id,
                    area: this.baseFormTop.area,
                    areaDetail: this.baseFormTop.areaDetail,
                    parking: this.baseFormTop.parking,
                    remarks: this.baseFormTop.remarks,
                    staffName: this.baseFormTop.staffName,
                    staffNo: this.baseFormTop.staffNo,
                    telephone: this.baseFormTop.telephone,
                    state: this.baseFormTop.state,
                    staffList: this.dataList,
                }
                addArea(obj).then(response => {
                    if(response.data.code == 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.baseFormTop.id = ""
                        this.baseFormTop.area = ""
                        this.baseFormTop.areaDetail = ""
                        this.baseFormTop.parking = ""
                        this.baseFormTop.remarks = ""
                        this.baseFormTop.staffName = ""
                        this.baseFormTop.staffNo = ""
                        this.baseFormTop.telephone = ""
                        this.baseFormTop.state = ""
                        this.baseFormTop.staffList = ""
                        this.dataList = []
                        this.$emit('refresh')
                    }else {
                        this.$message({
                            message: '添加失败',
                            type: 'error'
                        });
                    }
                })
            },
            handleLook(row) {
                this.tableshow = false
                row.show = true
                this.$nextTick(()=>{
                    this.tableshow = true
                })
            },
            handleDelete(row) {
                this.dataList.splice(row.index,1)
            },
            handleAdd(row) {
                this.tableshow = false
                row.show = false
                this.$nextTick(()=>{
                    this.tableshow = true
                })
            },
            handleCancle(row) {
                this.dataList.splice(row.index,1)
            },
            selectedName() {
                console.log(this.baseFormTop.staffName)
                var a = this.persondata.find(item => {
                    return item.staffName == this.baseFormTop.staffName
                })
                console.log(a)
                this.baseFormTop.staffNo = a.staffNo
                this.baseFormTop.telephone = a.telephone
            },
        }
    }
</script>

<style lang="scss" scoped>
.base-form-container {
    .title {
        font-size: 20px;
        color: rgb(7,105,177);
        font-size: 600;
        margin-left: 15px;
        display: flex;
        align-items: center;
    }
    .base-form-top {
        background: #fff;
        padding: 20px 30px 0 20px;

        .select {
            width: 100%
        }
    }

    .table-box {
        width: 100%;
        height: 450px;
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
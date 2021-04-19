<template>
    <div class="base-form-container">
        <div class="base-form-top">
            <el-form class="base-form" :inline="true" :model="baseFormTop" label-width="110px">
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="操作人">
                            <el-input v-model="baseFormTop.updateName" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="智能柜类型">
                            <el-input v-model="baseFormTop.counterType" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="箱格规格">
                            <el-input v-model="baseFormTop.specs" v-on:input="search" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="箱格数量">
                            <el-input v-model="baseFormTop.boxNum" type="number" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="baseFormTop.remark" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        
    </div>
</template>

<script>
import { addQuantity } from "@/axios/a2-gateway"
    export default {
        props: {
            state:  "",
            data: {
                default: () => ({
                    
                })
            }
        },
        data() {
            return {
                baseFormTop: {
                    id: '',
                    updateName: '',
                    counterType: '',
                    specs: '',
                    boxNum: '',
                    remark: '',
                },
            }
        },
        created() {
            this.baseFormTop.id = this.data.id
            this.baseFormTop.updateName = this.data.updateName
            this.baseFormTop.counterType = this.data.counterType
            this.baseFormTop.specs = this.data.specs
            this.baseFormTop.boxNum = this.data.boxNum
            this.baseFormTop.remark = this.data.remark
        },
        watch: {
            data: function(newVal,oldVal){   
                if(this.state == 1) {
                    this.baseFormTop = {
                        id: '',
                        updateName: '',
                        counterType: '',
                        specs: '',
                        boxNum: '',
                        remark: '',
                    }
                }
                if(this.state == 2) {
                    this.baseFormTop = {
                        id: newVal.id,
                        updateName: newVal.updateName,
                        counterType: newVal.counterType,
                        specs: newVal.specs,
                        boxNum: newVal.boxNum,
                        remark: newVal.remark,
                    }
                }
            }
        },
        
        methods: {
            search() {
                if(this.baseFormTop.specs == '') {
                    return false
                }else {
                    if(this.baseFormTop.specs.indexOf('*') != -1) {
                        let a = this.baseFormTop.specs.slice(0,this.baseFormTop.specs.indexOf('*'))
                        let b = this.baseFormTop.specs.slice(this.baseFormTop.specs.indexOf('*')+1)
                        this.baseFormTop.boxNum = a * b
                    }
                }
            },
            add(){
                let obj = {
                    id: this.baseFormTop.id,
                    updateName: this.baseFormTop.updateName,
                    counterType: this.baseFormTop.counterType,
                    specs: this.baseFormTop.specs,
                    boxNum: this.baseFormTop.boxNum,
                    remark: this.baseFormTop.remark,
                }
                addQuantity(obj).then(response => {
                    if(response.data.code == 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.baseFormTop.id = ''
                        this.baseFormTop.updateName = ''
                        this.baseFormTop.counterType = ''
                        this.baseFormTop.specs = ''
                        this.baseFormTop.boxNum = ''
                        this.baseFormTop.remark = ''
                        this.$emit('refresh')
                    }else {
                        this.$message({
                            message: '添加失败',
                            type: 'error'
                        });
                    }
                })
            },
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
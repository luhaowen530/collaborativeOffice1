<template>
    <div class="base-form-container">
        <div class="base-form-top">
            <el-form class="base-form" :inline="true" :model="baseFormTop" label-width="110px">
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="票胆编号">
                            <el-input v-model="baseFormTop.gallNo" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="所在位置">
                            <el-input v-model="baseFormTop.place" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="状态">
                            <el-input v-model="baseFormTop.state" :readonly="true" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        
    </div>
</template>

<script>
import { addBase } from "@/axios/a2-gateway"
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
                    gallNo: '',
                    place: '',
                    state: '',
                },
            }
        },
        created() {
            console.log(this.data)
            this.baseFormTop.id = this.data.id
            this.baseFormTop.gallNo = this.data.gallNo
            this.baseFormTop.place = this.data.place
            if(!this.data.state) {
                this.baseFormTop.state = '闲置'
            }else {
                this.baseFormTop.state = this.data.state
            }
            
        },        
        methods: {
            add(){
                let obj = {
                    id: this.baseFormTop.id,
                    gallNo: this.baseFormTop.gallNo,
                    place: this.baseFormTop.place,
                    state: this.baseFormTop.state,
                    createName: JSON.parse(sessionStorage.getItem("user")).userName,
                    createBy: JSON.parse(sessionStorage.getItem("user")).userId,
                }

                addBase(obj).then(response => {
                    if(response.data.code == 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.baseFormTop.gallNo = ''
                        this.baseFormTop.place = ''
                        this.baseFormTop.state = ''
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
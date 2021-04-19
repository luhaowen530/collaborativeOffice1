<template>
    <div class="a2-needdealt-top">
        <div class="top-title">
            <img src="@/assets/container/menu-logo.png" alt="">
            <span class="top-title-text">智能柜操作记录管理</span>
        </div>
        <div class="top-search-row">
            <el-form class="top-search-form" :inline="true" :model="topForm">
                <el-form-item label="姓名">
                    <el-input class="process-title-input" v-model="topForm.processTitle" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="岗位">
                    <el-input class="created-person-input" v-model="topForm.createdPerson" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="操作开始时间">
                    <el-input class="process-status-input" v-model="topForm.processStatus" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="操作类型">
                    <el-input class="process-status-input" v-model="topForm.processStatus" placeholder="请输入标题"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button type="info">重置</el-button>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            searchObj: {
                type: Object,
                default: {}
            },
        },
        data() {
            return {
                topForm: {
                    processTitle: '',
                    createdPerson: '',
                    processStatus: '',
                }
            }
        },
        methods: {
            // 点击查询事件
            handleSearch(){
                this.searchObj.processTitle = this.topForm.processTitle
                this.searchObj.createdPerson = this.topForm.createdPerson
                this.searchObj.processStatus = this.topForm.processStatus
                this.$emit("search", this.searchObj)
            }
        }
    }
</script>

<style lang="scss" scoped>
.a2-needdealt-top {
    margin-bottom: 43px;

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
    .top-search-row {
        margin-top: 25px;
        display: flex;
        padding: 0 34px 0 8px;
        justify-content: space-between;

        .top-search-form {

            .el-form-item {
                margin-bottom: 0;

                .process-title-input,
                .created-person-input,
                .process-status-input {
                    width: 200px;
                }
            }
            .el-form-item {
                margin: 0 2px 0 56px;
            }
        }
    }
}
</style>
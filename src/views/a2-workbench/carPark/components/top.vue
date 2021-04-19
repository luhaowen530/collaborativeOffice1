<template>
    <div class="a2-needdealt-top">
        <div class="top-title">
            <img src="@/assets/container/menu-logo.png" alt="">
            <span class="top-title-text">停车场管理</span>
        </div>
        <div class="top-search-row">
            <el-form class="top-search-form" :inline="true" :model="topForm">
                <el-form-item label="停车场名称">
                    <el-input class="process-title-input" v-model="topForm.processTitle" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="停车场类别">
                    <el-input class="created-person-input" v-model="topForm.createdPerson" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input class="process-status-input" v-model="topForm.processStatus" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="智能柜状态">
                    <el-input class="process-status-input" v-model="topForm.status" placeholder="请输入标题"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button type="info" @click="reload">重置</el-button>
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
                    status: ''
                }
            }
        },
        methods: {
            // 点击查询事件
            handleSearch(){
                this.searchObj.processTitle = this.topForm.processTitle
                this.searchObj.createdPerson = this.topForm.createdPerson
                this.searchObj.processStatus = this.topForm.processStatus
                this.searchObj.status = this.topForm.status
                this.$emit("search", this.searchObj)
            },
            reload() {
                this.$emit("reload")
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
                    width: 180px;
                }
            }
            .el-form-item {
                margin: 0 2px 0 56px;
            }
        }
    }
}
</style>
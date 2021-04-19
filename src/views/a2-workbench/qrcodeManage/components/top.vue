<template>
    <div class="a2-needdealt-top">
        <div class="top-title">
            <img src="@/assets/container/menu-logo.png" alt="">
            <span class="top-title-text">票胆管理 》二维码管理</span>
        </div>
        <div class="top-search-row">
            <el-form class="top-search-form" :inline="true" :model="topForm">
                <el-form-item label="编号" label-width="80px">
                    <el-input class="process-title-input" v-model="topForm.single" placeholder="请输入标题"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="primary" @click="singleQR">生成二维码</el-button>
            </div>
        </div>
        <div class="top-search-row">
            <el-form class="top-search-form" :inline="true" :model="topForm">
                <el-form-item label="起始编号"  label-width="80px">
                    <el-input class="process-title-input" v-model="topForm.start" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="结束编号">
                    <el-input class="process-title-input" v-model="topForm.end" placeholder="请输入标题"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="primary" @click="sizeQR">生成二维码</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                topForm: {
                    single: '',
                    start: '',
                    end: '',
                }
            }
        },
        methods: {
            singleQR() {
                this.$parent.single()
            },
            sizeQR() {
                this.$parent.size()
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
        // justify-content: space-between;

        .top-search-form {
            margin-right: 20px;
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
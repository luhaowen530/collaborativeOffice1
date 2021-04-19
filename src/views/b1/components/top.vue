<template>
    <div class="a1-top">
        <el-row type="flex" :gutter="20">
            <el-col :span="7">
                <div class="a1-top-list">
                    <div class="label-left">输入框：</div>
                    <div class="input-right">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="a1-top-list">
                    <div class="label-left">下拉框：</div>
                    <div class="input-right">
                        <el-select v-model="type" placeholder="请选择" class="input-select">
                            <el-option v-for="item in operationType" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="a1-top-list a1-top-btn">
                    <el-button @click="drawer = true" type="primary">点我打开</el-button>
                    <el-button type="primary" plain @click="dialogFormVisible = true">新增弹框</el-button>
                    <el-button icon="el-icon-circle-plus-outline" type="primary" plain >新增</el-button>
                    <el-button type="primary" icon="el-icon-search">查询</el-button>
                    <el-button icon="el-icon-refresh">重置</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" :gutter="20">
            <el-col :span="7">
                <div class="a1-top-list">
                    <div class="label-left">日期：</div>
                    <div class="input-right">
                         <el-date-picker
                            class="input-date"
                            v-model="date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
        </el-row>
        <add-dialog :dialogFormVisible='dialogFormVisible' @closeDialog="dialogFormVisible = false"></add-dialog>
        <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :with-header="false">
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>

<script>
    import addDialog from "./addDialog"
    export default {
        components: {
            addDialog
        },
        data(){
            return {
                input: "",
                type: "",
                operationType: [
                    { label: '全部', value: '' }, 
                    { label: '查询', value: 'search' }, 
                    { label: '添加', value: 'add' }, 
                    { label: '更新', value: 'update' }, 
                    { label: '删除', value: 'delete' }, 
                    { label: '下载', value: 'download' }
                ],
                date: "",
                dialogFormVisible: false,
                drawer: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .a1-top {
        .a1-top-list {
            font-size: 14px;
            color: #5A5E66;

            .label-left {
                width: 84px;
                float: left;
                line-height: 36px;
                text-align: right;
            }

            .label-left.oneAttack {
                width: 70px;
            }

            .input-right.oneAttack-right {
                width: calc(100% - 70px);
            }

            .input-right {
                float: left;
                position: relative;
                width: calc(100% - 84px);

                .input-select {
                    width: 100%;
                    position: relative;
                }
                .input-date {
                    width: 100%;
                }
            }
        }

        .a1-top-list.a1-top-btn {
            float: left;
            margin-left: 25px;
            button {
                float: right;
            }

            button:nth-of-type(1) {
                margin-left: 11px;
            }
        }

        .el-row {
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
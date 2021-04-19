<template>
    <el-table class="meeting-table" :data="dataList" stripe v-loading="loading" height="100%" header-row-class-name="head-style">
        <el-table-column v-if="ifselect" type="selection" width="30" style="white-space:nowrap;"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="70" style="white-space:nowrap;"></el-table-column>
        <el-table-column align="center" :label="item.name" v-for="(item, index) in tableColumn" :key="index" :prop="item.prop" :width="item.prop == 'operation' ? 400: ''">
            <div slot-scope="scope">
                <template v-if="item.prop == 'operation'">
                    <el-button size="small" type="primary" @click="handleLook(scope.row)">查看</el-button>
                    <el-button size="small" type="primary" @click="handleForward(scope.row)">入库</el-button>
                    <el-button size="small" type="info" @click="handleCode(scope.row)">出库</el-button>
                    <el-button size="small" type="info" @click="handleForward(scope.row)">推送</el-button>
                    <el-button size="small" type="info" @click="handleForward(scope.row)">删除</el-button>
                </template>
                <template v-else>{{scope.row[item.prop]}}</template>
            </div>
        </el-table-column>
    </el-table>
</template>

<script>
import { parseTime } from '@/utils'
export default {
    props: {
        dataList: {
            type: Array,
            default: []
        },
        loading: {
            type: Boolean,
            default: false
        },
        ifselect: {
            default: false
        },
        tableColumn: {
            type: Array,
        }
    },
    data() {
        return {
            // tableColumn: [
            //     { name: '工作单编号', prop: 'proTitle'},
            //     { name: '日期', prop: 'proName' },
            //     { name: '姓名', prop: 'proStatus' },
            //     { name: '工号', prop: 'proUrgentStatus' },
            //     { name: '联系方式', prop: 'department' },
            //     { name: '状态', prop: 'status' },
            //     { name: '换胆数量', prop: 'changeNum' },
            //     { name: '补胆数量', prop: 'addNum' },
            //     { name: '操作', prop: 'operation' }
            // ]
        }
    },
    methods: {
        // 点击查看事件
        handleLook(row) {
            this.$emit("handleLook", row)
        },
        // 点击二维码事件
        handleCode(row) {
            this.$emit("handleCode", row)
        },
        // 点击转发事件
        handleForward(row) {
            this.$emit("handleForward", row)
        },
    },
}
</script>

<style lang="scss" scoped>

</style><style lang="scss">
.meeting-table {
    width: 100%;
    
    .head-style {
        th {
            background: #EEF0F6;
        }
    }
    th,
    td {
        height: 60px;
        padding: 12px 0;
        border-bottom: none;
    }
}
</style>

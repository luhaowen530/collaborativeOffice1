<template>
    <el-table class="meeting-table" :data="dataList" stripe v-loading="loading" height="100%" header-row-class-name="head-style">
        <el-table-column type="selection" width="30" style="white-space:nowrap;"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="70" style="white-space:nowrap;"></el-table-column>
        <el-table-column align="center" :label="item.name" v-for="(item, index) in tableColumn" :key="index" :prop="item.prop">
            <div slot-scope="scope">
                <template v-if="item.prop == 'operation'">
                    <el-button size="small" type="primary" @click="handleLook(scope.row)">查看</el-button>
                    <el-button size="small" type="info" @click="handleForward(scope.row)">转发</el-button>
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
        }
    },
    data() {
        return {
            tableColumn: [
                { name: '停车场名称', prop: 'parkingName'},
                { name: '停车场类别', prop: 'parkingType' },
                { name: '联系人', prop: 'contactName' },
                { name: '联系方式', prop: 'telephone' },
                { name: '智能柜数量', prop: 'contact' },
                // { name: '操作', prop: 'operation' }
            ]
        }
    },
    methods: {
        // 点击查看事件
        handleLook(row) {
            this.$emit("handleLook", row)
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

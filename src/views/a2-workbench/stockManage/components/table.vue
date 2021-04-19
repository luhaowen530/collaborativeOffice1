<template>
    <el-table class="meeting-table" :data="dataList" stripe v-loading="loading" height="100%" :row-class-name="tableRowClassName" header-row-class-name="head-style">
        <el-table-column v-if="ifselect" type="selection" width="30" style="white-space:nowrap;"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="70" style="white-space:nowrap;"></el-table-column>
        <el-table-column align="center" :label="item.name" v-for="(item, index) in tableColumn" :key="index" :prop="item.prop">
            <div slot-scope="scope">
                <template v-if="item.prop == 'operation'">
                    <!-- <el-button size="small" type="primary" @click="handleLook(scope.row)">查看详情</el-button> -->
                </template>
                <template v-if="item.prop == 'son-operation'  && !scope.row.show">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="info" @click="handleDelete(scope.row)">删除</el-button>
                </template>
                <template v-if="item.prop == 'son-operation'  && scope.row.show == true">
                    <el-button size="small" type="primary" @click="handleAdd(scope.row)">确定</el-button>
                </template>

                <template v-else-if="item.prop == 'updateTime'  && scope.row.show == true">
                    <el-input
                      v-model="scope.row[item.prop]"
                      :readonly="true"
                    >
                    </el-input>
                </template>

                <template v-else-if="item.prop == 'gallNo'  && scope.row.show == true">
                    <el-input
                      v-model="scope.row[item.prop]"
                      v-focus
                    >
                    </el-input>
                </template>

                <template v-else-if="scope.row.show == true  && index == 0">
                    <el-input
                      v-model="scope.row[item.prop]"  
                      v-focus
                    >
                    </el-input>
                </template>
                <template v-else-if="scope.row.show == true && index != 0">
                    <el-input
                      v-model="scope.row[item.prop]"
                    >
                    </el-input>
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

        }
    },
    methods: {
        tableRowClassName ({row, rowIndex}) {
            row.index = rowIndex;
        },
        // 点击查看事件
        handleLook(row) {
            this.$emit("handleLook", row)
        },
        // 点击编辑事件
        handleEdit(row) {
            this.$emit("handleEdit", row)
        },
        // 点击确定事件
        handleAdd(row) {
            this.$emit("handleAdd", row)
        },
        // 点击删除事件
        handleDelete(row) {
            this.$emit("handleDelete", row)
        }
    },
    directives: {
        focus: {
        inserted: function(el) {
            el.children[0].focus();
        }
        }
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

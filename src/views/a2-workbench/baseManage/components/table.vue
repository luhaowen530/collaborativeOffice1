<template>
    <el-table ref="multipleTable" class="meeting-table" :data="dataList" stripe v-loading="loading" height="100%" :row-class-name="tableRowClassName" header-row-class-name="head-style">
        <el-table-column v-if="ifselect" type="selection" width="30" style="white-space:nowrap;"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="70" style="white-space:nowrap;"></el-table-column>
        <el-table-column align="center" :label="item.name" v-for="(item, index) in tableColumn" :key="index" :prop="item.prop" :width="item.prop == 'operation' ? 300: ''">
            <div slot-scope="scope">
                <template v-if="item.prop == 'operation' && !scope.row.show">
                    <el-button size="small" type="primary" @click="handleCode(scope.row)">生成二维码</el-button>
                    <el-button size="small" type="primary" @click="handleLook(scope.row)">编辑</el-button>
                    <el-button size="small" type="info" @click="handleDelete(scope.row)">删除</el-button>
                </template>
                <template v-else-if="item.prop == 'operation-son' && scope.row.show == true">
                    <el-button size="small" type="primary" @click="handleAdd(scope.row)">确定</el-button>
                    <el-button size="small" type="info" @click="handleNoAdd(scope.row)">删除</el-button>
                </template>
                <template v-else-if="item.prop == 'operation-son' && scope.row.show == false">
                    <el-button size="small" type="info" @click="handleNoAdd(scope.row)">删除</el-button>
                </template>

                <template v-else-if="item.prop == 'gallNo'  && scope.row.show == true">
                    <el-input
                      v-model="scope.row[item.prop]"
                      :readonly="true"
                    >
                    </el-input>
                </template>

                <template v-else-if="item.prop == 'state'  && scope.row.show == true">
                    <el-input
                      v-model="scope.row[item.prop]"
                      :readonly="true"
                    >
                    </el-input>
                </template>


                <template v-else-if="scope.row.show == true  && index == 1">
                    <el-input
                      v-model="scope.row[item.prop]"  
                      v-focus
                    >
                    </el-input>
                </template>
                <template v-else-if="scope.row.show == true && index != 1">
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
            default: []
        },
    },
    data() {
        return {
            // tableColumn: [
            //     { name: '票胆编号', prop: 'gallNo'},
            //     { name: '状态', prop: 'state' },
            //     { name: '所在位置', prop: 'place' },
            //     { name: '状态更新时间', prop: 'createTime' },
            //     { name: '操作人', prop: 'createName' },
            //     { name: '操作', prop: 'operation' }
            // ]
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
        //点击二维码事件
        handleCode(row) {
            this.$emit("handleCode", row)
        },
        // 点击转发事件
        handleDelete(row) {
            this.$emit("handleDelete", row)
        },
        handleAdd(row) {
            this.$emit("handleAdd", row)
        },
        handleNoAdd(row) {
            this.$emit("handleNoAdd", row)
        },
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

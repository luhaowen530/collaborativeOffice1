<template>
    <el-table ref="multipleTable" class="meeting-table" :data="dataList" stripe v-loading="loading" height="100%" :row-class-name="tableRowClassName" header-row-class-name="head-style">
        <el-table-column v-if="ifselect" type="selection" width="30" style="white-space:nowrap;"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="70" style="white-space:nowrap;"></el-table-column>
        <el-table-column align="center" :label="item.name" v-for="(item, index) in tableColumn" :key="index" :prop="item.prop">
            <div slot-scope="scope">
                <template v-if="item.prop == 'operation' && !scope.row.show">
                    <el-button size="small" type="primary" @click="handleLook(scope.row)">编辑</el-button>
                    <el-button size="small" type="info" @click="handleDelete(scope.row)">删除</el-button>
                </template>
                <template v-else-if="item.prop == 'operation' && scope.row.show == true">
                    <el-button size="small" type="primary" @click="handleAdd(scope.row)">确定</el-button>
                    <el-button size="small" type="info" @click="handleCancle(scope.row)">取消</el-button>
                </template>
                
                <template v-else-if="item.prop == 'staffName'  && scope.row.show == true">
                    <el-select v-model="scope.row[item.prop]" @change="selectedName(scope.row)">
                        <el-option
                            v-for="item in persondata"
                            :key="item.staffNo"
                            :label="item.staffName"
                            :value="item.staffName">
                        </el-option>
                    </el-select>
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
        dataList: "",
        loading: {
            type: Boolean,
            default: false
        },
        ifselect: {
            default: false
        },
        tableColumn: {
            type: Array,
        },
        persondata: ""
    },
    data() {
        return {
            
        }
    },
    methods: {
        tableRowClassName ({row, rowIndex}) {
            row.index = rowIndex;
        },

        handleLook(row) {
            this.$emit("handleLook", row)
        },

        handleDelete(row) {
            this.$emit("handleDelete", row)
        },

        handleAdd(row) {
            this.$emit("handleAdd", row)
        },

        handleCancle(row) {
            this.$emit("handleCancle", row)
        },

        selectedName(row) {
            var a = this.persondata.find(item => {
                return item.staffName == row.staffName
            })
            row.staffNo = a.staffNo
            row.telephone = a.telephone
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

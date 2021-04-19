<template>
  <div class="a1-table-container">
    <el-table :data="list" v-loading="loading" border style="width: 100%;" :row-class-name="tableRowClassName">
      <el-table-column align="center" :label="item.name" label-class-name="color-row" v-for="item in tableColumn" :key="item.id" :min-width="item.minWidth" :prop="item.prop">
        <div slot-scope="scope">
          <template v-if="item.prop == 'operation'">
            <el-button size="mini">查看</el-button>
            <el-button size="mini">修改</el-button>
            <el-button size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
          <template v-else>{{scope.row[item.prop]}}</template>
        </div>
      </el-table-column>
    </el-table>
    <div class="position-right">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchObj.page + 1" :page-sizes="[5, 10, 20, 30, 40]" :page-size="searchObj.size" layout="total, sizes, prev, pager, next, jumper" :total="allData.totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import dialog from '@/assets/eventBus'
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    allData: {
      type: Object,
      default: {}
    },
    searchObj: {
      type: Object,
      default: {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      tableColumn: []
    }
  },
  created() {
    this.tableColumn = [{ name: '序号', minWidth: 56, prop: 'indexNumber' },{ name: '标题', minWidth: 121, prop: 'title' },
      { name: '期次', minWidth: 118, prop: 'period' }, { name: '创建人', minWidth: 119, prop: 'buildPerson' }, 
      { name: '创建时间', minWidth: 119, prop: 'buildTime' }, { name: '发布状态', minWidth: 118, prop: 'state' }, 
      { name: '操作', minWidth: 121, prop: 'operation' }]
  },
  methods: {
   tableRowClassName({ row, rowIndex }) {
      if (rowIndex%2 != 0) {
        return 'color-row';
      }
      return '';
    },
    handleClick(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      this.searchObj.size = val
      this.searchObj.page = 0
      this.$emit('handleCurrentChange', this.searchObj)
    },
    handleCurrentChange(val) {
      this.searchObj.page = val - 1
      this.$emit('handleCurrentChange', this.searchObj)
    },
    del(id){

    }
  },
};
</script>

<style lang="scss">
.a1-table-container {
  padding-top: 20px;

  .el-table {
    font-size: 12px;

    & .color-row {
      background: #f7f8fa;
    }

  }

  .position-right {
    height: 60px;
    padding-top: 20px;

    & .el-pagination {
      float: right;
    }
  }
}
</style>

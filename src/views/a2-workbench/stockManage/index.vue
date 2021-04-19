<template>
    <div class="a2-needdealt">
        <top :searchObj="searchObj" ref="needdealtTop" @search="searchTableList"  @reload="reload"  @refreshTableList="pagination" />
        <div class="a2-process-list">
            <!-- <el-button type="primary" @click="stockout">扫码出库</el-button>
            <el-button type="primary" @click="stockin">扫码入库</el-button> -->
            <el-button type="info">导出</el-button>
        </div>
        <!-- <div class="table-title">出入库日志</div> -->
        <div class="needdealt-table">
            <needdealt-table  :dataList="dataList" :ifselect="true" :tableColumn="tableColumn" @handleLook="handleLook" @handleForward="handleForward" />
        </div>
        <pagination v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize" @pagination="pagination" />

        <needdealt-dialog :visible.sync="showDialog" :data="propdata"/>
        <stock-dialog :state="state" :visible.sync="showStockDialog" v-if="showStockDialog"/>
    </div>
</template>

<script>
    import top from "./components/top"
    import needdealtTable from "./components/table"
    import pagination from "@/components/Apagination"
    import needdealtDialog from "./components/dialog"
    import stockDialog from "./components/dialogStock"

    import { getStock } from "@/axios/a2-gateway"
    import exportStock from "@/axios/a2-gateway"
    export default {
        components: {
            top,
            needdealtTable,
            pagination,
            needdealtDialog,
            stockDialog
        },
        data() {
            return {
                dataList: [],
                old_dataList: [],
                select_dataList: [],
                total: 10,
                tableColumn: [
                    { name: '类型', prop: 'operateType'},
                    { name: '关联工作单号', prop: 'jobNo' },
                    { name: '经办人', prop: 'operateName' },
                    { name: '时间', prop: 'updateTime' },
                    // { name: '操作', prop: 'operation' }
                ],
                loading: false,
                searchObj: {

                },
                showDialog: false,
                showStockDialog: false,
                showNarrowDialog: false,
                narrowTitle: "",
                currentPage: 1,
                pageSize: 10,
                state: "",
                propdata: {}
            }
        },
        created () {
            this.$emit("sidebarActive", "3-2");    // 向父组件传入当前页面的高亮索引，刷新页面保持当前高亮菜单不变
            this.getTableList()
        },
        methods: {
            // 请求表格数据
            getTableList(){
                this.loading = true
                let obj = {
                    
                }
               
                getStock().then(response => {
                    if(response.data.code == 200) {
                        console.log(response.data.data)
                            this.dataList = response.data.data
                            this.old_dataList = response.data.data
                            this.dataList = this.dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                            this.total = response.data.data.length   
                    }else {

                    }
                })
            },
            refresh() {
              this.getTableList()  
            },
            // 分页方法
            pagination() {   
                if(this.$refs.needdealtTop.topForm.processTitle != ''
                    || this.$refs.needdealtTop.topForm.createdPerson != ''
                    || this.$refs.needdealtTop.topForm.processStatus != '') {
                        this.dataList = this.select_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                }else {
                    this.dataList = this.old_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                }
            },
            // 接收top组件传来的查询事件
            searchTableList(obj){
                this.loading = true 
                var arr = this.old_dataList.filter((item)=> {
                    return item.operateType.indexOf(obj.processTitle) != -1
                            && item.jobNo.indexOf(obj.createdPerson) != -1
                            && item.operateName.indexOf(obj.processStatus) != -1
                })
                this.select_dataList = arr
                this.dataList = arr.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                this.total = arr.length
                this.loading = false
            },
            //重置
            reload() {
                this.$refs.needdealtTop.topForm.processTitle = '';
                this.$refs.needdealtTop.topForm.createdPerson = '';
                this.$refs.needdealtTop.topForm.processStatus = '';
                this.currentPage = 1;
                this.pageSize = 10
                this.total = this.old_dataList.length
                this.dataList = this.old_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
            },
            // 扫码出库
            stockout() {
                this.state = 1
                this.showStockDialog = true;
            },
            // 扫码入库
            stockin() {
                this.state = 2
                this.showStockDialog = true;
            }, 
            // 接收table组件传来的查看事件
            handleLook(row){
                this.propdata = row
                this.showDialog = true;
            },
            // 接收table组件传来的转发事件
            handleForward(){

            },
            // 接收dialog组件传来的缩小事件
            narrowDialog(title){
                this.narrowTitle = title
                this.showNarrowDialog = true
                this.showDialog = false;
            },
            // 放大dialog
            enlargeDialog(){
                this.showNarrowDialog = false
                this.showDialog = true;
            },
            // 关闭缩小后的dialog
            closeNarrowDialog(){
                this.showNarrowDialog = false
            },
        },
    }
</script>

<style lang="scss" scoped>
.a2-needdealt {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 20px 27px 4px 31px;
    position: relative;

    .a2-process-list {
        font-size: 20px;
        font-weight: bold;
        color: #454545;
        margin: 0 0 9px 8px;
    }
    .needdealt-table {
        height: calc(100% - 236px);
        box-sizing: border-box;
    }
    .narrow-dialog {
        width: 426px;
        height: 50px;
        background: #F4F4F4;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        right: 14px;
        bottom: 18px;

        .narrow-dialog-title {
            width: 286px;
            font-size: 20px;
            font-weight: bold;
            color: #1555A0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .narrow-dialog-enlarge {
            cursor: pointer;
        }
        .narrow-dialog-close {
            cursor: pointer;
        }
    }
    .table-title {
        font-size: 22px;
        color: rgb(7, 105, 178);
        padding-left: 10px;
        margin-top: 15px;
        margin-bottom: 15px;
    }
}
</style>
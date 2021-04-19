<template>
    <div class="a2-needdealt">
        <top :searchObj="searchObj" ref="needdealtTop" @search="searchTableList" @reload="reload" @refreshTableList="pagination" />
        <div class="a2-process-list">
            <el-button type="primary" @click="add">新增</el-button>
            <el-button type="info" @click="groupDelete">批量删除</el-button>
        </div>
        <div class="needdealt-table">
            <needdealt-table ref="multipleTable" :dataList="dataList" @handleLook="handleLook" @handleDelete="handleDelete" />
        </div>
        <pagination v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize" @pagination="pagination" />

        <needdealt-dialog :visible.sync="showDialog" :state="state" :data="propdata" @narrowDialog="narrowDialog" @refresh="refresh"/>
        
        <div class="narrow-dialog" v-if="showNarrowDialog">
            <div class="narrow-dialog-title">{{ narrowTitle }}</div>
            <div class="narrow-dialog-enlarge" @click="enlargeDialog">
                <img src="@/assets/dialog/enlarge.png" alt="">
            </div>
            <div class="narrow-dialog-close" @click="closeNarrowDialog">
                <img src="@/assets/dialog/close-narrow-dialog.png" alt="">
            </div>
        </div> 
    </div>
</template>

<script>
    import top from "./components/top"
    import needdealtTable from "./components/table"
    import pagination from "@/components/Apagination"
    import needdealtDialog from "./components/dialog"

    import { getQuantity,addQuantity,deleteQuantity } from "@/axios/a2-gateway"
    export default {
        components: {
            top,
            needdealtTable,
            pagination,
            needdealtDialog,
        },
        data() {
            return {
                dataList: [],
                old_dataList: [],
                select_dataList: [],
                total: 10,
                loading: false,
                searchObj: {
                
                },
                showDialog: false,
                showqrDialog: false,
                showNarrowDialog: false,
                narrowTitle: "",
                currentPage: 1,
                pageSize: 10,
                state: "",
                propdata: {}
            }
        },
        created () {
            this.$emit("sidebarActive", "10");    // 向父组件传入当前页面的高亮索引，刷新页面保持当前高亮菜单不变
            this.getTableList(this.searchObj)
        },
        methods: {
            // 请求表格数据
            getTableList(){
                this.loading = true
                let obj = {
                    
                }
               
                getQuantity().then(response => {
                    if(response.data.code == 200) {
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
                    || this.$refs.needdealtTop.topForm.processStatus != ''
                    || this.$refs.needdealtTop.topForm.time != '') {
                        this.dataList = this.select_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                }else {
                    this.dataList = this.old_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                }
            },
            // 接收top组件传来的查询事件
            searchTableList(obj){
                this.loading = true 
                var arr = this.old_dataList.filter((item)=> {
                    return item.counterType.indexOf(obj.processTitle) != -1
                            && item.specs.indexOf(obj.createdPerson) != -1
                            && item.updateName.indexOf(obj.processStatus) != -1
                            && item.updateTime.indexOf(obj.time) != -1
                })
                console.log(arr)
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
                this.$refs.needdealtTop.topForm.time = '';
                this.currentPage = 1;
                this.pageSize = 10
                this.total = this.old_dataList.length
                this.dataList = this.old_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
            },
            // 新增
            add(){
                this.state = 1
                this.propdata = {}
                this.showDialog = true;
            },
            // 接收table组件传来的查看事件
            handleLook(row){
                this.state = 2
                this.propdata = row
                this.showDialog = true;
            },
            // 接收table组件传来的单件删除事件
            handleDelete(row){
                this.loading = true
                let obj = {
                    id: row.id
                }
               
                deleteQuantity(obj).then(response => {
                    if(response.data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.refresh()
                    }else {
                        this.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                })
            },
            //批量删除
            groupDelete() {
                let arr = this.$refs.multipleTable.$refs.multipleTable.selection
                let id = []
                for(var i = 0;i < arr.length;i++) {
                    id.push(arr[i].id)
                }
                this.loading = true
                let obj = {
                    id: id.toString()
                }
               
                deleteQuantity(obj).then(response => {
                    if(response.data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.refresh()
                    }else {
                        this.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                })
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
}
</style>
<template>
    <div class="a2-needdealt">
        <top :searchObj="searchObj" ref="needdealtTop" @search="searchTableList" @reload="reload" @refreshTableList="pagination" />
        <div class="a2-process-list">
            <el-button type="primary" @click="tosame">同步</el-button>
            <el-button type="info" @click="exportout">导出</el-button>
        </div>
        <div class="needdealt-table">
            <needdealt-table ref="multipleTable"  :dataList="dataList" @handleLook="handleLook" @handleForward="handleForward" />
        </div>
        <pagination v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize" @pagination="pagination" />

        <needdealt-dialog :visible.sync="showDialog" @narrowDialog="narrowDialog" />
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

    import { getUser,tosameUser } from "@/axios/a2-gateway"
    import exportUser from "@/axios/a2-gateway"
    export default {
        components: {
            top,
            needdealtTable,
            pagination,
            needdealtDialog
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
                showNarrowDialog: false,
                narrowTitle: "",
                currentPage: 1,
                pageSize: 10
            }
        },
        created () {
            this.$emit("sidebarActive", "1");    // 向父组件传入当前页面的高亮索引，刷新页面保持当前高亮菜单不变
            this.getTableList()
        },
        methods: {
            // 请求表格数据
            getTableList(){
                this.loading = true
                let obj = {
                    
                }
               
               getUser().then(response => {
                   console.log(response)
                    if(response.data.code == 200) {
                        console.log(response.data.data)
                            this.dataList = response.data.data
                            this.old_dataList = response.data.data
                            this.dataList = this.dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                            this.total = response.data.data.length   
                            this.loading = false
                    }else {

                    }
                })
            },
            // 分页方法
            pagination() {
                if(this.$refs.needdealtTop.topForm.processTitle != ''
                    || this.$refs.needdealtTop.topForm.createdPerson != ''
                    || this.$refs.needdealtTop.topForm.processStatus != ''
                    || this.$refs.needdealtTop.topForm.telephone != '') {
                        this.dataList = this.select_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                }else {
                    this.dataList = this.old_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                }
            },
            // 接收top组件传来的查询事件
            searchTableList(obj){
                this.loading = true 
                var arr = this.old_dataList.filter((item)=> {
                    return item.name.indexOf(obj.processTitle) != -1
                            && item.postNo.indexOf(obj.createdPerson) != -1
                            && item.postName.indexOf(obj.processStatus) != -1
                            && item.company.indexOf(obj.telephone) != -1
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
                this.$refs.needdealtTop.topForm.telephone = '';
                this.currentPage = 1;
                this.pageSize = 10
                this.total = this.old_dataList.length
                this.dataList = this.old_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
            },
            //同步
            tosame() {
                this.loading = true
                let obj = {
                    
                }
               
                tosameUser().then(response => {
                    if(response.data.code == 200) {
                        this.dataList = response.data.data
                        this.old_dataList = response.data.data
                        this.dataList = this.dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                        this.total = response.data.data.length   
                    }else {

                    }
                })
            },
            //导出
            exportout() {
                window.location.href = exportUser.exportUser + "?name=" + this.$refs.needdealtTop.topForm.processTitle + "&postNo=" + this.$refs.needdealtTop.topForm.createdPerson + "&postName=" + this.$refs.needdealtTop.topForm.processStatus + "&company=" +this.$refs.needdealtTop.topForm.telephone
            },

            // 接收table组件传来的查看事件
            handleLook(){
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
}
</style>
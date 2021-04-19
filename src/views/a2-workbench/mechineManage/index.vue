<template>
    <div class="a2-needdealt">
        <top :searchObj="searchObj" ref="needdealtTop" @search="searchTableList"  @reload="reload" @refreshTableList="pagination" />
        <div class="a2-process-list">
            <el-button type="primary" @click="add">新增</el-button>
            <el-button type="info" @click="groupDelete">批量删除</el-button>
            <el-button type="info" @click="exportout">导出</el-button>
        </div>
        <div class="needdealt-table">
            <needdealt-table ref="multipleTable" :dataList="dataList" @handleLook="handleLook" @handleEdit="handleEdit" @handleOpen="handleOpen" @handleDelete="handleDelete"/>
        </div>
        <pagination v-show="total > 0" :total="total" :page.sync="currentPage" :limit.sync="pageSize" @pagination="pagination" />

        <needdealt-dialog :visible.sync="showDialog" v-if="showDialog" :data="lookData" />
        <stock-dialog :visible.sync="showStockDialog"  v-if="showStockDialog" :linedata="old_lineList"  @refresh="refresh"/>
        <edit-dialog :visible.sync="showEditDialog" v-if="showEditDialog" :data="propdata" :linedata="lineList"  @refresh="refresh"/>
        <qr-dialog :visible.sync="showqrDialog" v-if="showqrDialog" />
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
    import stockDialog from "./components/dialogStock"
    import editDialog from "./components/dialogEdit"
    import qrDialog from "./components/dialogQr"

    import { getMechine,getMechineLine,deleteMechine } from "@/axios/a2-gateway"
    import exportMechine from "@/axios/a2-gateway"
    export default {
        components: {
            top,
            needdealtTable,
            pagination,
            needdealtDialog,
            stockDialog,
            editDialog,
            qrDialog
        },
        data() {
            return {
                dataList: [],
                old_dataList: [],
                select_dataList: [],
                lineList: [],
                old_lineList: [],
                total: 10,
                loading: false,
                searchObj: {
                    
                },
                showDialog: false,
                showStockDialog: false,
                showEditDialog: false,
                showqrDialog: false,
                showNarrowDialog: false,
                narrowTitle: "",
                currentPage: 1,
                pageSize: 10,
                state: '',
                propdata: {},
                lookData: {}
            }
        },
        created () {
            this.$emit("sidebarActive", "6");    // 向父组件传入当前页面的高亮索引，刷新页面保持当前高亮菜单不变
            this.getTableList()
            this.getLineList()
        },
        methods: {
            // 请求表格数据
            getTableList(){
                this.loading = true
                let obj = {
                    
                }
               
                getMechine().then(response => {
                    if(response.data.code == 200) {
                        console.log(response.data.data)
                        for(var i=0;i<response.data.data.length;i++) {
                            response.data.data[i].sum = parseInt(response.data.data[i].assistSum)  +  parseInt(response.data.data[i].hostSum) 
                        }
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
            // 请求线路数据
            getLineList(){
                this.loading = true
                let obj = {
                    
                }
               getMechineLine().then(response => {
                    if(response.data.code == 200) {
                        console.log(response.data.data)
                        this.old_lineList = response.data.data
                    }else {

                    }
                })
            },
            // 分页方法
            pagination() {   
                if(this.$refs.needdealtTop.topForm.processTitle != ''
                    || this.$refs.needdealtTop.topForm.createdPerson != ''
                    || this.$refs.needdealtTop.topForm.processStatus != ''
                    || this.$refs.needdealtTop.topForm.state != '') {
                        this.dataList = this.select_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                }else {
                    this.dataList = this.old_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                }
            },
            // 接收top组件传来的查询事件
            searchTableList(obj){
                this.loading = true 
                var arr = this.old_dataList.filter((item)=> {
                    return item.code.indexOf(obj.processTitle) != -1
                            && item.parking.indexOf(obj.createdPerson) != -1
                            && item.ticketState.indexOf(obj.processStatus) != -1
                            && item.state.indexOf(obj.state) != -1
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
                this.$refs.needdealtTop.topForm.state = '';
                this.currentPage = 1;
                this.pageSize = 10
                this.total = this.old_dataList.length
                this.dataList = this.old_dataList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
            },
            //新增
            add() {
                this.showStockDialog = true
            },

            handleLook(row){
                console.log(row)
                this.lookData = row
                this.showDialog = true;
            },

            handleEdit(row){
                var arr = []
                for(var i=0;i<this.old_lineList.length;i++) {
                    arr.push(this.old_lineList[i])
                }
                for(var i=0;i<row.lineList.length;i++) {
                    arr.push(row.lineList[i])
                }
                this.$nextTick(()=>{
                    this.lineList = arr
                    this.propdata = row
                    this.showEditDialog = true
                })  
            },

            handleOpen(row){
                this.showqrDialog = true;
            },

            handleDelete(row){
                this.loading = true
                let obj = {
                    id: row.id
                }
               
                deleteMechine(obj).then(response => {
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
               
                deleteMechine(obj).then(response => {
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
            //导出
            exportout() {
                window.location.href = exportMechine.exportMechine + "?code=" + this.$refs.needdealtTop.topForm.processTitle + "&parking=" + this.$refs.needdealtTop.topForm.createdPerson + "&ticketState=" + this.$refs.needdealtTop.topForm.processStatus + "&state=" + this.$refs.needdealtTop.topForm.state
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
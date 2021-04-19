<template>
    <div class="a2-needdealt">
        <top :searchObj="searchObj" ref="needdealtTop" @search="searchTableList" @refreshTableList="pagination" />
        <div class="a2-process-list">
            <el-button type="primary">生成工作单</el-button>
            <el-button type="info">批量删除</el-button>
            <el-button type="info">导出</el-button>
        </div>
        <div class="needdealt-table">
            <needdealt-table  :dataList="dataList" :ifselect="true" :tableColumn="tableColumn" @handleLook="handleLook"  @handleCode="handleCode" @handleForward="handleForward" />
        </div>
        <pagination v-show="total > 0" :total="total" :page.sync="searchObj.page" :limit.sync="searchObj.pageSize" @pagination="pagination" />

        <needdealt-dialog :visible.sync="showDialog" @narrowDialog="narrowDialog" />
        <qr-dialog :visible.sync="showqrDialog" @narrowDialog="narrowDialog" />
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
    import qrDialog from "./components/dialogQr"
    export default {
        components: {
            top,
            needdealtTable,
            pagination,
            needdealtDialog,
            qrDialog
        },
        data() {
            return {
                dataList: [],
                tableColumn: [
                    { name: '工作单编号', prop: 'proTitle'},
                    { name: '日期', prop: 'proName' },
                    { name: '姓名', prop: 'proStatus' },
                    { name: '工号', prop: 'proUrgentStatus' },
                    { name: '联系方式', prop: 'department' },
                    { name: '状态', prop: 'status' },
                    { name: '换胆数量', prop: 'changeNum' },
                    { name: '补胆数量', prop: 'addNum' },
                    { name: '操作', prop: 'operation' }
                ],
                total: 0,
                loading: false,
                searchObj: {
                    service: "",
                    page: 1,
                    pageSize: 10
                },
                showDialog: false,
                showqrDialog: false,
                showNarrowDialog: false,
                narrowTitle: ""
            }
        },
        created () {
            this.$emit("sidebarActive", "2");    // 向父组件传入当前页面的高亮索引，刷新页面保持当前高亮菜单不变
            this.getTableList(this.searchObj)
        },
        methods: {
            // 请求表格数据
            getTableList(data){
                this.loading = true
                let obj = {
                    service: "",
                    page: data.page,
                    pageSize: data.pageSize
                }
                this.dataList = [
                    {
                        proTitle: "xxxxxxxxxxxx",
                        proName: "2021-01-01",
                        proStatus: "张三",
                        proUrgentStatus: "111111111111",
                        department: "xxx",
                        status: "正常",
                        changeNum: 111,
                        addNum: 222,
                    },
                    {
                        proTitle: "xxxxxxxxxxx",
                        proName: "2021-02-02",
                        proStatus: "李四",
                        proUrgentStatus: "222222222222",
                        department: "xxx",
                        status: "正常",
                        changeNum: 111,
                        addNum: 222,
                    },
                    
                ]
                this.total = this.dataList.length
            },
            // 分页方法
            pagination() {
                this.getTableList(this.searchObj);
            },
            // 接收top组件传来的查询事件
            searchTableList(obj){
                this.loading = true 
                console.log(obj)
                this.loading = false
            },
            // 接收table组件传来的查看事件
            handleLook(){
                this.showDialog = true;
            },
            // 接收table组件传来的二维码事件
            handleCode(){
                this.showqrDialog = true;
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
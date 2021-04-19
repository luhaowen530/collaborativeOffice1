<template>
    <el-dialog :title="meetingTitle" :visible.sync="visible" width="60%" class="stock-dialog" v-dialogDrag :before-close="modalClose">
        <stock-form :state="state" :tableColumn="tableColumn" />

        <div class="btn_box">
            <el-button size="small" type="primary" @click="add">确 定</el-button>
            <el-button size="small" type="info" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import stockForm from "./stockForm"
export default {
    components: {
        stockForm,
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        state: ""
    },
    data() {
        return {
            meetingTitle: "",
            activeName: 'first',
            tableColumn: []
        }
    },
    created() {
        if(this.state == 1) {
                this.meetingTitle = "票胆出库";
                this.tableColumn = [
                    { name: '票胆编号', prop: 'gallNo'},
                    { name: '出库时间', prop: 'updateTime' },
                    { name: '备注', prop: 'bz' },
                    { name: '操作', prop: 'son-operation' }
                ]
            }
            if(this.state == 2) {
                this.meetingTitle = "票胆入库";
                this.tableColumn = [
                    { name: '票胆编号', prop: 'gallNo'},
                    { name: '入库时间', prop: 'updateTime' },
                    { name: '备注', prop: 'bz' },
                    { name: '操作', prop: 'son-operation' }
                ]
            }
    },
    // watch: {
    //     state: function(newVal,oldVal){
            
    //         if(newVal == 1) {
    //             this.meetingTitle = "票胆出库";
    //             this.tableColumn = [
    //                 { name: '票胆编号', prop: 'pdbh'},
    //                 { name: '操作人', prop: 'czr' },
    //                 { name: '出库时间', prop: 'cksj' },
    //                 { name: '备注', prop: 'bz' },
    //                 { name: '操作', prop: 'son-operation' }
    //             ]
    //         }
    //         if(newVal == 2) {
    //             this.meetingTitle = "票胆入库";
    //             this.tableColumn = [
    //                 { name: '票胆编号', prop: 'pdbh'},
    //                 { name: '操作人', prop: 'czr' },
    //                 { name: '入库时间', prop: 'rksj' },
    //                 { name: '备注', prop: 'bz' },
    //                 { name: '操作', prop: 'son-operation' }
    //             ]
    //         }
    //     }
    // },

    methods: {
        //关闭弹框
        modalClose() {
            this.$emit('update:visible', false); // 直接修改父组件的属性
        },
        add() {

        }
    }
}
</script>

<style lang="scss" scoped>
.stock-dialog {

    .narrow {
        position: absolute;
        right: 74px;
        top: 23px;
        cursor: pointer;
    }
    .stock-dialog-tabs {
        height: calc(100% - 32px);
        overflow: hidden;
    }
    .btn_box {
        width: 100%;
        margin-top: 10px;
        text-align: center;
        position: absolute;
        bottom: 21px;

        .submit-btn {
            background: #AE686F;
            color: #fff;
            margin: 0 68px;
        }
    }
}

</style>

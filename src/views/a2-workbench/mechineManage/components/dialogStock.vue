<template>
    <el-dialog :title="meetingTitle" :visible.sync="visible" width="60%" class="stock-dialog" v-dialogDrag :before-close="modalClose">
        <stock-form ref="stock" :linedata="linedata" @refresh="refresh"/>

        <div class="btn_box">
            <el-button size="small" type="primary" @click="add">提 交</el-button>
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
        linedata: "",
    },
    data() {
        return {
            meetingTitle: "标题xxxxxxxxxxxxxxxxxxx",
            activeName: 'first',
            newadata: []
        }
    },
    methods: {
        //关闭弹框
        modalClose() {
            this.$emit('update:visible', false); // 直接修改父组件的属性
        },
        refresh() {
            this.$emit('refresh')
            this.modalClose()
        },
        //提交
        add() {
            this.$refs.stock.add();
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

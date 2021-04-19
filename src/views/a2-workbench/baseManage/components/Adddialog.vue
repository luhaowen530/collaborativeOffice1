<template>
    <el-dialog :title="meetingTitle" :visible.sync="visible" width="36%" class="qr-dialog" v-dialogDrag :before-close="modalClose">
        <base-form ref="base" :state="state" :data="data" @refresh="refresh"/>
        <div class="btn_box">
            <el-button size="small" type="primary" @click="add">确 定</el-button>
            <el-button size="small" type="info" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import baseForm from "./AddForm"
export default {
    components: {
        baseForm,
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        state: "",
        data: ""
    },
    data() {
        return {
            meetingTitle: "标题信息XXXXXXXXXXXXXXXXXXXXX",
            activeName: 'first'
        }
    },
    created() {
        
    },
    methods: {
        add() {
            this.$refs.base.add();
        },
        refresh() {
            this.$emit('refresh')
            this.modalClose()
        },
        //关闭弹框
        modalClose() {
            this.$emit('update:visible', false); // 直接修改父组件的属性
        },
        // 弹框点击缩小 向父组件传递标题参数
        narrowDialog(){
            this.$emit("narrowDialog", this.meetingTitle)
            this.$emit('update:visible', false); // 直接修改父组件的属性
        }
    }
}
</script>

<style lang="scss" scoped>
.qr-dialog {

    .narrow {
        position: absolute;
        right: 74px;
        top: 23px;
        cursor: pointer;
    }
    .qr-dialog-tabs {
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

<template>
    <el-dialog :title="meetingTitle" :visible.sync="visible" width="70%" class="needdealt-dialog" v-dialogDrag :before-close="modalClose">
        <base-form :data="data"/>
        <!-- <div class="btn_box">
            <el-button size="small" type="info" @click="modalClose">取 消</el-button>
            <el-button size="small" class="submit-btn">提 交</el-button>
            <el-button size="small" type="primary">保 存</el-button>
        </div> -->
    </el-dialog>
</template>

<script>
import baseForm from "./baseForm"
export default {
    components: {
        baseForm,
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
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
        handleClick(tab, event) {
            console.log(tab, event);
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
.needdealt-dialog {

    .narrow {
        position: absolute;
        right: 74px;
        top: 23px;
        cursor: pointer;
    }
    .needdealt-dialog-tabs {
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

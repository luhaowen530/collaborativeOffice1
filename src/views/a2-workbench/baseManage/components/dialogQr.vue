<template>
    <el-dialog :title="meetingTitle" :visible.sync="visible" width="36%" class="qr-dialog" v-dialogDrag :before-close="modalClose">
        <div class="main">
            <img :src="data.qrCode" class="img" />
        </div>
        <div class="btn_box">
            <el-button size="small" type="primary" @click="modalClose">取胆出票</el-button>
            <el-button size="small" type="info">保 存</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        data: ''
    },
    data() {
        return {
            meetingTitle: "标题信息XXXXXXXXXXXXXXXXXXXXX",
            activeName: 'first'
        }
    },
    created() {
        console.log("123")
        console.log(this.data)
    },
    methods: {
        //关闭弹框
        modalClose() {
            this.$emit('update:visible', false); // 直接修改父组件的属性
        },
    }
}
</script>

<style lang="scss" scoped>
.qr-dialog {
    .main {
        width: 100%;
        height: 360px;
        text-align: center;
        .img {
            width: 360px;
            height: 360px;
        }
    }
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

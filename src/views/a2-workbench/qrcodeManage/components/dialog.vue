<template>
    <el-dialog :title="meetingTitle" :visible.sync="visible" class="needdealt-dialog" v-dialogDrag :before-close="modalClose">
        <base-form id="qrcodeBox2" :data="data"/>    
        <div class="btn_box">
            <el-button size="small" type="primary" @click="print">打 印</el-button>
        </div>
    </el-dialog>
</template>

<script>
import baseForm from "./baseForm"
import enclosure from "./enclosure"
import relation from "./relation"
import flowChart from "./flowChart"
import print from 'print-js'
export default {
    components: {
        baseForm,
        enclosure,
        relation,
        flowChart
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
        print() {
                printJS({
                    printable: 'qrcodeBox2',
                    type: 'html',
                    scanStyles: false,
                    targetStyles: ['*'],
                    style: '#qrcodeBox2 .small-qr { margin-left:-30px;margin-top: 30px;width: 230px;height: 230px }',
                    ignoreElements:['no-print','bc','gb']
                })

        },
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

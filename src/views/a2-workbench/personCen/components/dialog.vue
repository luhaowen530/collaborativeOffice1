<template>
    <el-dialog :title="meetingTitle" :visible.sync="visible" class="needdealt-dialog" v-dialogDrag :before-close="modalClose">
        <div class="narrow" @click="narrowDialog">
            <img src="@/assets/dialog/narrow.png" alt="">
        </div>
        <el-tabs class="needdealt-dialog-tabs" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基础表单" name="first">
                <base-form />
            </el-tab-pane>
            <el-tab-pane label="附件（1）" name="second">
                <enclosure />
            </el-tab-pane>
            <el-tab-pane label="关联" name="third">
                <relation />
            </el-tab-pane>
            <el-tab-pane label="流程图" name="fourth">
                <flow-chart />
            </el-tab-pane>
        </el-tabs>
        <div class="btn_box">
            <el-button size="small" type="info" @click="modalClose">取 消</el-button>
            <el-button size="small" class="submit-btn">提 交</el-button>
            <el-button size="small" type="primary">保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import baseForm from "./baseForm"
import enclosure from "./enclosure"
import relation from "./relation"
import flowChart from "./flowChart"
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

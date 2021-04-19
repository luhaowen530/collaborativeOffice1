<template>
    <div class="base-form-container">
        <div class="base-form-top">
            <div class="center" v-for="(item,index) in data" :key="index" style="page-break-after:always;">
                <img :src="item.qrCode" class="small-qr"/>
            </div>
        </div>  
    </div>
</template>

<script>
    export default {
        props: {
            data:""
        },
        data() {
            return {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
.base-form-container {

    .base-form-top {
        background: #fff;
        padding: 20px 30px 0 20px;
        height: 700px;
        overflow: scroll;
    }
    .base-form-bottom {

        .business-form-text {
            font-size: 18px;
            font-weight: bold;
            color: #646464;
            margin: 20px 0 8px 4px;
        }
        .business-form {
            background: #fff;
            padding: 20px 30px 76px 20px;

            .business-reasons-input {
                height: 174px;
            }
        }
    }
    .center {
        text-align: center;
    }
    // 本页面公共表单样式
    .el-form-item {
        width: 100%;

        .el-form-item__label {
            color: #606266;
            font-size: 18px;
        }
    }
}
</style>
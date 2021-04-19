<template>
    <div class="a2-needdealt">
        <top ref="needdealtTop"/>
        <div class="qrcodeBox0" v-if="state == 0">
            <div>此区域生成二维码</div>
        </div>
        <div class="qrcodeBox1" v-if="state == 1">
            <div id="single">
                <img :src="imgsrc" class="small-qr"/>
            </div>
        </div>
        <div class="qrcodeBox2" id="qrcodeBox2" v-if="state == 2">
            <div v-for="(item,index) in list" :key="index" style="page-break-after:always;">
                <img :src="item.qrCode" class="small-qr"/>
            </div>
        </div>
        <div class="a2-process-list">
            <el-button type="primary" @click="print">打印</el-button>
        </div>


        <needdealt-dialog :visible.sync="showDialog" :data="list"/>
    </div>
</template>

<script>
    import top from "./components/top"
    import needdealtTable from "./components/table"
    import pagination from "@/components/Apagination"
    import needdealtDialog from "./components/dialog"
    import { addOneQrInfo,bathAddQrInfo } from "@/axios/a2-gateway"

    import print from 'print-js'
    export default {
        components: {
            top,
            needdealtTable,
            pagination,
            needdealtDialog
        },
        data() {
            return {
                state: 0,
                imgsrc:"",
                showDialog: false,
                list: []
            }
        },
        created () {
            this.$emit("sidebarActive", "3-0");    // 向父组件传入当前页面的高亮索引，刷新页面保持当前高亮菜单不变
        },
        methods: {
            //单个二维码
            single() {
                this.state = 1
                this.loading = true
                let obj = {
                    content: this.$refs.needdealtTop.topForm.single
                }
                addOneQrInfo(obj).then(response => {
                    if(response.data.code == 200) {
                        this.imgsrc = response.data.data[0].qrCode
                        this.loading = false
                    }else {

                    }
                })
            },
            //批量二维码
            size() {
                this.state = 2
                this.loading = true
                let obj = {
                    startCode: this.$refs.needdealtTop.topForm.start,
                    endCode: this.$refs.needdealtTop.topForm.end,
                }
               
                bathAddQrInfo(obj).then(response => {
                    if(response.data.code == 200) {
                        console.log("123",response.data.data)
                        this.list = response.data.data
                        this.loading = false
                    }else {

                    }
                })
            },

            print() {
                if(this.state == 1) {
                        printJS({
                            printable: 'single',
                            type: 'html',
                            scanStyles: false,
                            targetStyles: ['*'],
                            style: '#single .small-qr { margin-left:10px;width: 230px;height: 230px }',
                            ignoreElements:['no-print','bc','gb']
                        })
                }
                if(this.state == 2) {
                    this.showDialog = true
                }
                
            }
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
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px
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
    .qrcodeBox0 {
        width: 100%;
        height: 68%;
        border: 1px solid rgba(151, 121, 121, 0.5);
        border-radius: 5px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        color: rgb(151, 121, 121);
        overflow: scroll;


    }
    .qrcodeBox1 {
        width: 100%;
        height: 68%;
        border: 1px solid rgba(151, 121, 121, 0.5);
        border-radius: 5px;
        display: flex;
        flex-wrap: wrap;
        // align-items: center;
        justify-content: start;
        color: rgb(151, 121, 121);
        overflow: scroll;

        .small-qr {
            width: 200px;
            height: 200px;
            margin-top: 10px;
        }
    }
    .qrcodeBox2 {
        width: 100%;
        height: 68%;
        border: 1px solid rgba(151, 121, 121, 0.5);
        border-radius: 5px;
        display: flex;
        // flex-direction: column;
        flex-wrap: wrap;
        justify-content: start;
        color: rgb(151, 121, 121);
        overflow: scroll;

        .small-qr {
            width: 200px;
            height: 200px;
            margin-top: 10px;
        }
    }
}
</style>
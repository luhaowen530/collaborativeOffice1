<template>
    <div class="base-form-container">
        <div class="left">
            <div class="title">基础数据</div>
            <div class="base-form-top">
                <el-form class="base-form" :inline="true" :model="baseFormTop" label-width="110px">
                    <el-row :gutter="50">
                        <el-col :span="12">
                            <el-form-item label="智能柜编号">
                                <el-input class="process-title-input" :readonly="true" v-model="data.code" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所在停车场">
                                <el-input class="process-num-input" :readonly="true" v-model="data.parking" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="50">
                        <el-col :span="12">
                            <el-form-item label="箱格总数">
                                <el-input class="process-title-input" :readonly="true" v-model="data.sum" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备用箱格数">
                                <el-input class="process-num-input" :readonly="true" v-model="baseFormTop.processNum" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="0">
                        <el-col :span="8">
                            <el-form-item label="主柜规格">
                                <el-input class="process-title-input" v-model="data.hostSpecs" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="箱格数量">
                                <el-input class="process-num-input" :readonly="true" v-model="baseFormTop.mainBoxNum" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="数量">
                                <el-input class="process-num-input" :readonly="true" v-model="data.hostNum" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="0">
                        <el-col :span="8">
                            <el-form-item label="副柜规格">
                                <el-input class="process-title-input" v-model="data.assistSpecs" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="箱格数量">
                                <el-input class="process-num-input" :readonly="true" v-model="baseFormTop.subBoxNum" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="数量">
                                <el-input class="process-num-input" :readonly="true" v-model="data.assistNum" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
        
                    <el-row :gutter="50">
                        <el-col :span="24">
                            <el-form-item label="绑定线路">
                                <el-input class="process-title-input" v-model="baseFormTop.line" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="title">状态数据</div>
            <div class="base-form-top">
                <el-form class="base-form" :inline="true" :model="baseFormTop" label-width="110px">
                    <el-row :gutter="50">
                        <el-col :span="12">
                            <el-form-item label="网络状态">
                                <el-input class="process-title-input" v-model="data.code" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="状态更新时间">
                                <el-input class="process-num-input" :readonly="true" v-model="data.code" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="50">
                        <el-col :span="12">
                            <el-form-item label="使用状态">
                                <el-input class="process-title-input" v-model="data.code" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="状态更新时间">
                                <el-input class="process-num-input" :readonly="true" v-model="data.code" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-row :gutter="50">
                        <el-col :span="24">
                            <el-form-item label="状态详情">
                                <el-input class="process-title-input" v-model="data.code" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="50">
                        <el-col :span="24">
                            <el-form-item label="备注">
                                <el-input class="process-title-input" v-model="data.remark" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="right">
            <div id="myChart" class="chart"></div>
        </div>
    </div>
</template>

<script>
import { getQuantity } from "@/axios/a2-gateway"
    export default {
        props: {
            data:""
        },
        data() {
            return {
                baseFormTop: {
                    mainBoxNum: '',
                    subBoxNum: '',
                    line: []
                },
                quantityList: []

            }
        },
        created(){
            this.getQuantityList()
            let arr = []
            this.data.lineList.forEach(e => {
                arr.push(e.lineName)
            });
            this.baseFormTop.line = arr
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            // 请求规格数据
            getQuantityList(){
                this.loading = true
                let obj = {
                    
                }  
                getQuantity().then(response => {
                    if(response.data.code == 200) {
                        this.quantityList = response.data.data
                        
                        this.baseFormTop.mainBoxNum = this.quantityList.find(item=>{
                            return item.id == this.data.hostId
                        }).boxNum
                        this.baseFormTop.subBoxNum = this.quantityList.find(item=>{
                            return item.id == this.data.assistId
                        }).boxNum

                        this.$forceUpdate()
                    
                    }else {

                    }
                })
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    textStyle: {
                        color: '#fff',
                    },
                    label: {
                        color: "black",
                        fontWeight: 600
                    },
                    
                    grid: {
                        left: '12%'
                    },
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 100,
                        calculable: true,
                        orient: 'horizontal',
                        left: 'center',
                        bottom: '15%',
                        inRange: {
                            color: ['rgb(173,99,26)', 'rgb(251,229,214)', 'rgb(217,217,217)', 'rgb(192,0,0)'] 
                        }
                    },
                    yAxis: {
                        data: [1,2,3,4],
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#555'],
                            },
                        },
                        axisLine: {
                            show: false
                        },
                    },
                    xAxis: {
                        data: [1,2,3,4],
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#555',
                            },
                        },
                        axisLabel: {
                            interval:0,
                            align: "center",
                            rotate: 30,
                        },
                    },
                    series: [
                        {
                            name: 1,
                            type: 'heatmap',
                            label: {
                                show: false,
                                position: 'inside',
                            },
                            data:[
                                [0, 0, 0],
                                [0, 1, 25],
                                [0, 2, 25],
                                [0, 3, 100],
                                [1, 0, 50],
                                [1, 1, 50],
                                [1, 2, 0],
                                [1, 3, 25],
                                [2, 0, 50],
                                [2, 1, 100],
                                [2, 2, 25],
                                [2, 3, 50],
                                [3, 0, 0],
                                [3, 1, 25],
                                [3, 2, 100],
                                [3, 3, 100],
                                
                            ],
                            itemStyle: {
                                borderColor: "white",
                                borderWidth: 5
                            }
                            
                        }
                    ]
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
.base-form-container {
    display: flex;


    .left {
        width: 60%;
    }
    .right {
        width: 40%;

        .chart {
            width: 100%;
            height: 100%;
        }
    }
    .title {
        font-size: 20px;
        font-weight: 600;
        color: rgb(21,85,160);
        margin-top: 20px;
    }
    .base-form-top {
        background: #fff;
        padding: 20px 30px 0 20px;
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
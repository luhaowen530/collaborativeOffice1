<template>
    <el-dialog :title="meetingTitle" :visible.sync="visible" width="36%" class="qr-dialog" v-dialogDrag :before-close="modalClose">
        <div class="main">
            <div id="myChart" ref="mychart" class="chart"></div>
        </div>
        <div class="btn_box">
            <el-button size="small" type="primary" @click="modalClose">打开</el-button>
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
    },
    data() {
        return {
            meetingTitle: "标题信息XXXXXXXXXXXXXXXXXXXXX",
            activeName: 'first'
        }
    },
    mounted() {
        this.drawLine()
    },
    methods: {
        //关闭弹框
        modalClose() {
            this.$emit('update:visible', false); // 直接修改父组件的属性
        },
        drawLine(){
                // 基于准备好的dom，初始化echarts实例
                // let myChart = this.$echarts.init(document.getElementById('myChart'))
                let mychart = this.$refs.mychart;
                if(mychart) {
                    console.log("123")
                    let myChart = this.$echarts.init(mychart)
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
                }else {
                    console.log("???")
                }
                
            }
    }
}
</script>

<style lang="scss" scoped>
.qr-dialog {
    .main {
        width: 100%;
        .chart {
            width: 100%;
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

<template>
    <div class="base-form-container">
        <div class="base-form-top">
            <el-form class="base-form" :inline="true" :model="baseFormTop" label-width="110px">
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="智能柜编号">
                            <el-input class="process-title-input" v-model="baseFormTop.code" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>  
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="所在停车场">
                            <el-select class="process-title-input" v-model="baseFormTop.parking" placeholder="">
                                <el-option
                                    v-for="(item,index) in unique(carList,'parkingName')"
                                    :key="index"
                                    :label="item.parkingName"
                                    :value="item.parkingName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在区域">
                            <el-select class="process-title-input" v-model="baseFormTop.area" placeholder="">
                                <el-option
                                    v-for="item in unique(areaList,'area')"
                                    :key="item.id"
                                    :label="item.area"
                                    :value="item.area">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>  
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="主柜规格">
                            <el-select class="process-title-input" @change="mainSpecsChange" v-model="baseFormTop.mainSpecs" placeholder="">
                                <el-option
                                    v-for="item in unique(quantityMainList,'specs')"
                                    :key="item.id"
                                    :label="item.specs"
                                    :value="item.specs">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="箱格数量">
                            <el-select class="process-title-input" @change="mainBoxNumChoose" v-model="baseFormTop.mainBoxNum" placeholder="">
                                <el-option
                                    v-for="item in mainBoxNumList"
                                    :key="item.id"
                                    :label="item.boxNum"
                                    :value="item.boxNum">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数量">
                            <el-input type="number" class="process-title-input" v-model="baseFormTop.mainNum" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>  
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item label="副柜规格">
                            <el-select class="process-title-input" @change="subSpecsChange" v-model="baseFormTop.subSpecs" placeholder="">
                                <el-option
                                    v-for="item in unique(quantitySubList,'specs')"
                                    :key="item.id"
                                    :label="item.specs"
                                    :value="item.specs">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="箱格数量">
                            <el-select class="process-title-input" @change="subBoxNumChoose" v-model="baseFormTop.subBoxNum" placeholder="">
                                <el-option
                                    v-for="item in subBoxNumList"
                                    :key="item.id"
                                    :label="item.boxNum"
                                    :value="item.boxNum">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数量">
                            <el-input type="number" class="process-title-input" v-model="baseFormTop.subNum" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>  
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="绑定线路">
                            <el-select class="select" @change="lineChoose()" multiple v-model="baseFormTop.line" placeholder="">
                                <el-option
                                    v-for="item in linedata"
                                    :key="item.lineNo"
                                    :label="item.lineName"
                                    :value="item.lineName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>  
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input type="textarea" class="process-title-input" v-model="baseFormTop.remark" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>  
            </el-form>
        </div>
    </div>
</template>

<script>
import { addMechine,getCarpark,getArea,getQuantity } from "@/axios/a2-gateway"
    export default {
        props: {
            linedata: "",
            data: "",
        },
        data() {
            return {
                baseFormTop: {

                },
                carList: [],
                areaList: [],
                quantityList: [],
                quantityMainList: [],
                quantitySubList: [],
                subBoxNumList: [],
                mainBoxNumList: [],
                mainid: '',
                subid: '',
                line: []
            }
        },
        created() {
            console.log("data",this.data)
                this.baseFormTop = {
                    id: this.data.id,
                    code: this.data.code,
                    parking: this.data.parking,
                    area: this.data.area,
                    mainSpecs: this.data.hostSpecs,
                    mainNum: this.data.hostNum,
                    subSpecs: this.data.assistSpecs,
                    subNum: this.data.assistNum,
                    remark: this.data.remark,
                }
                let arr = []
                this.data.lineList.forEach(e => {
                    arr.push(e.lineName)
                });
                this.baseFormTop.line = arr
    
            this.$nextTick(()=>{
                this.getCarList()
                this.getAreaList()
                this.getQuantityList()  
            })
                
                

        },
        methods: {
            //去重
            unique(arr, attr) {
                for (var i = 0; i < arr.length - 1; i++) {
                    for (var j = i + 1; j < arr.length; j++) {
                        if (arr[i][attr] == arr[j][attr]) {
                            arr.splice(j, 1);
                            //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
                            j--;
                        }
                    }
                }
                return arr;
            },

            //获取停车场
            getCarList(){
                this.loading = true
                let obj = {
                    
                }
               getCarpark().then(response => {
                    if(response.data.code == 200) {
                        this.carList = response.data.data
                    }else {

                    }
                })
            },
            // 请求区域数据
            getAreaList(){
                this.loading = true
                let obj = {
                    
                }
                getArea().then(response => {
                    if(response.data.code == 200) {
                        this.areaList = response.data.data
                    }else {

                    }
                })
            },
            // 请求规格数据
            getQuantityList(){
                this.loading = true
                let obj = {
                    
                }  
                getQuantity().then(response => {
                    if(response.data.code == 200) {
                        this.quantityList = response.data.data
                        this.quantityMainList = response.data.data.filter(item=>{
                            return item.counterType == '主柜'
                        })
                        this.quantitySubList = response.data.data.filter(item=>{
                            return item.counterType == '副柜'
                        })

                        this.mainBoxNumList = this.quantityList.filter(item => {
                            return item.counterType == '主柜'
                        }).filter(item => {
                            return item.specs == this.baseFormTop.mainSpecs
                        })

                        this.subBoxNumList = this.quantityList.filter(item => {
                            return item.counterType == '副柜'
                        }).filter(item => {
                            return item.specs == this.baseFormTop.subSpecs
                        })

                        this.baseFormTop.mainBoxNum = this.quantityList.find(item=>{
                            return item.id == this.data.hostId
                        }).boxNum
                        this.baseFormTop.subBoxNum = this.quantityList.find(item=>{
                            return item.id == this.data.assistId
                        }).boxNum
                    }else {

                    }
                })
            },
            //主柜选择
            mainSpecsChange() {
                this.mainBoxNumList = this.quantityList.filter(item => {
                    return item.counterType == '主柜'
                }).filter(item => {
                    return item.specs == this.baseFormTop.mainSpecs
                })
            },
            //副柜选择
            subSpecsChange() {
                this.subBoxNumList = this.quantityList.filter(item => {
                    return item.counterType == '副柜'
                }).filter(item => {
                    return item.specs == this.baseFormTop.subSpecs
                })    
            },
            //主柜数量选择
            mainBoxNumChoose(val) {
                this.$forceUpdate()
                var list = this.quantityList.filter(item => {
                    return item.counterType == '主柜'
                }).filter(item => {
                    return item.specs == this.baseFormTop.mainSpecs
                }).find(item => {
                    return item.boxNum == val
                })
                this.mainid = list.id
            },
            //副柜数量选择
            subBoxNumChoose(val) {
                this.$forceUpdate()
                var list = this.quantityList.filter(item => {
                    return item.counterType == '副柜'
                }).filter(item => {
                    return item.specs == this.baseFormTop.subSpecs
                }).find(item => {
                    return item.boxNum == val
                })
                this.subid = list.id
            },
            //绑定线路
            lineChoose() {
                this.$forceUpdate()
            },
            add(){
                var a = []
                for(var i=0;i<this.baseFormTop.line.length;i++) {
                    a.push({
                        counterCode: this.baseFormTop.code,
                        lineName: this.baseFormTop.line[i],
                        lineNo: this.baseFormTop.line[i]
                    })
                }

                var mainlist = this.quantityList.filter(item => {
                    return item.counterType == '主柜'
                }).filter(item => {
                    return item.specs == this.baseFormTop.mainSpecs
                }).find(item => {
                    return item.boxNum == this.baseFormTop.mainBoxNum
                })

                var sublist = this.quantityList.filter(item => {
                    return item.counterType == '副柜'
                }).filter(item => {
                    return item.specs == this.baseFormTop.subSpecs
                }).find(item => {
                    return item.boxNum == this.baseFormTop.subBoxNum
                })

                let obj = {
                    id: this.baseFormTop.id,
                    code: this.baseFormTop.code,
                    parking: this.baseFormTop.parking,
                    area: this.baseFormTop.area,
                    hostId: mainlist.id,
                    hostNum: this.baseFormTop.mainNum,
                    assistId: sublist.id,
                    assistNum: this.baseFormTop.subNum,
                    remark: this.baseFormTop.remark,
                    lineList: a
                }
                addMechine(obj).then(response => {
                    if(response.data.code == 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        // this.baseFormTop.id = ""
                        // this.baseFormTop.area = ""
                        // this.baseFormTop.areaDetail = ""
                        // this.baseFormTop.parking = ""
                        // this.baseFormTop.remarks = ""
                        // this.baseFormTop.staffName = ""
                        // this.baseFormTop.staffNo = ""
                        // this.baseFormTop.telephone = ""
                        // this.baseFormTop.state = ""
                        // this.baseFormTop.staffList = ""
                        // this.dataList = []
                        this.$emit('refresh')
                    }else {
                        this.$message({
                            message: '添加失败',
                            type: 'error'
                        });
                    }
                })
            },
        },
        watch: {
            "baseFormTop.subSpecs": function(newValue, oldValue) {
                this.baseFormTop.subBoxNum = null;
            },
            "baseFormTop.mainSpecs": function(newValue, oldValue) {
                this.baseFormTop.mainBoxNum = null;
            },
        },
    }
</script>

<style lang="scss" scoped>
.base-form-container {

    .base-form-top {
        background: #fff;
        padding: 20px 30px 0 20px;

        .select {
            width: 100%
        }
    }
    
    .table-box {
        width: 100%;
        height: 480px;
    }
    // 本页面公共表单样式
    .el-form-item {
        width: 100%;

        .el-form-item__label {
            color: #606266;
            font-size: 18px;
        }
    }
    .el-row {
        margin-bottom: 15px;
    }
}
</style>
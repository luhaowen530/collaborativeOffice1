<template>
    <div class="base-form-container">
        <div class="base-form-top">
            <el-form class="base-form" :inline="true" :model="baseFormTop" label-width="110px">
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="流程标题">
                            <el-input class="process-title-input" v-model="baseFormTop.processTitle" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="流程编号">
                            <el-input class="process-num-input" disabled v-model="baseFormTop.processNum" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6">
                        <el-form-item label="经办人">
                            <el-input class="agent-input" disabled v-model="baseFormTop.agent" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="部门">
                            <el-input class="department-input" disabled v-model="baseFormTop.department" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="申请时间">
                            <el-date-picker class="apply-time-input" v-model="baseFormTop.applyTime" type="date" placeholder=""></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="紧急程度">
                            <el-input class="urgency-input" disabled v-model="baseFormTop.urgency" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="base-form-bottom">
            <div class="business-form-text">业务接待申请表单</div>
            <el-form class="business-form" :inline="true" :model="baseFormBottom" label-width="110px">
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="被接待单位">
                            <el-input v-model="baseFormBottom.receptionUnit" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="来客人数">
                            <el-input v-model="baseFormBottom.visitorsNum" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item label="业务事由">
                            <el-input type="textarea" class="business-reasons-input" v-model="baseFormBottom.businessReasons" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6">
                        <el-form-item label="计划接待时间">
                            <el-date-picker v-model="baseFormBottom.planReceptionTime" type="date" placeholder=""></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="计划就餐时间">
                            <el-input v-model="baseFormBottom.planEatTime" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="预计陪餐人数">
                            <el-input v-model="baseFormBottom.estimateEatNum" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="陪餐人员">
                            <el-input v-model="baseFormBottom.eatPerson" placeholder="" suffix-icon="el-icon-s-check"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="6">
                        <el-form-item label="餐费预算">
                            <el-input v-model="baseFormBottom.meaExpensesBudget" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="年度预算">
                            <el-input v-model="baseFormBottom.yearBudget" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="剩余预算">
                            <el-input v-model="baseFormBottom.surplusBudget" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                baseFormTop: {
                    processTitle: '',
                    processNum: '',
                    agent: '',
                    department: '',
                    applyTime: '',
                    urgency: '',
                },
                baseFormBottom: {
                    receptionUnit: '',
                    visitorsNum: '',
                    businessReasons: '',
                    planReceptionTime: '',
                    planEatTime: '',
                    estimateEatNum: '',
                    eatPerson: '',
                    meaExpensesBudget: '',
                    yearBudget: '',
                    surplusBudget: '',
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.base-form-container {

    .base-form-top {
        background: #fff;
        padding: 20px 30px 0 20px;
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
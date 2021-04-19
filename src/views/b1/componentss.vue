<template>
    <div class="a1">
        <top />
        <com-table :list="list" :allData="allData" @handleCurrentChange="getList" :searchObj="searchObj" :loading="loading" /> 
    </div>
</template>

<script>
    import top from "./components/top"
    import comTable from "./components/table"
    export default {
        name: 'Componentss',
        components: {
            top,
            comTable,
        },
        data(){
            return {
                list: [],
                allData: {},
                searchObj: {
                    page: 0,
                    size: 10,
                },
                loading: false,
            }
        },
        created () {
            this.getList();
        },
        methods: {
            getList(data) {
                // this.searchObj = data;
                this.loading = true;
                this.list = [
                    {
                        indexNumber: 1,
                        title: '',
                        period: '',
                        buildPerson: '王小虎',
                        buildTime: "",
                        state: ""
                    },
                    {
                        indexNumber: 2,
                        title: '',
                        period: '',
                        buildPerson: '王小虎',
                        buildTime: "",
                        state: ""
                    },
                ];
                this.allData = {
                    totalElements: 2
                }
                this.loading = false;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .a1 {
        min-width: 1166px;
        overflow: auto;
        height: 100%;
        padding: 20px;

    }
</style>
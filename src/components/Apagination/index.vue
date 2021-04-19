<template>
<div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination :background="background" :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout" :page-sizes="pageSizes" :total="total" v-bind="$attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo'
export default {
    name: 'Pagination',
    props: {
        total: {
            required: true,
            type: Number
        },
        page: {
            type: Number,
            default: 1
        },
        limit: {
            type: Number,
            default: 20
        },
        pageSizes: {
            type: Array,
            default () {
                return [10, 20, 30, 50]
            }
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        background: {
            type: Boolean,
            default: true
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        currentPage: {
            get() {
                return this.page
            },
            set(val) {
                this.$emit('update:page', val)
            }
        },
        pageSize: {
            get() {
                return this.limit
            },
            set(val) {
                this.$emit('update:limit', val)
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('pagination', {
                page: this.currentPage,
                limit: val
            })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        },
        handleCurrentChange(val) {
            console.log("切换页面",val)
            this.$emit('pagination', {
                page: val,
                limit: this.pageSize
            })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        }
    }
}
</script>

<style scoped>
.pagination-container {
    height: 60px;
    background: #fff;
    margin-top: 0;
    padding: 4px 15px;

}

.pagination-container.hidden {
    display: none;
}

.pagination-container .el-pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    margin: 0 48px 0 0 !important;
}

.el-pagination {
    font-weight: 700;
}
</style>

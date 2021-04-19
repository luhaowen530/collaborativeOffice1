<template>
    <div class="a7-filemanagement-container">
        文件管理
    </div>
</template>

<script>
    export default {
        created(){
            this.$emit("topHighlightMenu", "7")
        },
    }
</script>

<style lang="scss" scoped>
.a7-filemanagement-container {
    width: 100%;
    height: calc(100% - 118px);
    margin-top: 20px;
    background: #fff;
}
</style>
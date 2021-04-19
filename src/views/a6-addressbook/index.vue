<template>
    <div class="a6-addressbook-container">
        企业通信录
    </div>
</template>

<script>
    export default {
        created(){
            this.$emit("topHighlightMenu", "6")
        },
    }
</script>

<style lang="scss" scoped>
.a6-addressbook-container {
    width: 100%;
    height: calc(100% - 118px);
    margin-top: 20px;
    background: #fff;
}
</style>
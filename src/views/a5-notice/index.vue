<template>
    <div class="a2-metting-container">
        通知
        <!-- <side-bar />
        <router-view /> -->
    </div>
</template>

<script>
import SideBar from "./components/sideBar";
export default {
    components: {
        SideBar
    },
    created(){
        this.$emit("topHighlightMenu", "5")
    },
}
</script>

<style lang="scss" scoped>
.a2-metting-container {
    width: 100%;
    height: calc(100% - 118px);
    margin-top: 20px;
    background: #fff;
}
</style>

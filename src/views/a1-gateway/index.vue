<template>
    <div class="a1-gateway-container">
        <left-menu-list />
        <router-view />
    </div>
</template>

<script>
import leftMenuList from "./conponents/sidebar"
export default {
    components: {
      leftMenuList
    },
    created() {
        this.$emit("topHighlightMenu", "1")
    },
}
</script>

<style lang="scss" scoped>
.a1-gateway-container {
    width: 100%;
    height: calc(100% - 118px);
    margin-top: 20px;
}
</style>

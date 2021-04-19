<template>
	<div class="a3-metting-container">
		会议
		<!-- <side-bar /> -->
		<!-- <router-view /> -->
	</div>
</template>

<script>
	import SideBar from "./components/sideBar";
	export default {
		components: {
			SideBar
		},
		created(){
            this.$emit("topHighlightMenu", "3")
        },
	}
</script>

<style lang="scss" scoped>
.a3-metting-container {
    width: 100%;
    height: calc(100% - 118px);
    margin-top: 20px;
    background: #fff;
}
</style>

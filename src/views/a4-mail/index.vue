<template>
	<div class="a3-mail-container">
		邮件
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
			this.$emit("topHighlightMenu", "4")
		},
	}
</script>

<style lang="scss" scoped>
.a3-mail-container {
    width: 100%;
    height: calc(100% - 118px);
    margin-top: 20px;
    background: #fff;
}
</style>

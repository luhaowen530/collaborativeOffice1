<template>
	<div id="app">
		<top v-if="showTop" :topHighlightId="topHighlightId" />
		<router-view @topHighlightMenu="topHighlightMenu" />
	</div>
</template>

<script>
	import top from "@/components/Atop"
	export default {
		components: {
			top
		},
		name: 'App',
		data() {
			return {
				topHighlightId: ''
			}
		},
		computed: {
			showTop() {
				return this.$store.state.user.showTop
			}
		},
		methods: {
			topHighlightMenu(value){
				this.topHighlightId = value
			},
		},
	}
</script>

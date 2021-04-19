<template>
	<div class="LeftMenuList" :style="showLM" id="animation" 
		@mouseenter="LeftMenuIn"
		@mouseleave="LeftMenuOut">
		<div class="LML_inside">
			<div class="showLeftMenuBtn">
				<img src="@/assets/sidebar/arrowOpen.png" class="LML_BtnPicture" />
			</div>
			<div class="BoxLeftMenuBtn">
				<div :class="{'LML_Btn':true,'LML_Btn_active':isActive1}" @click="changeBtnStyle(1)">会议安排</div>
				<div :class="{'LML_Btn':true,'LML_Btn_active':isActive2}" @click="changeBtnStyle(2)">工作通知</div>
			</div>
		</div>
		<div class="LML_transparentBox"></div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				showLM: '',
				isActive1: true,
				isActive2: false,
				OpenOrClose: '',
				StyleMou: ''
			}
		},
		mounted(){
			
		},
		methods: {
			changeBtnStyle (val) {
				if(val == 1){
					this.isActive1 = true
					this.isActive2 = false
					this.$router.push({path: '/gateway'})
				}else if(val == 2){
					this.isActive1 = false
					this.isActive2 = true
					this.$router.push({path: '/gateway/gatewaySecond'})
				}
			},
			LeftMenuIn () {
				this.showLM = {left: '0'}
			},
			LeftMenuOut () {
				this.showLM = {left: '-130px'}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.LeftMenuList {
		width: 135px;
		height: calc(100% - 98px);
		position: absolute;
		top: 98px;
		left: -130px;
		z-index: 5;
		transition: all 0.3s;

		.LML_inside{
			width: 130px;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.2);
			position: absolute;
			top: 0;
			left: 0;

			.showLeftMenuBtn {
				width: 30px;
				height: 30px;
				position: absolute;
				top: calc(50% - 40px);
				left: 100%;
				cursor: pointer;

				.LML_BtnPicture {
					width: 20px;
					height: 20px;
					position: absolute;
					top: 20%;
					left: 25%;
					transform: translateX(-50%);
				}
			}
			.BoxLeftMenuBtn {
				width: 100%;
				height: auto;
				position: absolute;
				top: 20px;
				left: 0;

				.LML_Btn {
					width: 65%;
					height: 60px;
					line-height: 60px;
					color: white;
					background: #154377;
					border-radius: 0 20px 20px 0;
					margin-top: 30px;
					font-size: 14px;
					cursor: pointer;
					text-align: center;
				}
				.LML_Btn_active {
					background: #009688;
					width: 90%;
				}
			}
		}
		.LML_transparentBox{
			width: 5px;
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	@keyframes myopen {
		from {
			left: -130px;
		}
		to {
			left: 0px;
		}
	}

	@keyframes myclose {
		from {
			left: 0px;
		}
		to {
			left: -130px;
		}
	}
</style>

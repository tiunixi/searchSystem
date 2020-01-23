<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<fishWx ref = "fish"  :fishsum="5"  :bospeed="2" :fishmaxspeed="3" ></fishWx>
		<!-- #endif -->
		<!--  #ifdef H5 -->
		<fish ref = "fish"  :fishsum="5"  :bospeed="2" :fishmaxspeed="3" ></fish>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import fish from "@/components/xiaodiu-fish-h5/xiaodiu-fish.vue"
	import fishWx from "@/components/xiaodiu-fish-wx/xiaodiu-fish.vue"
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		components: {fish,fishWx},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 90%;
		padding: 0;
		overflow: hidden;
	}/* 
		
	.xd-drift{
		overflow: hidden;
		left: 0upx;
		position: absolute;
		top: 0px;
		margin-bottom: ;
	}
		
	.drift-bo2{
		margin-bottom:35px;
	} */
</style>

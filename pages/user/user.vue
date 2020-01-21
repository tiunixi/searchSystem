<template>
	<view class="content">
		<fish ref = "fish"  :fishsum="5"  :bospeed="2" :fishmaxspeed="3" ></fish>
		<!-- <view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import fish from "@/components/xiaodiu-fish/xiaodiu-fish.vue"
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		components: {fish},
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

<style>
	.content {
		width: 90%;
		overflow: hidden;
	}
		
	.xd-drift{
		overflow: hidden;
		left: 0upx;
		position: absolute;
		top: 0px;
	}
	.btn-row {
		
	}
</style>
